// Cloudflare Pages Function at /api/admin/* — Owner tools that need Google's admin powers (a service account):
//   GET  /api/admin/info              — status check (no secrets)
//   POST /api/admin/one-time-password — the Owner makes a one-time password for someone who forgot theirs
//   POST /api/admin/redeem            — someone logs in with a one-time password (signs them in once, then deletes it)
//   POST /api/admin/ip                — checks whether this network's IP is banned (bannedIps/{id}); needs no sign-in
//   POST /api/admin/seen              — records this network's IP (ips/{id}, Owner-only) for the signed-in account
//   POST /api/admin/claims            — puts the signed-in account's NPD username and rank on its Firebase Auth
//                                       token (customAttributes: { n, r }), so the Realtime Database's rules know who is
//                                       writing without having to look at Firestore
//   POST /api/admin/earn              — adds Orbs earned from Racing / Quests (capped per UTC day per account)
//   POST /api/admin/buy               — buys a Shop item or Premium (reads the real price from Firestore, takes Orbs and grants the item in one commit)
//   POST /api/admin/code              — redeems an Orbs or Premium code, or buys a giftable 30-day Premium code for 1,400 Orbs
//
// Needs one Cloudflare secret (Pages > Settings > Environment variables > Production > Add variable > Encrypt):
//   FIREBASE_SERVICE_ACCOUNT — the whole JSON file from Firebase console > Project settings > Service accounts >
//                              Generate new private key

const PROJECT = 'bottleliquidalt';
const FS_BASE = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default)/documents`;
const DOCS = `${FS_BASE}/`;
const COMMIT = `https://firestore.googleapis.com/v1/projects/${PROJECT}/databases/(default):commit`;

const CORS = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};
const json = (obj, status = 200) => new Response(JSON.stringify(obj), {
  status, headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', ...CORS },
});

const b64url = buf => {
  const bytes = buf instanceof Uint8Array ? buf : new Uint8Array(buf);
  let s = '';
  for (let i = 0; i < bytes.length; i++) s += String.fromCharCode(bytes[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
};
const unb64url = s => {
  s = s.replace(/-/g, '+').replace(/_/g, '/');
  while (s.length % 4) s += '=';
  const bin = atob(s), out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
};
const pemToDer = pem => unb64url(pem.replace(/-----BEGIN [^-]+-----|-----END [^-]+-----|\s+/g, ''));

let gToken = null, gTokenExp = 0;
async function googleToken(env) {
  const now = Math.floor(Date.now() / 1000);
  if (gToken && now < gTokenExp - 60) return gToken;
  if (!env.FIREBASE_SERVICE_ACCOUNT) throw new Error('FIREBASE_SERVICE_ACCOUNT is not set on Cloudflare.');
  let sa;
  try { sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT); }
  catch (e) { throw new Error('FIREBASE_SERVICE_ACCOUNT is not valid JSON.'); }
  if (!sa.client_email || !sa.private_key) throw new Error('FIREBASE_SERVICE_ACCOUNT is missing client_email or private_key.');

  const enc = new TextEncoder();
  const head = b64url(enc.encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
  const body = b64url(enc.encode(JSON.stringify({
    iss: sa.client_email, sub: sa.client_email,
    scope: 'https://www.googleapis.com/auth/identitytoolkit https://www.googleapis.com/auth/datastore',
    aud: 'https://oauth2.googleapis.com/token',
    iat: now, exp: now + 3600,
  })));
  const key = await crypto.subtle.importKey(
    'pkcs8', pemToDer(sa.private_key),
    { name: 'RS256', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, enc.encode(`${head}.${body}`));
  const r = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=urn%3Aietf%3Aparams%3Aoauth%3Agrant-type%3Ajwt-bearer&assertion=${head}.${body}.${b64url(sig)}`,
  });
  const j = await r.json();
  if (!r.ok || !j.access_token) throw new Error('Google token exchange failed: ' + JSON.stringify(j));
  gToken = j.access_token;
  gTokenExp = now + (j.expires_in || 3600);
  return gToken;
}

let pubKeys = null, pubKeysExp = 0;
async function verifyIdToken(idToken) {
  if (typeof idToken !== 'string') throw new Error('Missing token.');
  const parts = idToken.split('.');
  if (parts.length !== 3) throw new Error('Bad token.');
  const head = JSON.parse(new TextDecoder().decode(unb64url(parts[0])));
  const body = JSON.parse(new TextDecoder().decode(unb64url(parts[1])));
  const now = Math.floor(Date.now() / 1000);
  if (head.alg !== 'RS256' || !head.kid) throw new Error('Bad token header.');
  if (body.aud !== PROJECT || body.iss !== `https://securetoken.google.com/${PROJECT}`) throw new Error('Wrong project.');
  if (!body.sub || body.exp < now - 30 || body.iat > now + 300) throw new Error('Expired token.');

  if (!pubKeys || Date.now() > pubKeysExp) {
    const r = await fetch('https://www.googleapis.com/service_accounts/v1/jwk/securetoken@system.gserviceaccount.com');
    const cc = r.headers.get('cache-control') || '';
    const m = cc.match(/max-age=(\d+)/);
    pubKeys = (await r.json()).keys || [];
    pubKeysExp = Date.now() + (m ? Number(m[1]) * 1000 : 3600000);
  }
  const jwk = pubKeys.find(k => k.kid === head.kid);
  if (!jwk) throw new Error('Unknown signing key.');
  const key = await crypto.subtle.importKey('jwk', jwk, { name: 'RSASSA-PKCS1-v1_5', hash: 'SHA-256' }, false, ['verify']);
  const ok = await crypto.subtle.verify(
    'RSASSA-PKCS1-v1_5', key, unb64url(parts[2]),
    new TextEncoder().encode(`${parts[0]}.${parts[1]}`),
  );
  if (!ok) throw new Error('Invalid token signature.');
  return body.sub;
}

const fromVal = v => {
  if (!v || typeof v !== 'object') return null;
  if ('stringValue' in v) return v.stringValue;
  if ('booleanValue' in v) return v.booleanValue;
  if ('integerValue' in v) return Number(v.integerValue);
  if ('doubleValue' in v) return v.doubleValue;
  if ('timestampValue' in v) return v.timestampValue;
  if ('nullValue' in v) return null;
  if ('arrayValue' in v) return (v.arrayValue.values || []).map(fromVal);
  if ('mapValue' in v) return fromDoc(v.mapValue);
  return null;
};
const fromDoc = d => {
  const out = {}, f = (d && d.fields) || {};
  for (const k of Object.keys(f)) out[k] = fromVal(f[k]);
  return out;
};
const toVal = v => {
  if (v === null || v === undefined) return { nullValue: null };
  if (typeof v === 'boolean') return { booleanValue: v };
  if (typeof v === 'number') return Number.isInteger(v) ? { integerValue: String(v) } : { doubleValue: v };
  if (typeof v === 'string') return { stringValue: v };
  if (Array.isArray(v)) return { arrayValue: { values: v.map(toVal) } };
  if (typeof v === 'object') {
    const fields = {};
    for (const [k, val] of Object.entries(v)) if (val !== undefined) fields[k] = toVal(val);
    return { mapValue: { fields } };
  }
  return { nullValue: null };
};

async function getDoc(tok, path) {
  const r = await fetch(DOCS + path, { headers: { Authorization: `Bearer ${tok}` } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Firestore read ${path} failed: ${r.status}`);
  return fromDoc(await r.json());
}
async function setField(tok, path, field, val) {
  const r = await fetch(`${DOCS}${path}?updateMask.fieldPaths=${encodeURIComponent(field)}`, {
    method: 'PATCH',
    headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ fields: { [field]: toVal(val) } }),
  });
  if (!r.ok) throw new Error(`Firestore write ${path} failed: ${r.status}`);
}
async function deleteDoc(tok, path) {
  await fetch(DOCS + path, { method: 'DELETE', headers: { Authorization: `Bearer ${tok}` } });
}

// Supports both admin: true and op: true as Rank 1 (Admin), coowner: true as Rank 2 (Co-Owner), owner: true as Rank 3 (Owner)
const rankOf = u => !u ? 0 : u.owner === true ? 3 : u.coowner === true ? 2 : (u.admin === true || u.op === true) ? 1 : 0;

async function signedInUser(tok, idToken) {
  const authUid = await verifyIdToken(idToken);
  const acc = await getDoc(tok, `accounts/${encodeURIComponent(authUid)}`);
  if (!acc || !acc.username) throw new Error('Account not found.');
  const user = await getDoc(tok, `users/${encodeURIComponent(acc.username)}`);
  if (!user || user.authUid !== authUid) throw new Error('Account link does not match.');
  return { authUid, username: acc.username, user };
}

async function setClaimsOnAuth(tok, authUid, username, rank) {
  const r = await fetch(`https://identitytoolkit.googleapis.com/v1/projects/${PROJECT}/accounts:update`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ localId: authUid, customAttributes: JSON.stringify({ n: username, r: rank }) }),
  });
  if (!r.ok) throw new Error('Could not set claims: ' + (await r.text()));
}

const CODE_CHARS = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
function makeCode() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  let s = '';
  for (let i = 0; i < 8; i++) s += CODE_CHARS[bytes[i] % CODE_CHARS.length];
  return `${s.slice(0, 4)}-${s.slice(4)}`;
}
const cleanCode = raw => String(raw || '').trim().toUpperCase().replace(/[^A-Z0-9]/g, '');
async function sha256Hex(str) {
  const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(str));
  return [...new Uint8Array(buf)].map(b => b.toString(16).padStart(2, '0')).join('');
}

const clientIp = req => {
  const raw = (req.headers.get('CF-Connecting-IP') || req.headers.get('X-Forwarded-For')?.split(',')[0] || '').trim().toLowerCase();
  if (!raw) return '';
  if (raw.includes(':')) {
    const full = expandIpv6(raw);
    return full ? full.slice(0, 4).join(':') + '::/64' : raw;
  }
  return raw;
};
function expandIpv6(addr) {
  addr = addr.replace(/%.*/, '');
  const halves = addr.split('::');
  if (halves.length > 2) return null;
  const left = halves[0] ? halves[0].split(':') : [];
  const right = halves.length === 2 && halves[1] ? halves[1].split(':') : [];
  const fill = halves.length === 2 ? 8 - left.length - right.length : 0;
  if (fill < 0 || (halves.length === 1 && left.length !== 8)) return null;
  const groups = [...left, ...Array(fill).fill('0'), ...right].map(g => g.padStart(4, '0'));
  return groups.length === 8 && groups.every(g => /^[0-9a-f]{4}$/.test(g)) ? groups : null;
}

const EARN_CAP = 20000;
const EARN_ONE_MAX = 5000;
const PREMIUM_PRICE = 1400;
const PREMIUM_MS = 30 * 86400000;
const SHOP_BUY_CATS = {
  decorations:     { coll: 'shopDecorations',    owned: 'ownedDecorations' },
  masks:           { coll: 'shopDecorations',    owned: 'ownedDecorations' },
  nameplates:      { coll: 'shopNameplates',     owned: 'ownedNameplates' },
  profile_effects: { coll: 'shopProfileEffects', owned: 'ownedProfileEffects' },
  profile_frames:  { coll: 'shopProfileFrames',  owned: 'ownedProfileFrames' },
  themes:          { coll: 'shopThemes',         owned: 'ownedThemes' },
  banners:         { coll: 'shopBanners',        owned: 'ownedBanners' },
  music:           { coll: null,                 owned: 'ownedMusic' },
};

async function getRawDoc(tok, path) {
  const r = await fetch(DOCS + path, { headers: { Authorization: `Bearer ${tok}` } });
  if (r.status === 404) return null;
  if (!r.ok) throw new Error(`Firestore read ${path} failed: ${r.status}`);
  const raw = await r.json();
  return { name: raw.name, updateTime: raw.updateTime, data: fromDoc(raw) };
}
async function commitWrites(tok, writes) {
  const r = await fetch(COMMIT, {
    method: 'POST',
    headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ writes }),
  });
  if (r.status === 400 || r.status === 409) {
    const text = await r.text();
    if (/FAILED_PRECONDITION|ABORTED|currentDocument/i.test(text)) return false;
    throw new Error('Firestore commit failed: ' + text);
  }
  if (!r.ok) throw new Error(`Firestore commit failed: ${r.status}`);
  return true;
}
const patchWrite = (path, fields, currentDoc) => {
  const out = {};
  for (const [k, v] of Object.entries(fields)) out[k] = toVal(v);
  return {
    update: { name: `${FS_BASE}/${path}`, fields: out },
    updateMask: { fieldPaths: Object.keys(fields) },
    ...(currentDoc ? { currentDocument: currentDoc } : {}),
  };
};

async function makeCustomToken(env, uid, claims) {
  const sa = JSON.parse(env.FIREBASE_SERVICE_ACCOUNT);
  const now = Math.floor(Date.now() / 1000);
  const enc = new TextEncoder();
  const head = b64url(enc.encode(JSON.stringify({ alg: 'RS256', typ: 'JWT' })));
  const body = b64url(enc.encode(JSON.stringify({
    iss: sa.client_email, sub: sa.client_email,
    aud: 'https://identitytoolkit.googleapis.com/google.identitytoolkit.v1.IdentityToolkit',
    iat: now, exp: now + 900,
    uid, claims,
  })));
  const key = await crypto.subtle.importKey(
    'pkcs8', pemToDer(sa.private_key),
    { name: 'RS256', hash: 'SHA-256' }, false, ['sign'],
  );
  const sig = await crypto.subtle.sign('RSASSA-PKCS1-v1_5', key, enc.encode(`${head}.${body}`));
  return `${head}.${body}.${b64url(sig)}`;
}

export async function onRequest(ctx) {
  const { request, env } = ctx;
  if (request.method === 'OPTIONS') return new Response(null, { status: 204, headers: CORS });
  const seg = new URL(request.url).pathname.replace(/^\/api\/admin\/?/, '').replace(/\/$/, '');

  try {
    if (request.method === 'GET' && (seg === '' || seg === 'info')) {
      return json({ ok: true, project: PROJECT, serviceAccountConfigured: !!env.FIREBASE_SERVICE_ACCOUNT });
    }
    if (request.method !== 'POST') return json({ error: 'Not found.' }, 404);

    let body = {};
    try { body = await request.json(); } catch (e) {}
    const tok = await googleToken(env);

    if (seg === 'ip') {
      const ip = clientIp(request);
      if (!ip) return json({ banned: false });
      const id = 'ip_' + (await sha256Hex(ip)).slice(0, 32);
      const ban = await getDoc(tok, `bannedIps/${id}`);
      return json({ banned: !!(ban && ban.banned === true) });
    }

    if (seg === 'seen') {
      const ip = clientIp(request);
      if (!ip) return json({ ok: true, banned: false });
      const me = await signedInUser(tok, body.token);
      const id = 'ip_' + (await sha256Hex(ip)).slice(0, 32);
      const [ban, prev] = await Promise.all([getDoc(tok, `bannedIps/${id}`), getDoc(tok, `ips/${id}`)]);
      const banned = !!(ban && ban.banned === true);
      const prevAccounts = Array.isArray(prev && prev.accounts) ? prev.accounts.filter(x => typeof x === 'string') : [];
      const accounts = prevAccounts.includes(me.username) ? prevAccounts : [...prevAccounts, me.username].slice(-50);
      const ua = String(request.headers.get('User-Agent') || '').slice(0, 300);
      const now = new Date().toISOString();
      const fields = {
        accounts: toVal(accounts),
        lastUsername: toVal(me.username),
        userAgent: toVal(ua),
        lastSeen: { timestampValue: now },
        firstSeen: prev && prev.firstSeen ? { timestampValue: prev.firstSeen } : { timestampValue: now },
      };
      await fetch(`${DOCS}ips/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields }),
      });
      if (banned && rankOf(me.user) === 0 && me.user.banned !== true) {
        const reason = (typeof (ban && ban.reason) === 'string' && ban.reason) || 'Banned network';
        await fetch(`${DOCS}users/${encodeURIComponent(me.username)}?updateMask.fieldPaths=banned&updateMask.fieldPaths=banReason&updateMask.fieldPaths=bannedUntil`, {
          method: 'PATCH',
          headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({ fields: { banned: toVal(true), banReason: toVal(reason), bannedUntil: toVal(null) } }),
        });
      }
      return json({ ok: true, banned });
    }

    if (seg === 'claims') {
      const me = await signedInUser(tok, body.token);
      let targetUid = me.authUid, targetName = me.username, targetUser = me.user;
      if (body.username && body.username !== me.username) {
        if (me.user.owner !== true) return json({ error: 'Only the Owner can update someone else\'s claims.' }, 403);
        targetName = String(body.username).trim();
        targetUser = await getDoc(tok, `users/${encodeURIComponent(targetName)}`);
        if (!targetUser || !targetUser.authUid) return json({ error: 'User has no sign-in yet.' }, 404);
        targetUid = targetUser.authUid;
      }
      const rank = rankOf(targetUser);
      await setClaimsOnAuth(tok, targetUid, targetName, rank);
      return json({ ok: true, username: targetName, rank });
    }

    if (seg === 'one-time-password') {
      const me = await signedInUser(tok, body.token);
      if (me.user.owner !== true) return json({ error: 'Only the Owner can make one-time passwords.' }, 403);
      const target = String(body.username || '').trim();
      if (!target) return json({ error: 'Pick a user first.' }, 400);
      const targetDoc = await getDoc(tok, `users/${encodeURIComponent(target)}`);
      if (!targetDoc) return json({ error: 'User not found.' }, 404);
      const code = makeCode();
      const id = await sha256Hex(`${target.toLowerCase()}:${cleanCode(code)}`);
      const r = await fetch(`${DOCS}loginCodes/${id}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: {
          username: toVal(target),
          createdBy: toVal(me.username),
          createdAt: { timestampValue: new Date().toISOString() },
        } }),
      });
      if (!r.ok) throw new Error('Could not save the one-time password.');
      return json({ ok: true, password: code });
    }

    if (seg === 'redeem') {
      const rawName = String(body.username || '').trim();
      const code = cleanCode(body.code);
      if (!rawName || code.length !== 8) return json({ error: 'Invalid code.' }, 400);
      const id = await sha256Hex(`${rawName.toLowerCase()}:${code}`);
      const codeDoc = await getDoc(tok, `loginCodes/${id}`);
      if (!codeDoc || !codeDoc.username) return json({ error: 'Invalid or already-used one-time password.' }, 400);
      const username = codeDoc.username;
      await deleteDoc(tok, `loginCodes/${id}`);

      const user = await getDoc(tok, `users/${encodeURIComponent(username)}`);
      if (!user) return json({ error: 'Account not found.' }, 404);
      if (user.terminated && user.terminated.mode === 'real') return json({ error: 'This account has been deleted.' }, 403);
      if (user.banned === true) return json({ error: 'This account is banned.' }, 403);

      const authUid = user.authUid || ('otp_' + (await sha256Hex(`uid:${username}`)).slice(0, 24));
      await fetch(`${DOCS}accounts/${encodeURIComponent(authUid)}`, {
        method: 'PATCH',
        headers: { Authorization: `Bearer ${tok}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ fields: {
          username: toVal(username),
          createdAt: { timestampValue: new Date().toISOString() },
        } }),
      });
      if (user.authUid !== authUid) await setField(tok, `users/${encodeURIComponent(username)}`, 'authUid', authUid);
      const rank = rankOf(user);
      const customToken = await makeCustomToken(env, authUid, { n: username, r: rank });
      return json({ ok: true, customToken, username });
    }

    if (seg === 'earn') {
      const want = Math.floor(Number(body.n ?? body.amount) || 0);
      if (want < 1) return json({ ok: true, added: 0 });
      const me = await signedInUser(tok, body.token);
      if (me.user.banned === true || (me.user.terminated && me.user.terminated.mode === 'real')) {
        return json({ error: 'This account cannot earn Bottlecaps.' }, 403);
      }
      const userPath = `users/${encodeURIComponent(me.username)}`;
      const dayPath = `orbDays/${encodeURIComponent(me.username)}`;
      const today = new Date().toISOString().slice(0, 10);
      for (let attempt = 0; attempt < 4; attempt++) {
        const [uDoc, dDoc] = await Promise.all([getRawDoc(tok, userPath), getRawDoc(tok, dayPath)]);
        if (!uDoc) return json({ error: 'Account not found.' }, 404);
        const used = dDoc && dDoc.data.day === today ? Math.max(0, Math.floor(Number(dDoc.data.got) || 0)) : 0;
        const room = Math.max(0, EARN_CAP - used);
        const add = Math.min(want, EARN_ONE_MAX, room);
        const curOrbs = Math.max(0, Math.floor(Number(uDoc.data.orbs) || 0));
        if (add < 1) return json({ ok: true, added: 0, orbs: curOrbs, remainingToday: 0 });
        const newOrbs = curOrbs + add;
        const ok = await commitWrites(tok, [
          patchWrite(userPath, { orbs: newOrbs }, { updateTime: uDoc.updateTime }),
          patchWrite(dayPath, { day: today, got: used + add }, dDoc ? { updateTime: dDoc.updateTime } : { exists: false }),
        ]);
        if (ok) return json({ ok: true, added: add, orbs: newOrbs, remainingToday: room - add });
      }
      return json({ error: 'Busy, try again.' }, 409);
    }

    if (seg === 'buy') {
      const me = await signedInUser(tok, body.token);
      if (me.user.banned === true || (me.user.terminated && me.user.terminated.mode === 'real')) {
        return json({ error: 'This account cannot use the Shop.' }, 403);
      }
      const userPath = `users/${encodeURIComponent(me.username)}`;
      const kind = String(body.kind || body.cat || '');

      if (kind === 'premium') {
        for (let attempt = 0; attempt < 4; attempt++) {
          const uDoc = await getRawDoc(tok, userPath);
          if (!uDoc) return json({ error: 'Account not found.' }, 404);
          const orbs = Math.max(0, Math.floor(Number(uDoc.data.orbs) || 0));
          if (orbs < PREMIUM_PRICE) return json({ error: `Not enough Bottlecaps — you need ${PREMIUM_PRICE}.` }, 400);
          const now = Date.now(), curUntil = Number(uDoc.data.premiumUntil) || 0;
          const premiumUntil = (curUntil > now ? curUntil : now) + PREMIUM_MS;
          const ok = await commitWrites(tok, [
            patchWrite(userPath, { orbs: orbs - PREMIUM_PRICE, premiumUntil }, { updateTime: uDoc.updateTime }),
          ]);
          if (ok) return json({ ok: true, orbs: orbs - PREMIUM_PRICE, premiumUntil });
        }
        return json({ error: 'Busy, try again.' }, 409);
      }

      const cat = SHOP_BUY_CATS[kind];
      const itemId = String(body.itemId || body.id || '').trim();
      if (!cat || !itemId || itemId.length > 80 || itemId.includes('/')) return json({ error: 'Item not found.' }, 400);

      let price = null;
      if (kind === 'music') {
        const [cm, ov, bp] = await Promise.all([
          getDoc(tok, 'config/customMusic'),
          getDoc(tok, 'config/shopOverrides'),
          getDoc(tok, 'shopPrices/builtin'),
        ]);
        const custom = cm && cm[itemId] && typeof cm[itemId] === 'object' ? cm[itemId] : null;
        const over = ov && ov[`music__${itemId}`] && typeof ov[`music__${itemId}`] === 'object' ? ov[`music__${itemId}`] : null;
        if ((custom && custom.disabled === true) || (over && over.disabled === true)) return json({ error: 'This item is not for sale.' }, 400);
        if (custom && Number.isFinite(Number(custom.price))) price = Math.floor(Number(custom.price));
        else if (over && Number.isFinite(Number(over.price))) price = Math.floor(Number(over.price));
        else if (bp && bp.p && bp.p.music && Number.isFinite(Number(bp.p.music[itemId]))) price = Math.floor(Number(bp.p.music[itemId]));
      } else {
        const [custom, ov, bp] = await Promise.all([
          getDoc(tok, `${cat.coll}/${encodeURIComponent(itemId)}`),
          getDoc(tok, 'config/shopOverrides'),
          getDoc(tok, 'shopPrices/builtin'),
        ]);
        const over = ov && ((ov[`${kind}__${itemId}`] && typeof ov[`${kind}__${itemId}`] === 'object' && ov[`${kind}__${itemId}`])
          || (kind === 'masks' && ov[`decorations__${itemId}`] && typeof ov[`decorations__${itemId}`] === 'object' && ov[`decorations__${itemId}`]));
        if ((custom && custom.disabled === true) || (over && over.disabled === true)) return json({ error: 'This item is not for sale.' }, 400);
        if (custom && Number.isFinite(Number(custom.price))) price = Math.floor(Number(custom.price));
        else if (over && Number.isFinite(Number(over.price))) price = Math.floor(Number(over.price));
        else {
          const bCat = kind === 'masks' ? 'decorations' : kind;
          if (bp && bp.p && bp.p[bCat] && Number.isFinite(Number(bp.p[bCat][itemId]))) price = Math.floor(Number(bp.p[bCat][itemId]));
        }
      }
      if (!Number.isInteger(price) || price < 0) return json({ error: 'Item not found.' }, 404);

      for (let attempt = 0; attempt < 4; attempt++) {
        const uDoc = await getRawDoc(tok, userPath);
        if (!uDoc) return json({ error: 'Account not found.' }, 404);
        const owned = Array.isArray(uDoc.data[cat.owned]) ? uDoc.data[cat.owned].filter(x => typeof x === 'string') : [];
        if (owned.includes(itemId)) return json({ error: 'You already own this.' }, 400);
        const orbs = Math.max(0, Math.floor(Number(uDoc.data.orbs) || 0));
        if (orbs < price) return json({ error: 'Not enough Bottlecaps.' }, 400);
        if (owned.length >= 500) return json({ error: 'Too many owned items.' }, 400);
        const ok = await commitWrites(tok, [
          patchWrite(userPath, { orbs: orbs - price, [cat.owned]: [...owned, itemId] }, { updateTime: uDoc.updateTime }),
        ]);
        if (ok) return json({ ok: true, orbs: orbs - price, price });
      }
      return json({ error: 'Busy, try again.' }, 409);
    }

    if (seg === 'code') {
      const me = await signedInUser(tok, body.token);
      if (me.user.banned === true || (me.user.terminated && me.user.terminated.mode === 'real')) {
        return json({ error: 'This account cannot use codes.' }, 403);
      }
      const userPath = `users/${encodeURIComponent(me.username)}`;

      if (body.action === 'buy-premium') {
        for (let attempt = 0; attempt < 4; attempt++) {
          const uDoc = await getRawDoc(tok, userPath);
          if (!uDoc) return json({ error: 'Account not found.' }, 404);
          const orbs = Math.max(0, Math.floor(Number(uDoc.data.orbs) || 0));
          if (orbs < PREMIUM_PRICE) return json({ error: `Not enough Bottlecaps — you need ${PREMIUM_PRICE}.` }, 400);
          const code = 'NPD-' + makeCode();
          const now = new Date().toISOString();
          const ok = await commitWrites(tok, [
            patchWrite(userPath, { orbs: orbs - PREMIUM_PRICE }, { updateTime: uDoc.updateTime }),
            {
              update: {
                name: `${FS_BASE}/redeemCodes/${code}`,
                fields: {
                  code: toVal(code), type: toVal('premium'), value: toVal(30),
                  maxUses: toVal(1), redeemedBy: toVal([]), redeemed: toVal(false),
                  createdBy: toVal(me.username), createdAt: { timestampValue: now },
                },
              },
              currentDocument: { exists: false },
            },
          ]);
          if (ok) return json({ ok: true, code, orbs: orbs - PREMIUM_PRICE });
        }
        return json({ error: 'Could not generate code. Try again.' }, 409);
      }

      const raw = String(body.code || '').trim().toUpperCase().replace(/[^A-Z0-9-]/g, '');
      if (!raw || raw.length > 40) return json({ error: 'Invalid code.' }, 400);
      const codePath = `redeemCodes/${encodeURIComponent(raw)}`;
      for (let attempt = 0; attempt < 4; attempt++) {
        const [uDoc, cDoc] = await Promise.all([getRawDoc(tok, userPath), getRawDoc(tok, codePath)]);
        if (!uDoc) return json({ error: 'Account not found.' }, 404);
        if (!cDoc) return json({ error: 'Invalid code.' }, 404);
        const c = cDoc.data;
        const usedBy = Array.isArray(c.redeemedBy) ? c.redeemedBy.filter(x => typeof x === 'string')
          : (typeof c.redeemedBy === 'string' && c.redeemedBy ? [c.redeemedBy] : []);
        const maxUses = typeof c.maxUses === 'number' ? c.maxUses : 1;
        const uses = usedBy.length || (c.redeemed ? 1 : 0);
        if (usedBy.includes(me.username)) return json({ error: 'You already redeemed this code.' }, 400);
        if (maxUses > 0 && uses >= maxUses) return json({ error: 'This code has already been redeemed.' }, 400);
        const val = Math.floor(Number(c.value) || 0);
        if (val < 1 || (c.type !== 'orbs' && c.type !== 'premium')) return json({ error: 'Invalid code.' }, 400);

        const nextBy = [...usedBy, me.username];
        if (nextBy.length > 5000) return json({ error: 'This code has reached its limit.' }, 400);
        const userPatch = {};
        if (c.type === 'orbs') {
          userPatch.orbs = Math.max(0, Math.floor(Number(uDoc.data.orbs) || 0)) + val;
        } else {
          const now = Date.now(), curUntil = Number(uDoc.data.premiumUntil) || 0;
          userPatch.premiumUntil = (curUntil > now ? curUntil : now) + val * 86400000;
        }
        const ok = await commitWrites(tok, [
          patchWrite(userPath, userPatch, { updateTime: uDoc.updateTime }),
          patchWrite(codePath, {
            redeemedBy: nextBy,
            redeemed: maxUses > 0 && nextBy.length >= maxUses,
            redeemedAt: new Date().toISOString(),
          }, { updateTime: cDoc.updateTime }),
        ]);
        if (ok) return json({ ok: true, type: c.type, value: val });
      }
      return json({ error: 'Busy, try again.' }, 409);
    }

    return json({ error: 'Not found.' }, 404);
  } catch (err) {
    return json({ error: err.message || String(err) }, 500);
  }
}
