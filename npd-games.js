// NPD (NewBGI) — 18 Frixion Mini-Games Suite (Zero UI Emojis, Custom SVG Icons, Paid in Bottlecaps)
// Note: Host helpers (UC, dbUpdateUser, earnRoom, refreshCaps, showToast, fmtNum, fmtOrbs, etc.) live in script.js.
function npdGameSvg(kind, sz) {
  const s = sz || 22;
  const p = {
    seed: `<circle cx="12" cy="14" r="5" fill="#4ade80"/><path d="M12 9V4m0 0c2 0 4 1.5 4 3.5-2 0-4-1.5-4-3.5zm0 0c-2 0-4 1.5-4 3.5 2 0 4-1.5 4-3.5z" stroke="#16a34a" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
    cookie: `<circle cx="12" cy="12" r="9.5" fill="#d97706" stroke="#92400e" stroke-width="1.2"/><circle cx="9" cy="8.5" r="1.4" fill="#451a03"/><circle cx="15" cy="9.5" r="1.2" fill="#451a03"/><circle cx="10" cy="15" r="1.5" fill="#451a03"/><circle cx="15.5" cy="14.5" r="1.3" fill="#451a03"/><circle cx="12" cy="11.5" r="1.1" fill="#451a03"/>`,
    wave: `<path d="M2 15c3-5 6 5 10 0s7 5 10 0M2 9c3-4 6 4 10 0s7 4 10 0" stroke="#fff" stroke-width="2.2" fill="none" stroke-linecap="round"/>`,
    snake: `<path d="M4 17h11a3 3 0 0 0 0-6H9a3 3 0 0 1 0-6h11" stroke="#fff" stroke-width="2.6" fill="none" stroke-linecap="round"/><circle cx="19" cy="5" r="1.4" fill="#fef08a"/>`,
    grid: `<rect x="3" y="3" width="8" height="8" rx="1.8" fill="#fff"/><rect x="13" y="3" width="8" height="8" rx="1.8" fill="#fff" opacity=".6"/><rect x="3" y="13" width="8" height="8" rx="1.8" fill="#fff" opacity=".6"/><rect x="13" y="13" width="8" height="8" rx="1.8" fill="#fff"/>`,
    math: `<rect x="4" y="3" width="16" height="18" rx="2.5" fill="none" stroke="#fff" stroke-width="2"/><path d="M8 8h8M8 13h2m4 0h2m-8 4h2m4 0h2" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
    keyboard: `<rect x="2" y="6" width="20" height="12" rx="2.2" fill="none" stroke="#fff" stroke-width="2"/><path d="M6 10h2m2 0h2m2 0h2m2 0h2M7 14h10" stroke="#fff" stroke-width="2" stroke-linecap="round"/>`,
    target: `<circle cx="12" cy="12" r="9" fill="none" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="none" stroke="#fff" stroke-width="2"/><circle cx="12" cy="12" r="1.8" fill="#fff"/>`,
    word: `<rect x="3" y="3" width="18" height="18" rx="2.5" fill="none" stroke="#fff" stroke-width="2"/><path d="M8 9h8M12 9v8" stroke="#fff" stroke-width="2.2" stroke-linecap="round"/>`,
    blocks: `<path d="M3 13h6v8H3zm6-8h6v16H9zm6 4h6v12h-6z" fill="#fff" stroke="rgba(0,0,0,.25)" stroke-width="1"/>`,
    sudoku: `<rect x="3" y="3" width="18" height="18" rx="2" fill="none" stroke="#fff" stroke-width="2"/><path d="M9 3v18M15 3v18M3 9h18M3 15h18" stroke="#fff" stroke-width="1.5"/>`,
    connect4: `<circle cx="8" cy="8" r="3" fill="#ef4444"/><circle cx="16" cy="8" r="3" fill="#facc15"/><circle cx="8" cy="16" r="3" fill="#facc15"/><circle cx="16" cy="16" r="3" fill="#ef4444"/>`,
    stack: `<rect x="4" y="16" width="16" height="4" rx="1" fill="#fff"/><rect x="6" y="10" width="12" height="4" rx="1" fill="#fff" opacity=".85"/><rect x="8" y="4" width="8" height="4" rx="1" fill="#fff" opacity=".7"/>`,
    cards: `<rect x="4" y="5" width="11" height="15" rx="2" fill="#fff" opacity=".5"/><rect x="9" y="3" width="11" height="15" rx="2" fill="#fff"/>`,
    bomb: `<circle cx="11" cy="14" r="6" fill="#18181b" stroke="#cbd5e1" stroke-width="1.5"/><path d="M15 9l3-3m0 0h-2m2 0v2" stroke="#f97316" stroke-width="2" stroke-linecap="round"/><circle cx="9" cy="12" r="1.4" fill="#ef4444"/>`,
    gem: `<polygon points="12,3 20,9 12,21 4,9" fill="#38bdf8" stroke="#fff" stroke-width="1.5"/><path d="M4 9h16M8 9l4 12 4-12" stroke="#fff" stroke-width="1" opacity=".6"/>`,
    brick: `<rect x="3" y="4" width="8" height="4" rx="1" fill="#fff"/><rect x="13" y="4" width="8" height="4" rx="1" fill="#fff"/><circle cx="12" cy="12" r="2.2" fill="#fef08a"/><rect x="6" y="18" width="12" height="2.8" rx="1.4" fill="#fff"/>`,
    simon: `<path d="M12 3A9 9 0 0 1 21 12h-5A4 4 0 0 0 12 8V3z" fill="#ef4444"/><path d="M21 12A9 9 0 0 1 12 21v-5a4 4 0 0 0 4-4h5z" fill="#3b82f6"/><path d="M12 21A9 9 0 0 1 3 12h5a4 4 0 0 0 4 4v5z" fill="#facc15"/><path d="M3 12A9 9 0 0 1 12 3v5a4 4 0 0 0-4 4H3z" fill="#22c55e"/>`,
    basket: `<path d="M4 10h16l-2 9H6l-2-9zM8 10l4-6 4 6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
    shovel: `<path d="M14 4l6 6-3 3-6-6zm-4 7l-6 6v3h3l6-6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
    drop: `<path d="M12 3s6 6.5 6 11a6 6 0 1 1-12 0c0-4.5 6-11 6-11z" fill="#38bdf8"/>`,
    paw: `<circle cx="7" cy="9" r="2" fill="#f59e0b"/><circle cx="12" cy="7" r="2" fill="#f59e0b"/><circle cx="17" cy="9" r="2" fill="#f59e0b"/><path d="M7.5 16c0-2.5 2-4 4.5-4s4.5 1.5 4.5 4c0 1.5-2 2.5-4.5 2.5S7.5 17.5 7.5 16z" fill="#f59e0b"/>`,
    lock: `<rect x="5" y="11" width="14" height="9" rx="2" fill="none" stroke="currentColor" stroke-width="2"/><path d="M8 11V7a4 4 0 0 1 8 0v4" fill="none" stroke="currentColor" stroke-width="2"/>`,
    flag: `<path d="M5 21V4m0 1h12l-2.5 4L17 13H5" fill="#ef4444" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
    heart: `<path d="M12 20.5s-7.5-4.8-9.2-9C1.5 8 4 4.5 7.5 4.5c2 0 3.7 1.1 4.5 2.6.8-1.5 2.5-2.6 4.5-2.6 3.5 0 6 3.5 4.7 7-1.7 4.2-9.2 9-9.2 9z" fill="#e34b4b"/>`,
    spark: `<polygon points="12,2 14.5,9.5 22,12 14.5,14.5 12,22 9.5,14.5 2,12 9.5,9.5" fill="#facc15"/>`,
    rainbow: `<path d="M4 17a8 8 0 0 1 16 0" stroke="#ef4444" stroke-width="2.2" fill="none"/><path d="M7 17a5 5 0 0 1 10 0" stroke="#facc15" stroke-width="2.2" fill="none"/><path d="M10 17a2 2 0 0 1 4 0" stroke="#38bdf8" stroke-width="2.2" fill="none"/>`,
    brain: `<circle cx="12" cy="12" r="8" fill="#1e293b" stroke="#f59e0b" stroke-width="2"/><path d="M9 10h2m2 0h2m-5 4h4" stroke="#f59e0b" stroke-width="2" stroke-linecap="round"/>`,
    left: `<polyline points="15 18 9 12 15 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    right: `<polyline points="9 18 15 12 9 6" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    down: `<polyline points="6 9 12 15 18 9" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>`,
    rot: `<path d="M20 12a8 8 0 1 1-2.4-5.7M20 4v5h-5" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>`,
    close: `<path d="M18 6L6 18M6 6l12 12" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>`
  };
  const body = p[kind] || `<circle cx="12" cy="12" r="8" fill="currentColor"/>`;
  return `<svg class="npd-g-svg" viewBox="0 0 24 24" width="${s}" height="${s}" style="display:inline-block;vertical-align:-0.18em;flex-shrink:0">${body}</svg>`;
}
function npdGameBadge(color, label) {
  return `<span class="npd-g-badge" style="display:inline-flex;align-items:center;justify-content:center;width:24px;height:24px;border-radius:6px;background:${color};color:#fff;font-size:10px;font-weight:900;letter-spacing:.03em;box-shadow:inset 0 1px 0 rgba(255,255,255,.3)">${label}</span>`;
}
const COOKIE_CASH_RATE=10000; // cookies per 1 Bottlecap
const COOKIE_BUILDINGS=[
  {id:'cursor',name:'Cursor',base:15,cps:0.1,ic:npdGameBadge('#64748b','CR')},
  {id:'grandma',name:'Grandma',base:100,cps:1,ic:npdGameBadge('#a855f7','GR')},
  {id:'farm',name:'Farm',base:1100,cps:8,ic:npdGameBadge('#16a34a','FM')},
  {id:'mine',name:'Mine',base:12000,cps:47,ic:npdGameBadge('#52525b','MN')},
  {id:'factory',name:'Factory',base:130000,cps:260,ic:npdGameBadge('#ea580c','FC')},
  {id:'bank',name:'Bank',base:1400000,cps:1400,ic:npdGameBadge('#ca8a04','BK')},
  {id:'temple',name:'Temple',base:20000000,cps:7800,ic:npdGameBadge('#d97706','TP')},
  {id:'wizard',name:'Wizard Tower',base:330000000,cps:44000,ic:npdGameBadge('#7c3aed','WZ')},
  {id:'shipment',name:'Shipment',base:5100000000,cps:260000,ic:npdGameBadge('#2563eb','SH')},
  {id:'alchemy',name:'Alchemy Lab',base:75000000000,cps:1600000,ic:npdGameBadge('#059669','AL')},
  {id:'portal',name:'Portal',base:1000000000000,cps:10000000,ic:npdGameBadge('#4f46e5','PT')},
  {id:'timemachine',name:'Time Machine',base:14000000000000,cps:65000000,ic:npdGameBadge('#0284c7','TM')},
  {id:'antimatter',name:'Antimatter Condenser',base:170000000000000,cps:430000000,ic:npdGameBadge('#be123c','AM')},
  {id:'prism',name:'Prism',base:2100000000000000,cps:2900000000,ic:npdGameBadge('#db2777','PR')},
];
// Compact numbers: 1.23K, 4.56M, 7.89B, 1.20T. Past a quadrillion they are written as a
// count into NaN and save that.
const CC_DOC = () => db.collection('config').doc('cookieClicker');
const CC_FNS = ['click', 'clickcps', 'building', 'global', 'flat'];
const CC_MAX = { cost: 1e30, mult: 1e6, flat: 1e15, cps: 1e15 };
let ccUpgrades = [], ccItems = [], ccUnsub = null;
let ccProd = COOKIE_BUILDINGS.slice();    // every producer: built-in buildings, then staff-made items
const ccId = s => typeof s === 'string' && /^[A-Za-z0-9_]{1,40}$/.test(s);
const ccTxt = (s, n) => String(s == null ? '' : s).slice(0, n).trim();
function ccCleanItem(x) {
  if (!x || !ccId(x.id)) return null;
  const cost = +x.cost, cps = +x.cps; let g = +x.growth;
  if (!isFinite(cost) || cost < 1 || cost > CC_MAX.cost || !isFinite(cps) || cps <= 0 || cps > CC_MAX.cps) return null;
  if (!isFinite(g) || g < 1.01 || g > 2) g = 1.15;
  const name = ccTxt(x.name, 24), ic = ccTxt(x.ic, 8);
  return name && ic ? { id: x.id, name, ic, cost, cps, growth: g } : null;
}
function ccCleanUpgrade(x) {
  if (!x || !ccId(x.id) || !CC_FNS.includes(x.fn)) return null;
  const cost = +x.cost, val = +x.val;
  if (!isFinite(cost) || cost < 0 || cost > CC_MAX.cost || !isFinite(val) || val <= 0) return null;
  if ((x.fn === 'click' || x.fn === 'building') && val <= 1) return null;
  if (val > (x.fn === 'flat' ? CC_MAX.flat : CC_MAX.mult)) return null;
  if (x.fn === 'building' && !ccId(x.target)) return null;
  const name = ccTxt(x.name, 24), ic = ccTxt(x.ic, 8);
  if (!name || !ic) return null;
  return { id: x.id, name, ic, cost, fn: x.fn, val, target: x.fn === 'building' ? x.target : '',
           reqId: ccId(x.reqId) ? x.reqId : '', reqN: Math.max(1, Math.floor(+x.reqN || 1)) };
}
function ccApplyContent(data) {
  const clean = (map, fn) => Object.values(map || {}).map(fn).filter(Boolean).sort((a, b) => a.cost - b.cost || a.name.localeCompare(b.name));
  ccUpgrades = clean(data.upgrades, ccCleanUpgrade);
  ccItems = clean(data.items, ccCleanItem);
  ccProd = COOKIE_BUILDINGS.concat(ccItems.map(it => ({ id: it.id, name: it.name, base: it.cost, cps: it.cps, ic: it.ic, growth: it.growth, custom: true })));
  if (currentGameId === 'cookie') { renderCookieShop(); updateCookieView(); }
  if (typeof ccAdminRefresh === 'function') ccAdminRefresh();
}
function ccStartContent() {
  ccStopContent();
  try { ccUnsub = CC_DOC().onSnapshot(s => ccApplyContent(s.exists ? s.data() : {}), () => {}); } catch (e) {}
}
function ccStopContent() { if (ccUnsub) { try { ccUnsub(); } catch (e) {} ccUnsub = null; } }
// What the upgrades the player owns add up to.
function ccFx() {
  const fx = { click: 1, clickShare: 0, global: 1, flat: 0, bld: {} };
  const own = new Set((UC && UC.cookieUpgrades) || []);
  ccUpgrades.forEach(u => {
    if (!own.has(u.id)) return;
    if (u.fn === 'click') fx.click *= u.val;
    else if (u.fn === 'clickcps') fx.clickShare += u.val / 100;
    else if (u.fn === 'global') fx.global *= 1 + u.val / 100;
    else if (u.fn === 'flat') fx.flat += u.val;
    else if (u.fn === 'building') fx.bld[u.target] = (fx.bld[u.target] || 1) * u.val;
  });
  return fx;
}
const ccFmt = v => String(Math.round(v * 100) / 100);
function ccEffectText(u) {
  const p = ccProd.find(b => b.id === u.target);
  switch (u.fn) {
    case 'click': return 'Clicks are x' + ccFmt(u.val) + ' stronger';
    case 'clickcps': return 'Each click also gives +' + ccFmt(u.val) + '% of your cookies/sec';
    case 'building': return (p ? p.name : 'A building') + ' makes x' + ccFmt(u.val) + ' cookies';
    case 'global': return 'All production +' + ccFmt(u.val) + '%';
    default: return '+' + ckNum(u.val) + ' cookies per second';
  }
}
function ccReqText(u) {
  const p = u.reqId && ccProd.find(b => b.id === u.reqId);
  return p ? 'Unlocks at ' + u.reqN + ' x ' + p.name : '';
}
// Not bought yet, aimed at something that still exists, and its unlock requirement (if any) is met.
function ccUpgradeAvailable(u) {
  if (((UC && UC.cookieUpgrades) || []).includes(u.id)) return false;
  if (u.fn === 'building' && !ccProd.some(b => b.id === u.target)) return false;
  if (u.reqId && ccProd.some(b => b.id === u.reqId) && ((UC.cookieBuildings || {})[u.reqId] || 0) < u.reqN) return false;
  return true;
}

function cookieBuildingPrice(b, owned){ return Math.floor(b.base*Math.pow(b.growth||1.15, owned)); }
// Owning 10, 25, 50, 100, 150 and 200 of a building doubles its output each time.
const COOKIE_MILESTONES=[10,25,50,100,150,200];
const cookieBuildingMult=n=>Math.pow(2, COOKIE_MILESTONES.filter(m=>n>=m).length);
function cookieCPS(){
  if(!UC) return 0;
  const bld=UC.cookieBuildings||{}, fx=ccFx(); let c=0;
  ccProd.forEach(b=>{ const n=bld[b.id]||0; if(n) c+=b.cps*n*cookieBuildingMult(n)*(fx.bld[b.id]||1); });
  return (c+fx.flat)*fx.global;
}
function cookieClickPower(){ const fx=ccFx(); return (1 + cookieCPS()*(0.02+fx.clickShare)) * fx.click; }
// A run starts at a quarter speed, which makes the first few minutes a grind,
// then picks up pace the longer you keep baking (slowly at first, then faster).
// Cashing out ends the run, which resets momentum along with everything else.
const COOKIE_MOMENTUM_START=0.25, COOKIE_MOMENTUM_MAX=2, COOKIE_MOMENTUM_RAMP=3000; // seconds to reach the max
function cookieMomentum(){
  const t=Math.min(1, ((UC&&UC.cookieRunSecs)||0)/COOKIE_MOMENTUM_RAMP);
  return COOKIE_MOMENTUM_START + (COOKIE_MOMENTUM_MAX-COOKIE_MOMENTUM_START)*Math.pow(t, 1.5);
}
const cookieMult=()=>cookieMomentum();
function cookieBaked(){ if(UC.cookiesRun==null) UC.cookiesRun=UC.cookies||0; return UC.cookiesRun; }
function ckNum(n){ return n<1 ? n.toFixed(2) : n<10 ? n.toFixed(1) : fmtNum(n); }
let cookieEngine=null, _cookieSaveAt=0, _cookieSavedSig='';
// What a save would change (not the run timer, which ticks by itself): when it's the same, nothing is written.
function cookieSig(){ return JSON.stringify([Math.floor(UC.cookies||0), Math.floor(UC.cookiesAllTime||0), UC.cookieBuildings||{}, UC.cookieUpgrades||[]]); }
// Cookie Clicker bakes in the background for everyone signed in. It used to save every 20 seconds, game open or not,
// which made every open NPD write (and read back) its profile around the clock and used up most of Firebase's
// free daily writes and reads. Now it saves once a minute while the game is open, every 10 minutes when it isn't,
// when you leave the page, and only when something changed (v4.60). Buying something still saves right away.
const COOKIE_SAVE_OPEN_MS=60000, COOKIE_SAVE_BACKGROUND_MS=600000;
function startCookieEngine(){
  if(!UC) return;
  // No offline earnings: cookies only accrue while Toblox is open.
  UC.cookieLastSave=Date.now();
  _cookieSavedSig=cookieSig(); _cookieSaveAt=Date.now();   // just loaded: nothing to save yet
  ccStartContent();
  if(cookieEngine) clearInterval(cookieEngine);
  cookieEngine=setInterval(()=>{
    const cps=cookieCPS(); if(cps>0){ const add=cps*0.2*cookieMult(); UC.cookies=(UC.cookies||0)+add; UC.cookiesAllTime=(UC.cookiesAllTime||0)+add; UC.cookiesRun=cookieBaked()+add; }
    UC.cookieRunSecs=(UC.cookieRunSecs||0)+0.2;
    if(currentGameId==='cookie') updateCookieView();
    if(Date.now()-_cookieSaveAt>(currentGameId==='cookie'?COOKIE_SAVE_OPEN_MS:COOKIE_SAVE_BACKGROUND_MS)) saveCookies();
  }, 200);
}
function stopCookieEngine(){ if(cookieEngine){ clearInterval(cookieEngine); cookieEngine=null; } ccStopContent(); }
// leaving the page (or switching away) keeps what was baked, if anything was
document.addEventListener('visibilitychange', () => { if (document.visibilityState === 'hidden' && cookieEngine && Date.now() - _cookieSaveAt > 15000) saveCookies(); });
async function saveCookies(){
  if(!UC) return; _cookieSaveAt=Date.now();
  const sig=cookieSig(); if(sig===_cookieSavedSig) return;   // nothing new: no write
  _cookieSavedSig=sig; UC.cookieLastSave=Date.now();
  try{ await dbUpdateUser(getU(), {cookies:UC.cookies, cookiesAllTime:UC.cookiesAllTime, cookiesRun:cookieBaked(), cookieRunSecs:UC.cookieRunSecs||0, cookieBuildings:UC.cookieBuildings, cookieUpgrades:UC.cookieUpgrades||[], cookieLastSave:UC.cookieLastSave}); }catch(e){}
}
function pick(a){ return a[Math.floor(Math.random()*a.length)]; }
function renderCookie(){
  const v=document.getElementById('cookie-game'); if(!v||!UC) return;
  v.innerHTML=`
    <div class="ck-left">
      <div class="ck-count"><span id="ck-cookies">0</span></div>
      <div class="ck-sub">cookies &middot; <span id="ck-cps">0</span>/sec</div>
      <button class="ck-cookie" id="ck-cookie" onclick="clickCookie(event)">${npdGameSvg("cookie", 92)}</button>
      <div class="ck-sub">+<span id="ck-click">1</span> per click</div>
      <div class="ck-run">
        <div><span>Momentum</span><b id="ck-momentum">x0.50</b></div>
        <div><span>Baked this run</span><b id="ck-baked">0</b></div>
      </div>
      <button class="ck-cashout" id="ck-cashout" onclick="cashOutCookies()">Cash out</button>
      <div class="ck-note">Cashing out pays Bottlecaps for everything baked this run, then resets your cookies, buildings, upgrades and momentum.</div>
    </div>
    <div class="ck-shop" id="ck-shop"></div>`;
  renderCookieShop(); updateCookieView();
}
function ckRow(b, bld, fx){
  const owned=bld[b.id]||0, price=cookieBuildingPrice(b,owned), afford=(UC.cookies||0)>=price;
  const next=COOKIE_MILESTONES.find(m=>m>owned);
  const each=b.cps*cookieBuildingMult(owned)*(fx.bld[b.id]||1)*fx.global;
  return `<button class="ck-item ${afford?'':'no'}" data-bid="${esc(b.id)}" onclick="buyCookieBuilding('${esc(b.id)}')" ${afford?'':'disabled'}>
      <span class="cki-ic">${esc(b.ic)}</span>
      <span class="cki-mid"><span class="cki-name">${esc(b.name)}</span><span class="cki-price">${npdGameSvg("cookie", 12)} ${fmtNum(price)} &middot; ${ckNum(each)}/s each${next?' &middot; x2 at '+next:''}</span></span>
      <span class="cki-owned">${owned}</span>
    </button>`;
}
function renderCookieShop(){
  const shop=document.getElementById('ck-shop'); if(!shop) return;
  const bld=UC.cookieBuildings||{}, fx=ccFx(), own=new Set(UC.cookieUpgrades||[]);
  const avail=ccUpgrades.filter(ccUpgradeAvailable);
  const bought=ccUpgrades.filter(u=>own.has(u.id));
  let html='';
  if(avail.length||bought.length){
    html+='<div class="ck-sec"><div class="ck-head">Upgrades</div>';
    if(avail.length) html+='<div class="ck-upg-list">'+avail.map(u=>{
      const afford=(UC.cookies||0)>=u.cost, req=ccReqText(u);
      return `<button class="ck-item ${afford?'':'no'}" data-uid="${esc(u.id)}" onclick="buyCookieUpgrade('${esc(u.id)}')" ${afford?'':'disabled'}>
        <span class="cki-ic">${esc(u.ic)}</span>
        <span class="cki-mid"><span class="cki-name">${esc(u.name)}</span><span class="cki-price">${npdGameSvg("cookie", 12)} ${fmtNum(u.cost)} &middot; ${esc(ccEffectText(u))}</span></span>
      </button>`; }).join('')+'</div>';
    else html+='<div class="ck-sub">No new upgrades right now. Buy more buildings to unlock them.</div>';
    if(bought.length) html+='<div class="ck-bought"><span>Bought:</span>'+bought.map(u=>`<span class="ck-chip" title="${esc(u.name)}: ${esc(ccEffectText(u))}">${esc(u.ic)}</span>`).join('')+'</div>';
    html+='</div>';
  }
  html+='<div class="ck-sec"><div class="ck-head">Buildings</div>'+COOKIE_BUILDINGS.map(b=>ckRow(b,bld,fx)).join('')+'</div>';
  const items=ccProd.filter(b=>b.custom);
  if(items.length) html+='<div class="ck-sec"><div class="ck-head">Items</div>'+items.map(b=>ckRow(b,bld,fx)).join('')+'</div>';
  const keep=shop.querySelector('.ck-upg-list'), top=keep?keep.scrollTop:0;   // keep the upgrade list where it was scrolled
  shop.innerHTML=html;
  const again=shop.querySelector('.ck-upg-list'); if(again) again.scrollTop=top;
}
function updateCookieView(){
  const c=document.getElementById('ck-cookies'); if(c) c.textContent=fmtNum(UC.cookies||0);
  const m=cookieMult();
  const cps=document.getElementById('ck-cps'); if(cps) cps.textContent=ckNum(cookieCPS()*m);
  const cl=document.getElementById('ck-click'); if(cl) cl.textContent=ckNum(cookieClickPower()*m);
  const mo=document.getElementById('ck-momentum'); if(mo) mo.textContent='x'+cookieMomentum().toFixed(2);
  const bk=document.getElementById('ck-baked'); if(bk) bk.textContent=fmtNum(cookieBaked());
  const co=document.getElementById('ck-cashout');
  if(co){ const orbs=Math.floor(cookieBaked()/COOKIE_CASH_RATE); co.disabled=orbs<1; co.textContent = orbs<1 ? 'Bake '+fmtNum(COOKIE_CASH_RATE)+' cookies to cash out' : 'Cash out for '+fmtOrbs(orbs)+' Bottlecaps'; }
  const shop=document.getElementById('ck-shop');
  if(shop){
    shop.querySelectorAll('[data-bid]').forEach(el=>{ const b=ccProd.find(x=>x.id===el.dataset.bid); if(!b)return; const afford=(UC.cookies||0)>=cookieBuildingPrice(b,(UC.cookieBuildings||{})[b.id]||0); el.classList.toggle('no',!afford); el.disabled=!afford; });
    shop.querySelectorAll('[data-uid]').forEach(el=>{ const u=ccUpgrades.find(x=>x.id===el.dataset.uid); if(!u)return; const afford=(UC.cookies||0)>=u.cost; el.classList.toggle('no',!afford); el.disabled=!afford; });
  }
}
function clickCookie(e){
  if(!UC) return;
  const p=cookieClickPower()*cookieMult(); UC.cookies=(UC.cookies||0)+p; UC.cookiesAllTime=(UC.cookiesAllTime||0)+p; UC.cookiesRun=cookieBaked()+p;
  trackQuest('cookie',1);
  updateCookieView();
  const btn=document.getElementById('ck-cookie'); if(btn){ btn.style.transform='scale(.94)'; setTimeout(()=>btn.style.transform='',80); }
  try{ const f=document.createElement('div'); f.className='ck-float'; f.textContent='+'+ckNum(p); f.style.left=e.clientX+'px'; f.style.top=e.clientY+'px'; document.body.appendChild(f); setTimeout(()=>f.remove(),900); }catch(_){}
}
function buyCookieBuilding(id){
  const b=ccProd.find(x=>x.id===id); if(!b||!UC) return;
  const owned=(UC.cookieBuildings||{})[id]||0, price=cookieBuildingPrice(b,owned);
  if((UC.cookies||0)<price){ showToast('Not enough cookies.'); return; }
  UC.cookies-=price; UC.cookieBuildings=UC.cookieBuildings||{}; UC.cookieBuildings[id]=owned+1;
  renderCookieShop(); updateCookieView(); saveCookies();
}
function buyCookieUpgrade(id){
  const u=ccUpgrades.find(x=>x.id===id); if(!u||!UC) return;
  if(!ccUpgradeAvailable(u)){ showToast('That upgrade is not available.'); renderCookieShop(); return; }
  if((UC.cookies||0)<u.cost){ showToast('Not enough cookies.'); return; }
  UC.cookies-=u.cost; UC.cookieUpgrades=(UC.cookieUpgrades||[]).concat(u.id);
  renderCookieShop(); updateCookieView(); saveCookies();
}
function cashOutCookies(){
  if(!UC) return;
  const baked=Math.floor(cookieBaked()), orbs=Math.floor(baked/COOKIE_CASH_RATE);
  if(orbs<1){ showToast('Bake at least '+fmtNum(COOKIE_CASH_RATE)+' cookies this run to cash out.'); return; }
  // games can pay up to EARN_CAP Bottlecaps a day (v4.57), and cashing out resets the whole run, so say first if it won't all fit
  earnRoom().then(room=>{
  if(room<1){ showToast(earnCapText()); return; }
  const short=orbs>room;
  confirmAction({
    title:'Cash out and start over?',
    body:'You baked '+fmtNum(baked)+' cookies this run. Cashing out pays '+fmtOrbs(Math.min(orbs,room))+' Bottlecaps and resets your cookies, buildings, upgrades and momentum.'
      +(short?' Games can only give you '+fmtOrbs(room)+' more Bottlecaps today, so the rest of this run would be lost. Cash out after '+earnResetText()+' to get all '+fmtOrbs(orbs)+'.':''),
    confirmLabel:short?'Cash out anyway':'Cash out', danger:short,
    onConfirm: async ()=>{
      const paid=Math.min(Math.floor(cookieBaked()/COOKIE_CASH_RATE), room);
      if(paid<1) return;
      UC.cookies=0; UC.cookiesRun=0; UC.cookieRunSecs=0; UC.cookieBuildings={}; UC.cookieUpgrades=[];
      UC.coins=(UC.coins||0)+paid;
      await dbUpdateUser(getU(), {coins:UC.coins, cookies:0, cookiesRun:0, cookieRunSecs:0, cookieBuildings:{}, cookieUpgrades:[]});
      _cookieSavedSig=cookieSig();   // (that was the save)
      refreshCaps();
      if(currentGameId==='cookie'){ renderCookieShop(); updateCookieView(); }
      showToast('Cashed out '+fmtOrbs(paid)+' Bottlecaps. Fresh run started.');
    }
  });
  });
}

// ============================================================
//  GAMES — GROW A GARDEN  (featured)
// ============================================================
const GG_CASH_RATE=1000000;   // Sheckles per 1 Bottlecap
const GG_MAX_PLOTS=12, GG_START_PLOTS=4;
const SHK='<span class="gg-shk">S</span>';   // styled Sheckles token (no emoji, per request)
// Rarity ladder (low to high). Colors live in CSS as .r-<id>; the top three are animated gradients.
const GG_RARITY={
  common:{n:'Common'}, uncommon:{n:'Uncommon'}, rare:{n:'Rare'}, epic:{n:'Epic'},
  legendary:{n:'Legendary'}, divine:{n:'Divine'}, super:{n:'Super'}, prismatic:{n:'Prismatic'}, transcendent:{n:'Transcendent'},
  null:{n:'Null'}   // the rarest of all: black and red
};
function ggRar(r){ return GG_RARITY[r]?r:'common'; }
function rarBadge(r){ r=ggRar(r); return `<span class="gg-rar r-${r}">${GG_RARITY[r].n}</span>`; }
const GG_RARITY_ORDER=Object.keys(GG_RARITY).reduce((m,k,i)=>{ m[k]=i; return m; },{});
function ggRarOrd(r){ const o=GG_RARITY_ORDER[ggRar(r)]; return o==null?0:o; }
// Order any item list (built-in or admin made) by rarity, common first, then by price.
function ggSortByRarity(arr){ return arr.slice().sort((a,b)=> ggRarOrd(a.rarity)-ggRarOrd(b.rarity) || (a.cost||0)-(b.cost||0)); }
const GG_BASE_SEEDS=[
  {id:'carrot',     name:'Carrot',       ic:npdGameBadge('#f97316','CA'), rarity:'common',    cost:10,  grow:8000,   sell:18,      baseWeight:0.30},
  {id:'strawberry', name:'Strawberry',   ic:npdGameBadge('#ef4444','ST'), rarity:'common',    cost:30,  grow:14000,  sell:55,      baseWeight:0.25},
  {id:'blueberry',  name:'Blueberry',    ic:npdGameBadge('#3b82f6','BL'), rarity:'uncommon',  cost:75,  grow:22000,  sell:140,     baseWeight:0.18},
  {id:'tomato',     name:'Tomato',       ic:npdGameBadge('#dc2626','TM'), rarity:'uncommon',  cost:200,  grow:34000,  sell:380,     baseWeight:0.60},
  {id:'corn',       name:'Corn',         ic:npdGameBadge('#eab308','CN'), rarity:'rare',      cost:500,  grow:48000,  sell:980,     baseWeight:1.20},
  {id:'watermelon', name:'Watermelon',   ic:npdGameBadge('#16a34a','WM'), rarity:'rare',      cost:1500,  grow:75000,  sell:3000,    baseWeight:6.00},
  {id:'pumpkin',    name:'Pumpkin',      ic:npdGameBadge('#ea580c','PK'), rarity:'epic',      cost:5000,  grow:110000, sell:11000,   baseWeight:9.00},
  {id:'apple',      name:'Apple',        ic:npdGameBadge('#e11d48','AP'), rarity:'epic',      cost:12000,  grow:150000, sell:28000,   baseWeight:0.40},
  {id:'pineapple',  name:'Pineapple',    ic:npdGameBadge('#ca8a04','PN'), rarity:'legendary', cost:35000,  grow:200000, sell:86000,   baseWeight:2.00},
  {id:'grape',      name:'Grape',        ic:npdGameBadge('#7c3aed','GP'), rarity:'legendary', cost:90000, grow:270000, sell:240000,  baseWeight:0.80},
  {id:'mango',      name:'Mango',        ic:npdGameBadge('#f59e0b','MG'), rarity:'divine',    cost:250000, grow:360000, sell:720000,  baseWeight:1.50},
  {id:'dragon',     name:'Dragon Fruit', ic:npdGameBadge('#db2777','DF'), rarity:'super',     cost:700000, grow:480000, sell:2200000, baseWeight:1.80},
];
// A sprinkler attaches to a plant: speed = how much faster it grows, weight = PERCENT extra weight (= value).
const GG_BASE_SPRINKLERS=[
  {id:'basic',    name:'Basic Sprinkler',    ic:npdGameBadge('#38bdf8','S1'), rarity:'common',    cost:1500,  speed:0.5, weight:0.25},
  {id:'advanced', name:'Advanced Sprinkler', ic:npdGameBadge('#0ea5e9','S2'), rarity:'rare',      cost:8000,  speed:1.0, weight:0.60},
  {id:'godly',    name:'Godly Sprinkler',    ic:npdGameBadge('#6366f1','S3'), rarity:'legendary', cost:40000,  speed:2.5, weight:1.20},
  {id:'master',   name:'Master Sprinkler',   ic:npdGameBadge('#a855f7','S4'), rarity:'divine',    cost:150000, speed:5.0, weight:2.50},
];
// Pets give a global sell-value bonus (stacks).
const GG_BASE_PETS=[
  {id:'snail',     name:'Snail',   ic:npdGameBadge('#84cc16','SN'), rarity:'common',      cost:5000,  sell:0.03},
  {id:'bunny',     name:'Bunny',   ic:npdGameBadge('#ec4899','BN'), rarity:'uncommon',    cost:25000,  sell:0.06},
  {id:'cat',       name:'Cat',     ic:npdGameBadge('#f59e0b','CT'), rarity:'rare',        cost:100000,  sell:0.10},
  {id:'dog',       name:'Dog',     ic:npdGameBadge('#b45309','DG'), rarity:'epic',        cost:400000,  sell:0.15},
  {id:'fox',       name:'Fox',     ic:npdGameBadge('#ea580c','FX'), rarity:'legendary',   cost:1500000,  sell:0.25},
  // Raccoon is free, but only for someone who owns everything in Grow a Garden. It multiplies every Sheckle you earn.
  {id:'raccoon',   name:'Raccoon', ic:npdGameBadge('#475569','RC'), rarity:'null',        cost:0,        fn:'mult', val:490050, requiresAll:true},
];
let GG_SEEDS=ggSortByRarity(GG_BASE_SEEDS), GG_SEED_MAP={};
let GG_SPRINKLERS=ggSortByRarity(GG_BASE_SPRINKLERS), GG_SPRINKLER_MAP={};
let GG_PETS=ggSortByRarity(GG_BASE_PETS), GG_PET_MAP={};
function ggRebuildMaps(){ GG_SEED_MAP={}; GG_SEEDS.forEach(s=>GG_SEED_MAP[s.id]=s); GG_SPRINKLER_MAP={}; GG_SPRINKLERS.forEach(s=>GG_SPRINKLER_MAP[s.id]=s); GG_PET_MAP={}; GG_PETS.forEach(s=>GG_PET_MAP[s.id]=s); }
ggRebuildMaps();
let ggCustomSeeds=[], ggCustomSprinklers=[], ggCustomPets=[];
// Custom seeds, sprinklers and pets published from the admin panel (Quests → GAG), merged on top of the built-ins.
async function loadGardenContent(){
  const get=async coll=>{ try{ const s=await db.collection(coll).get(); return s.docs.map(d=>({ ...d.data(), id:d.id })); }catch(e){ return []; } };
  const [seeds,spr,pets]=await Promise.all([get('gardenSeeds'),get('gardenSprinklers'),get('gardenPets')]);
  ggCustomSeeds=seeds; ggCustomSprinklers=spr; ggCustomPets=pets;
  GG_SEEDS=ggSortByRarity(GG_BASE_SEEDS.concat(ggCustomSeeds));
  GG_SPRINKLERS=ggSortByRarity(GG_BASE_SPRINKLERS.concat(ggCustomSprinklers));
  GG_PETS=ggSortByRarity(GG_BASE_PETS.concat(ggCustomPets));
  ggRebuildMaps();
}
let ggSel='carrot', ggSprSel='basic', ggPetSel='snail', ggEngine=null, _ggSaveAt=0, ggShopTab='seeds', ggShovel=false;
let _ggPetStepAt=0;
function ggInitState(){
  if(!UC) return;
  if(typeof UC.ggSheckles!=='number') UC.ggSheckles=50;
  if(typeof UC.ggShecklesAllTime!=='number') UC.ggShecklesAllTime=0;
  if(!Array.isArray(UC.ggPlots)) UC.ggPlots=[];
  if(!Array.isArray(UC.ggInventory)) UC.ggInventory=[];
  if(!Array.isArray(UC.ggPets)) UC.ggPets=[];
  if(!Array.isArray(UC.ggOwnedSeeds)) UC.ggOwnedSeeds=[];
  if(!Array.isArray(UC.ggOwnedSprinklers)) UC.ggOwnedSprinklers=[];
  if(typeof UC.ggUnlocked!=='number') UC.ggUnlocked=GG_START_PLOTS;
  // migrate old single-sprinkler plots to the new multi-sprinkler array
  UC.ggPlots.forEach(p=>{ if(p){ if(!Array.isArray(p.sprinklers)) p.sprinklers = p.sprinkler ? [p.sprinkler] : []; if('sprinkler' in p) delete p.sprinkler; } });
  while(UC.ggPlots.length<GG_MAX_PLOTS) UC.ggPlots.push(null);
  // anything already planted or sprinkled counts as owned (for accounts from before ownership was tracked)
  UC.ggPlots.forEach(p=>{ if(!p) return; if(p.seed&&UC.ggOwnedSeeds.indexOf(p.seed)<0) UC.ggOwnedSeeds.push(p.seed); (p.sprinklers||[]).forEach(id=>{ if(UC.ggOwnedSprinklers.indexOf(id)<0) UC.ggOwnedSprinklers.push(id); }); });
}
// A plant can hold several different sprinklers; their speed and weight boosts stack. Works for any owner.
function ggPlotSprs(p){ if(!p) return []; let ids=Array.isArray(p.sprinklers)?p.sprinklers:(p.sprinkler?[p.sprinkler]:[]); return ids.map(id=>GG_SPRINKLER_MAP[id]).filter(Boolean); }
function ggPlotSpeed(p){ let b=0; ggPlotSprs(p).forEach(s=>b+=(s.speed||0)); return 1+b+ggPetBonus('growth'); }
function ggPlotWeightMult(p){ let b=0; ggPlotSprs(p).forEach(s=>b+=(s.weight||0)); return 1+b; }   // percent boost: 0.25 = +25%
// Pets: own a pet to collect its global sell bonus; bonuses stack across pets.
// Admin grant: setting `raccoon: true` on a user's profile doc (Firebase) gives them the Raccoon, no requirements.
// It is derived, not copied into ggPets, so setting it back to false takes it away again unless they earned it.
let ggRaccoonSeen=null;
function ggRaccoonGranted(){ return !!(myProfile && (myProfile.raccoon===true || (typeof npdHasEverything==='function' && npdHasEverything(myProfile)))); }
function ggActivePets(){ const a=(UC&&Array.isArray(UC.ggPets))?UC.ggPets:[]; return (ggRaccoonGranted()&&a.indexOf('raccoon')<0)?a.concat('raccoon'):a; }
function ggOwnsPet(id){ return ggActivePets().indexOf(id)>=0; }
// Called on every profile update: toasts when the grant arrives and refreshes the garden if it is open.
function ggOnProfileUpdate(){
  const g=ggRaccoonGranted(), changed=ggRaccoonSeen!==null&&ggRaccoonSeen!==g;
  ggRaccoonSeen=g;
  if(!changed) return;
  if(g) showToast('You were given the Raccoon in Grow a Garden!');
  if(currentGameId==='growgarden'&&document.getElementById('gg-plots')){ renderGGShop(); renderGardenPets(); updateGGBank(); }
}
// A pet has one function: 'sell' (+% sell value, stacks), 'mult' (multiplies every Sheckle earned),
// 'growth' (+% grow speed), 'mutation' (+% mutation chance) or 'discount' (-% seed prices).
// Older pets only have a `sell` number, which still means a sell bonus.
function ggPetFn(p){ return p.fn||'sell'; }
function ggPetVal(p){ return p.fn ? (p.val||0) : (p.sell||0); }
function ggPetBonus(fn){ let b=0; ggActivePets().forEach(id=>{ const p=GG_PET_MAP[id]; if(p&&ggPetFn(p)===fn) b+=ggPetVal(p); }); return b; }
function ggPetSellMult(){
  let add=0, mult=1;
  ggActivePets().forEach(id=>{ const p=GG_PET_MAP[id]; if(!p) return; const f=ggPetFn(p), v=ggPetVal(p); if(f==='sell') add+=v; else if(f==='mult') mult*=Math.max(1,v); });
  return (1+add)*mult;
}
function ggPetAbility(p){
  const f=ggPetFn(p), v=ggPetVal(p), pc=Math.round(v*100);
  if(f==='mult') return '×'+fmtNum(v)+' Sheckles';
  if(f==='growth') return '+'+pc+'% grow speed';
  if(f==='mutation') return '+'+pc+'% mutation chance';
  if(f==='discount') return '-'+pc+'% seed prices';
  return '+'+pc+'% sell value';
}
function ggSeedCost(s){ return Math.max(1, Math.ceil(s.cost*(1-Math.min(0.9, ggPetBonus('discount'))))); }
function ggMutBonus(p,s){ let b=ggPetBonus('mutation'); ggPlotSprs(p).forEach(x=>b+=(x.mutation||0)); if(s&&s.fn==='gold') b+=(s.fnVal||0); return b; }
// "Own everything": every seed and sprinkler bought at least once, every other pet adopted, and every plot unlocked.
function ggOwnAllStatus(){
  const seeds=(UC&&UC.ggOwnedSeeds)||[], sprs=(UC&&UC.ggOwnedSprinklers)||[], pets=(UC&&UC.ggPets)||[];
  const needSeeds=GG_SEEDS.filter(x=>seeds.indexOf(x.id)<0), needSprs=GG_SPRINKLERS.filter(x=>sprs.indexOf(x.id)<0);
  const needPets=GG_PETS.filter(x=>!x.requiresAll&&pets.indexOf(x.id)<0);
  const needPlots=Math.max(0,GG_MAX_PLOTS-((UC&&UC.ggUnlocked)||GG_START_PLOTS));
  const total=GG_SEEDS.length+GG_SPRINKLERS.length+GG_PETS.filter(x=>!x.requiresAll).length+1;
  const missing=needSeeds.length+needSprs.length+needPets.length+(needPlots?1:0);
  const parts=[]; if(needSeeds.length) parts.push(needSeeds.length+' seed'+(needSeeds.length>1?'s':'')); if(needSprs.length) parts.push(needSprs.length+' sprinkler'+(needSprs.length>1?'s':'')); if(needPets.length) parts.push(needPets.length+' pet'+(needPets.length>1?'s':'')); if(needPlots) parts.push(needPlots+' plot'+(needPlots>1?'s':''));
  return { ok:!missing, have:total-missing, total, summary:parts.join(', ') };
}
function ggGrowMs(s,p){ return Math.max(50, ((s&&s.grow)||8000)/ggPlotSpeed(p)); }
function ggRollW(){ return +(0.8+Math.random()*0.5).toFixed(3); }
function ggPlotReady(p){ if(!p) return false; const s=GG_SEED_MAP[p.seed]; return s?Date.now()-p.at>=ggGrowMs(s,p):false; }
function ggPlotProgress(p){ if(!p) return 0; const s=GG_SEED_MAP[p.seed]; return s?Math.min(1,(Date.now()-p.at)/ggGrowMs(s,p)):1; }
function ggPlotFactor(p){ const s=p&&GG_SEED_MAP[p.seed]; return (p&&typeof p.w==='number'?p.w:1)*ggPlotWeightMult(p)*((s&&s.fn==='weight')?(1+(s.fnVal||0)):1); }     // weight/value multiplier
function ggPlotWeight(p){ const s=GG_SEED_MAP[p.seed]; return (s?(s.baseWeight||0.5):0.5)*ggPlotFactor(p); }  // kilograms
function ggPlotValue(p){ const s=GG_SEED_MAP[p.seed]; if(!s) return 0; let sb=0; ggPlotSprs(p).forEach(x=>sb+=(x.sellBoost||0)); return Math.max(1, Math.floor(s.sell*ggPlotFactor(p)*(1+sb))); }
function fmtWeight(kg){ return (kg<10?kg.toFixed(2):kg.toFixed(1))+' kg'; }
function ggExpandCost(){ const extra=(UC.ggUnlocked||GG_START_PLOTS)-GG_START_PLOTS; return Math.floor(150*Math.pow(2.4, extra)); }
function ggGrowLabel(ms){ const s=Math.round(ms/1000); if(s<60) return s+'s'; const m=Math.floor(s/60), r=s%60; return m+'m'+(r?(' '+r+'s'):''); }
function ggRollMut(bonus){ const k=1+(bonus||0), r=Math.random(); if(r<0.02*k) return {id:'rainbow',name:'Rainbow',badge:'[RBW]',mult:5}; if(r<0.12*k) return {id:'gold',name:'Gold',badge:'[GLD]',mult:2}; return null; }
async function saveGarden(){ if(!UC) return; _ggSaveAt=Date.now(); try{ await dbUpdateUser(getU(), {ggSheckles:UC.ggSheckles, ggShecklesAllTime:UC.ggShecklesAllTime, ggPlots:UC.ggPlots, ggUnlocked:UC.ggUnlocked, ggInventory:UC.ggInventory, ggPets:UC.ggPets, ggOwnedSeeds:UC.ggOwnedSeeds||[], ggOwnedSprinklers:UC.ggOwnedSprinklers||[]}); }catch(e){} }
function renderGrowGarden(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  ggInitState();
  ggShovel=false; ggShopTab='seeds';
  stage.innerHTML='<div class="gg-game" id="gg-game"></div>';
  renderGardenAll();
  startGGEngine();
  // pull in any admin-published custom seeds/sprinklers, then refresh the shop
  loadGardenContent().then(()=>{ if(currentGameId==='growgarden'){ renderGGShop(); updateGGBank(); } });
}
function renderGardenAll(){
  const g=document.getElementById('gg-game'); if(!g) return;
  g.innerHTML=`
    <div class="gg-top">
      <div class="gg-bank">
        <div class="gg-bank-amt"><span id="gg-sheckles">0</span></div>
        <div class="gg-bank-sub">Sheckles &middot; <span id="gg-boost">Harvest crops, then sell them</span></div>
      </div>
      <div class="gg-actions">
        <button class="gg-btn gg-harvest" onclick="ggHarvestAll()">${npdGameSvg("basket", 14)} Harvest All</button>
        <button class="gg-btn gg-shovel-btn${ggShovel?' on':''}" onclick="ggToggleShovel()">${npdGameSvg("shovel", 14)} Shovel</button>
        <button class="gg-btn gg-cash" onclick="ggCashOut()">Cash Out (${fmtNum(GG_CASH_RATE)} ${SHK} = 1 <span class="orb-ic"></span>)</button>
        
        
      </div>
    </div>
    <div class="gg-main">
      <div class="gg-garden">
        <div class="gg-plots" id="gg-plots"></div>
        <div class="gg-pets-layer" id="gg-pets-layer"></div>
        <div class="gg-hint" id="gg-hint">Pick a seed and tap a plot to plant. Crops regrow after every harvest, so harvest into your basket and sell, or dig a plant up with the shovel.</div>
      </div>
      <div class="gg-shop">
        <div class="gg-shoptabs">
          <button class="gg-shoptab${ggShopTab==='seeds'?' on':''}" data-tab="seeds" onclick="ggSetShopTab('seeds')">${npdGameSvg("seed", 14)} Seeds</button>
          <button class="gg-shoptab${ggShopTab==='sprinklers'?' on':''}" data-tab="sprinklers" onclick="ggSetShopTab('sprinklers')">${npdGameSvg("drop", 14)} Sprinklers</button>
          <button class="gg-shoptab${ggShopTab==='pets'?' on':''}" data-tab="pets" onclick="ggSetShopTab('pets')">${npdGameSvg("paw", 14)} Pets</button>
          <button class="gg-shoptab${ggShopTab==='sell'?' on':''}" data-tab="sell" onclick="ggSetShopTab('sell')">${npdGameSvg("basket", 14)} Sell</button>
        </div>
        <div id="gg-shopbody"></div>
      </div>
    </div>`;
  renderGGPlots(); renderGardenPets(); renderGGShop(); updateGGBank();
}
function ggSetShopTab(t){ ggShopTab=t; document.querySelectorAll('.gg-shoptab').forEach(b=>b.classList.toggle('on', b.dataset.tab===t)); renderGGShop(); renderGGPlots(); }
function ggToggleShovel(){ ggShovel=!ggShovel; const b=document.querySelector('.gg-shovel-btn'); if(b) b.classList.toggle('on',ggShovel); renderGGPlots(); if(ggShovel) showToast('Shovel ready. Tap a plant to dig it up.'); }
function renderGGPlots(){
  const wrap=document.getElementById('gg-plots'); if(!wrap) return;
  let html='';
  for(let i=0;i<GG_MAX_PLOTS;i++){
    if(i>=UC.ggUnlocked){
      const isNext=(i===UC.ggUnlocked);
      html+=`<div class="gg-plot locked${isNext?' next':''}"${isNext?' onclick="ggExpand()"':''}>
        <span class="gg-lock">${npdGameSvg("lock", 16)}</span>${isNext?`<span class="gg-lock-cost">${SHK} ${fmtNum(ggExpandCost())}</span><span class="gg-lock-hint">Unlock</span>`:''}</div>`;
      continue;
    }
    const p=UC.ggPlots[i];
    if(!p){ html+=`<div class="gg-plot empty${ggShovel?' dig':''}" onclick="ggPlotTap(${i})"><span class="gg-soil">+</span></div>`; continue; }
    const s=GG_SEED_MAP[p.seed], ready=ggPlotReady(p), prog=ggPlotProgress(p), pct=Math.round(prog*100), sprs=ggPlotSprs(p);
    const canSprinkle=ggShopTab==='sprinklers'&&sprs.length<GG_SPRINKLERS.length;
    const cls='gg-plot planted'+(ready?' ready':'')+(ggShovel?' dig':'')+(canSprinkle?' sprinklable':'');
    html+=`<div class="${cls}" data-i="${i}" onclick="ggPlotTap(${i})">
      ${sprs.length?`<span class="gg-plot-spr" title="${sprs.map(x=>escapeHtml(x.name)).join(', ')}">${sprs.map(x=>x.ic).join('')}</span>`:''}
      <span class="gg-plant" style="${ready?'':'opacity:'+(0.4+0.6*prog).toFixed(2)+';transform:scale('+(0.7+0.3*prog).toFixed(2)+')'}">${s?s.ic:npdGameSvg("seed", 20)}</span>
      ${ready?`<span class="gg-ready-tag">${fmtWeight(ggPlotWeight(p))}</span>`:`<div class="gg-grow"><div class="gg-grow-bar" style="width:${pct}%"></div></div>`}</div>`;
  }
  wrap.innerHTML=html;
}
async function ggPlotTap(i){
  if(!UC||i>=UC.ggUnlocked) return;
  const p=UC.ggPlots[i];
  if(ggShovel){ if(p) ggDig(i); else showToast('Nothing planted there.'); return; }
  if(ggShopTab==='sprinklers'){ if(p) await ggPlaceSprinkler(i); else showToast('Plant something here first.'); return; }
  if(!p){ await ggPlant(i); return; }
  if(ggPlotReady(p)) ggHarvest(i); else showToast('Still growing.');
}
function renderGGShop(){
  const body=document.getElementById('gg-shopbody'); if(!body) return;
  if(ggShopTab==='sprinklers'){ body.innerHTML=ggSprinklerShopHtml(); return; }
  if(ggShopTab==='pets'){ body.innerHTML=ggPetShopHtml(); return; }
  if(ggShopTab==='sell'){ body.innerHTML=ggSellShopHtml(); return; }
    const rows=GG_SEEDS.map(s=>{
    const sel=ggSel===s.id;
    const afford=(UC.ggSheckles||0)>=ggSeedCost(s);
    const priceStr=SHK+' '+fmtNum(ggSeedCost(s));
    return `<div class="gg-seed${sel?' sel':''}${afford?'':' poor'}" onclick="ggSelect('${s.id}')">
      <span class="gg-seed-ic">${s.ic}</span>
      <span class="gg-seed-mid"><span class="gg-seed-name">${escapeHtml(s.name)} ${rarBadge(s.rarity)}</span><span class="gg-seed-meta">${priceStr} · ${ggGrowLabel(s.grow)} · sells ${SHK} ${fmtNum(s.sell)}${ggSeedFnText(s)?' · '+ggSeedFnText(s):''}</span></span>
      ${sel?'<span class="gg-seed-sel">OK</span>':''}</div>`;
  }).join('');
  body.innerHTML=`<div class="gg-seedlist">${rows}</div>`;
}
function ggSeedFnText(s){
  const v=s.fnVal||0;
  if(s.fn==='gold') return '+'+Math.round(v*100)+'% mutation chance';
  if(s.fn==='multi') return '+'+Math.floor(v)+' extra crop'+(Math.floor(v)>1?'s':'')+' per harvest';
  if(s.fn==='weight') return '+'+Math.round(v*100)+'% heavier';
  return '';
}
function ggSprinklerShopHtml(){
    const note=`<div class="gg-spr-note">Pick a sprinkler, then tap one of your plants to place it. You can stack several different sprinklers on the same plant and their boosts add up. They stay until you dig the plant up.</div>`;
  const rows=GG_SPRINKLERS.map(s=>{
    const sel=ggSprSel===s.id;
    const afford=(UC.ggSheckles||0)>=(s.cost||0);
    const priceStr=SHK+' '+fmtNum(s.cost||0);
    return `<div class="gg-seed gg-spr${sel?' sel':''}${afford?'':' poor'}" onclick="ggSelectSpr('${s.id}')">
      <span class="gg-seed-ic">${s.ic}</span>
      <span class="gg-seed-mid"><span class="gg-seed-name">${escapeHtml(s.name)} ${rarBadge(s.rarity)}</span><span class="gg-seed-meta">${priceStr} · +${Math.round((s.speed||0)*100)}% speed · +${Math.round((s.weight||0)*100)}% weight${s.mutation?(' · +'+Math.round(s.mutation*100)+'% mutation'):''}${s.sellBoost?(' · +'+Math.round(s.sellBoost*100)+'% sell'):''}</span></span>
      ${sel?'<span class="gg-seed-sel">OK</span>':''}</div>`;
  }).join('');
  return note+`<div class="gg-seedlist">${rows}</div>`;
}
function ggPetShopHtml(){
  const bonus=Math.round((ggPetSellMult()-1)*100);
  const note=`<div class="gg-spr-note">Pets each have a special function. Sell bonuses stack${bonus>0?(' (yours: +'+fmtNum(bonus)+'%)'):''}.</div>`;
  const own=ggOwnAllStatus();
  const rows=GG_PETS.map(s=>{
    const owned=ggOwnsPet(s.id);
    const locked=!!s.requiresAll&&!owned&&!own.ok;
    const afford=(UC.ggSheckles||0)>=s.cost;
    const priceStr=s.requiresAll?'Free':(SHK+' '+fmtNum(s.cost));
    const ability=ggPetAbility(s);
    const meta=owned?((UC.ggPets||[]).indexOf(s.id)<0?'Gifted':'Owned'):(locked?('Own everything to unlock ('+own.have+'/'+own.total+')'):priceStr);
    return `<div class="gg-seed gg-pet${owned?' owned':''}${locked?' locked':''}${(owned||afford||s.requiresAll)?'':' poor'}"${owned?'':` onclick="ggBuyPet('${s.id}')"`}>
      <span class="gg-seed-ic">${s.ic}</span>
      <span class="gg-seed-mid"><span class="gg-seed-name">${escapeHtml(s.name)} ${rarBadge(s.rarity)}</span><span class="gg-seed-meta">${meta} · ${ability}</span></span>
      ${owned?'<span class="gg-seed-sel">OK</span>':''}</div>`;
  }).join('');
  return note+`<div class="gg-seedlist">${rows}</div>`;
}
function ggSellShopHtml(){
  const inv=(UC&&UC.ggInventory)||[];
  if(!inv.length) return `<div class="gg-spr-note">Your basket is empty. Harvest ripe crops, then sell them here for Sheckles.</div>`;
  const groups={};
  inv.forEach(it=>{ const g=groups[it.seed]||(groups[it.seed]={seed:it.seed,count:0,value:0,heaviest:0,muts:0}); g.count++; g.value+=(it.value||0); g.heaviest=Math.max(g.heaviest,it.weight||0); if(it.mut) g.muts++; });
  const total=inv.reduce((a,b)=>a+(b.value||0),0);
  const rows=Object.keys(groups).map(k=>{ const g=groups[k], s=GG_SEED_MAP[g.seed];
    return `<div class="gg-seed gg-sell" onclick="ggSellType('${g.seed}')">
      <span class="gg-seed-ic">${s?s.ic:npdGameSvg("seed", 20)}</span>
      <span class="gg-seed-mid"><span class="gg-seed-name">${s?escapeHtml(s.name):g.seed} ×${g.count}${g.muts?(' ['+g.muts+' mut]'):''}</span><span class="gg-seed-meta">worth ${SHK} ${fmtNum(g.value)} · up to ${fmtWeight(g.heaviest)}</span></span>
      <span class="gg-sell-btn">Sell</span></div>`;
  }).join('');
  return `<button class="gg-btn gg-sellall" onclick="ggSellAll()">Sell Everything (${SHK} ${fmtNum(total)})</button><div class="gg-seedlist">${rows}</div>`;
}
function updateGGBank(){
  const e=document.getElementById('gg-sheckles'); if(e) e.textContent=fmtNum(UC.ggSheckles||0);
  const b=document.getElementById('gg-boost'); if(b){ const n=((UC&&UC.ggInventory)||[]).length; b.textContent=n?(n+' crop'+(n>1?'s':'')+' in your basket — sell in the Sell tab'):'Harvest crops, then sell them'; }
}
function ggSelect(id){ if(!GG_SEED_MAP[id]) return; ggSel=id; renderGGShop(); }
function ggSelectSpr(id){ if(!GG_SPRINKLER_MAP[id]) return; ggSprSel=id; renderGGShop(); }
async function ggPlant(i){
  if(!UC||i>=UC.ggUnlocked||UC.ggPlots[i]) return;
  const s=GG_SEED_MAP[ggSel]; if(!s){ showToast('Pick a seed first.'); return; }
  const seedCost=ggSeedCost(s);
  if((UC.ggSheckles||0)<seedCost){ showToast('Not enough Sheckles for a '+s.name+' seed.'); return; }
  UC.ggSheckles-=seedCost;
  UC.ggOwnedSeeds=UC.ggOwnedSeeds||[]; if(UC.ggOwnedSeeds.indexOf(s.id)<0) UC.ggOwnedSeeds.push(s.id);
  UC.ggPlots[i]={seed:s.id, at:Date.now(), w:ggRollW(), sprinklers:[]};
  renderGGPlots(); renderGGShop(); updateGGBank(); saveGarden();
}
async function ggPlaceSprinkler(i){
  const p=UC.ggPlots[i]; if(!p) return;
  if(!Array.isArray(p.sprinklers)) p.sprinklers=[];
  const s=GG_SPRINKLER_MAP[ggSprSel]; if(!s){ showToast('Pick a sprinkler first.'); return; }
  if(p.sprinklers.indexOf(s.id)>=0){ showToast('This plant already has a '+s.name+'. Add a different one for more boost.'); return; }
  if((UC.ggSheckles||0)<(s.cost||0)){ showToast('Not enough Sheckles for '+s.name+'.'); return; }
  UC.ggSheckles-=(s.cost||0);
  UC.ggOwnedSprinklers=UC.ggOwnedSprinklers||[]; if(UC.ggOwnedSprinklers.indexOf(s.id)<0) UC.ggOwnedSprinklers.push(s.id);
  p.sprinklers.push(s.id);
  renderGGPlots(); renderGGShop(); updateGGBank(); saveGarden();
  showToast('Placed a '+s.name+' on this plant ('+p.sprinklers.length+' sprinkler'+(p.sprinklers.length>1?'s':'')+' now).');
}
function ggSelectPet(id){ if(!GG_PET_MAP[id]) return; ggPetSel=id; renderGGShop(); }
async function ggBuyPet(id){
  const s=GG_PET_MAP[id]; if(!s||!UC) return;
  if(ggOwnsPet(id)){ showToast('You already own the '+s.name+'.'); return; }
  if(s.requiresAll){
    const own=ggOwnAllStatus();
    if(!own.ok){ showToast('The '+s.name+' needs you to own everything in Grow a Garden. Still missing: '+own.summary+'.'); return; }
  }
  if((UC.ggSheckles||0)<s.cost){ showToast('Not enough Sheckles for the '+s.name+'.'); return; }
  UC.ggSheckles-=s.cost;
  UC.ggPets=UC.ggPets||[]; UC.ggPets.push(id);
  renderGGShop(); renderGardenPets(); updateGGBank(); saveGarden();
  showToast('You adopted the '+s.name+'!');
}
// Owned pets wander around the garden: one emoji per pet that strolls to random spots.
function renderGardenPets(){
  const layer=document.getElementById('gg-pets-layer'); if(!layer||!UC) return;
  layer.innerHTML=ggActivePets().map(id=>{ const p=GG_PET_MAP[id]; if(!p) return '';
    const l=(6+Math.random()*82).toFixed(1), t=(12+Math.random()*70).toFixed(1);
    return `<span class="gg-pet-walker" data-pet="${id}" title="${escapeHtml(p.name)}" style="left:${l}%;top:${t}%"><span class="gg-pet-body">${p.ic}</span></span>`;
  }).join('');
  _ggPetStepAt=0; ggPetStep();
}
function ggPetStep(){
  const layer=document.getElementById('gg-pets-layer'); if(!layer) return;
  layer.querySelectorAll('.gg-pet-walker').forEach(w=>{
    const curL=parseFloat(w.style.left)||50;
    const nl=6+Math.random()*82, nt=12+Math.random()*70, dur=(2.4+Math.random()*2.8).toFixed(2);
    w.style.transition='left '+dur+'s linear, top '+dur+'s linear, transform .25s';
    w.style.left=nl.toFixed(1)+'%'; w.style.top=nt.toFixed(1)+'%';
    w.style.transform='scaleX('+(nl<curL?-1:1)+')';
  });
}
function ggDig(i){
  if(!UC) return;
  const p=UC.ggPlots[i]; if(!p) return;
  const s=GG_SEED_MAP[p.seed], nspr=ggPlotSprs(p).length;
  UC.ggPlots[i]=null;
  renderGGPlots(); renderGGShop(); updateGGBank(); saveGarden();
  showToast('Dug up the '+(s?s.name:'plant')+(nspr?(' and its '+nspr+' sprinkler'+(nspr>1?'s':'')+'.'):'.'));
}
// One harvest of a plant: usually 1 crop, more for 'multi' seeds. Returns the basket entries and the best mutation.
function ggDoHarvest(p,s){
  const n=1+((s.fn==='multi')?Math.max(0,Math.floor(s.fnVal||0)):0), entries=[]; let best=null, weight=0;
  for(let k=0;k<n;k++){
    const mut=ggRollMut(ggMutBonus(p,s)); weight=ggPlotWeight(p);
    const value=Math.max(1, Math.floor(ggPlotValue(p)*(mut?mut.mult:1)*ggPetSellMult()));
    entries.push({seed:s.id, weight:+weight.toFixed(3), value, mut:mut?mut.id:null});
    if(mut&&(!best||mut.mult>best.mult)) best=mut;
  }
  return { entries, mut:best, weight };
}
function ggHarvest(i){
  if(!UC) return;
  const p=UC.ggPlots[i]; if(!p) return;
  if(!ggPlotReady(p)){ showToast('Still growing.'); return; }
  const s=GG_SEED_MAP[p.seed]; if(!s){ UC.ggPlots[i]=null; renderGGPlots(); return; }
  const h=ggDoHarvest(p,s), mut=h.mut, weight=h.weight;
  UC.ggInventory=UC.ggInventory||[]; h.entries.forEach(e=>UC.ggInventory.push(e));
  trackQuest('harvest',1);
  ggFloat(i, fmtWeight(weight)+(mut?(' '+mut.badge):'')+' picked', mut);
  p.at=Date.now(); p.w=ggRollW();   // multigrow: the plant stays and regrows
  renderGGPlots(); renderGGShop(); updateGGBank(); saveGarden();
  if(mut) showToast(mut.badge+' '+mut.name+' '+s.name+'! '+fmtWeight(weight)+' added to your basket.');
}
function ggHarvestAll(){
  if(!UC) return;
  UC.ggInventory=UC.ggInventory||[];
  let count=0, best=null;
  for(let i=0;i<UC.ggPlots.length;i++){
    const p=UC.ggPlots[i]; if(!p||!ggPlotReady(p)) continue;
    const s=GG_SEED_MAP[p.seed]; if(!s) continue;
    const h=ggDoHarvest(p,s);
    h.entries.forEach(e=>UC.ggInventory.push(e));
    count+=h.entries.length; if(h.mut) best=h.mut.name;
    p.at=Date.now(); p.w=ggRollW();
  }
  if(!count){ showToast('Nothing ready to harvest yet.'); return; }
  trackQuest('harvest',count);
  renderGGPlots(); renderGGShop(); updateGGBank(); saveGarden();
  showToast('Harvested '+count+' crop'+(count>1?'s':'')+' into your basket'+(best?(' (incl. a '+best+'!)'):'')+'. Sell them in the Sell tab.');
}
function ggSellType(seedId){
  if(!UC||!Array.isArray(UC.ggInventory)) return;
  let gained=0, n=0;
  UC.ggInventory=UC.ggInventory.filter(it=>{ if(it.seed===seedId){ gained+=(it.value||0); n++; return false; } return true; });
  if(!n) return;
  trackQuest('sell',n);
  UC.ggSheckles=(UC.ggSheckles||0)+gained; UC.ggShecklesAllTime=(UC.ggShecklesAllTime||0)+gained;
  renderGGShop(); updateGGBank(); saveGarden();
  const s=GG_SEED_MAP[seedId];
  showToast('Sold '+n+' '+(s?s.name:'crop')+(n>1?'s':'')+' for '+fmtNum(gained)+' Sheckles.');
}
function ggSellAll(){
  if(!UC||!Array.isArray(UC.ggInventory)||!UC.ggInventory.length){ showToast('Your basket is empty.'); return; }
  const gained=UC.ggInventory.reduce((a,b)=>a+(b.value||0),0), n=UC.ggInventory.length;
  trackQuest('sell',n);
  UC.ggInventory=[];
  UC.ggSheckles=(UC.ggSheckles||0)+gained; UC.ggShecklesAllTime=(UC.ggShecklesAllTime||0)+gained;
  renderGGShop(); updateGGBank(); saveGarden();
  showToast('Sold '+n+' crop'+(n>1?'s':'')+' for '+fmtNum(gained)+' Sheckles.');
}
function ggExpand(){
  if(!UC) return;
  if(UC.ggUnlocked>=GG_MAX_PLOTS){ showToast('All plots unlocked!'); return; }
  const cost=ggExpandCost();
  if((UC.ggSheckles||0)<cost){ showToast('Need '+fmtNum(cost)+' Sheckles to unlock a new plot.'); return; }
  UC.ggSheckles-=cost; UC.ggUnlocked++;
  renderGGPlots(); updateGGBank(); saveGarden();
  showToast('New plot unlocked! You now have '+UC.ggUnlocked+' plots.');
}
async function ggCashOut(){
  if(!UC) return;
  let caps=Math.floor((UC.ggSheckles||0)/GG_CASH_RATE);
  if(caps<1){ showToast('Need at least '+fmtNum(GG_CASH_RATE)+' Sheckles to cash out.'); return; }
  // only what today's limit from games still has room for (v4.57); the rest of the Sheckles stay
  const room=await earnRoom();
  if(room<1){ showToast(earnCapText()); return; }
  caps=Math.min(caps, room);
  UC.ggSheckles-=caps*GG_CASH_RATE; UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps);
  await dbUpdateUser(getU(), {ggSheckles:UC.ggSheckles, coins:UC.coins});
  refreshCaps(); updateGGBank(); renderGGShop();
  showToast('Cashed out '+fmtOrbs(caps)+' Bottlecap'+(caps>1?'s':'')+'!');
}
function ggFloat(i, text, mut){
  try{
    const plot=document.querySelector('.gg-plot[data-i="'+i+'"]'); if(!plot) return;
    const r=plot.getBoundingClientRect();
    const f=document.createElement('div'); f.className='gg-float'+(mut?(' '+mut.id):'');
    f.textContent=text; f.style.left=(r.left+r.width/2)+'px'; f.style.top=(r.top+8)+'px';
    document.body.appendChild(f); setTimeout(()=>f.remove(),1100);
  }catch(_){}
}
function startGGEngine(){ stopGGEngine(); ggEngine=setInterval(()=>{
  if(currentGameId==='growgarden' && document.getElementById('gg-plots')){
    renderGGPlots();
    if(Date.now()-_ggPetStepAt>2600){ _ggPetStepAt=Date.now(); ggPetStep(); }
  }
  if(Date.now()-_ggSaveAt>20000) saveGarden();
}, 600); }
function stopGGEngine(){ if(ggEngine){ clearInterval(ggEngine); ggEngine=null; } }
function ggCleanup(){ stopGGEngine(); }

// ============================================================
//  LIQUID DASH  (geometry-dash: cube, ship, ball, wave, spider, swing)
// ============================================================
const GEO_CAP_DIV=100; // score points needed per Bottlecap earned
const GD_MODES=['cube','ship','ball','wave','spider','swing'];
const GD_PORTAL_COL={ ship:'#19c3ff', ball:'#ffb020', wave:'#ff3df0', spider:'#9b5cff', swing:'#2ee6a6' }; // cube uses accent
let gdState=null, gdKeyHandler=null, gdKeyUpHandler=null, gdPointerUp=null;
// Canvas games read theme colors from the game window, where the theme's variables
// are in effect. Each color is resolved through a probe element, so hex, rgb(), hsl()
// and var() chains from custom themes all come back as a plain #rrggbb.
function gameStyle(){
  const host=document.querySelector('.fg-window')||document.body;
  const cs=getComputedStyle(host);
  return { getPropertyValue(name){
    const raw=cs.getPropertyValue(name).trim();
    if(!raw || /gradient|url\(/i.test(raw)) return '';
    const probe=document.createElement('span');
    probe.style.cssText='position:absolute;visibility:hidden;color:rgb(1,2,3)';
    probe.style.color=raw;   // an unusable value is ignored and leaves the sentinel behind
    host.appendChild(probe);
    const painted=getComputedStyle(probe).color;
    probe.remove();
    const rgb=painted==='rgb(1, 2, 3)' ? [] : (painted.match(/[\d.]+/g)||[]).slice(0,3);
    return rgb.length===3 ? '#'+rgb.map(v=>Math.round(+v).toString(16).padStart(2,'0')).join('') : '';
  } };
}
// Boards keep a dark surface under light themes so pieces drawn in white stay visible.
function boardSurface(hex){ if(!hex) return '#17171c'; const [r,g,b]=hexToRgb(hex); return (0.299*r+0.587*g+0.114*b)>150 ? '#1f2024' : hex; }
function gdThemeColors(){
  const cs=gameStyle();
  const hx=n=>{ const v=(cs.getPropertyValue(n)||'').trim(); return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)?v:null; };
  const accent=hx('--accent')||'#e23b3b';
  const surface=boardSurface(hx('--card-bg'));
  return { cube:accent, spike:hx('--accent-2')||lighten(accent,40), ground:surface, line:lighten(accent,10), sky1:darken(surface,4), sky2:darken(surface,22) };
}
function renderGeoDash(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="gd-wrap">
    <div class="gd-hud"><span>Score <b id="gd-score">0</b></span><span id="gd-mode-tag" class="gd-mode-tag">Cube</span><span>Best <b id="gd-best">${UC.geoBest||0}</b></span></div>
    <canvas id="gd-canvas" class="gd-canvas"></canvas>
    <div class="gd-overlay" id="gd-overlay">
      <div class="gd-card">
        <div class="gd-title">Liquid Dash</div>
        <div class="gd-sub">Tap, click or press Space, and hold to keep jumping as a cube. Ship and wave you hold to steer, ball flips gravity only while resting on a surface, spider teleports between floor and ceiling, and swing flips gravity even in mid-air. Dodge everything. The further you go, the more Bottlecaps you earn.</div>
        <button class="gd-btn" onclick="gdStart()">Play</button>
      </div>
    </div>
  </div>`;
  gdInit();
}
function gdInit(){
  const cv=document.getElementById('gd-canvas'); if(!cv) return;
  const W=Math.max(320, (cv.parentElement&&cv.parentElement.clientWidth)||640), H=380;
  cv.width=W; cv.height=H;
  gdState={ cv, ctx:cv.getContext('2d'), W, H, groundY:H-56, ceil:16, size:28, x:90,
    y:H-56-28, vy:0, grav:0.9, jump:-13.2, baseSpeed:5.72, speed:5.72,
    shipUp:0.55, shipDown:0.4, shipMax:6.4, ballMax:8, swingMax:6, gravDir:1,
    dist:0, score:0, obstacles:[], grounded:true, rot:0, mode:'cube', holding:false, flash:0,
    genMode:'cube', sinceSwitch:1, segLen:6, lastGapC:(H-56+16)/2, lastSurfSide:'ceiling',
    running:false, dead:false, started:false, raf:0, colors:gdThemeColors() };
  gdSeed();
  gdCleanupListeners();
  gdKeyHandler=function(e){ if((e.code==='Space'||e.key===' '||e.key==='ArrowUp'||e.key==='Up')&&currentGameId==='geodash'){ e.preventDefault(); if(e.repeat){ if(gdState) gdState.holding=true; } else gdDown(); } };
  gdKeyUpHandler=function(e){ if((e.code==='Space'||e.key===' '||e.key==='ArrowUp'||e.key==='Up')&&gdState) gdState.holding=false; };
  gdPointerUp=function(){ if(gdState) gdState.holding=false; };
  document.addEventListener('keydown', gdKeyHandler);
  document.addEventListener('keyup', gdKeyUpHandler);
  window.addEventListener('pointerup', gdPointerUp);
  cv.onpointerdown=function(e){ e.preventDefault(); gdDown(); };
  gdDraw();
}
function gdDown(){ const s=gdState; if(!s||s.dead) return; s.holding=true; if(!s.started){ gdStart(); return; }
  if(s.mode==='cube'){ if(s.grounded){ s.vy=s.jump; s.grounded=false; } }
  else if(s.mode==='ball'){ const onF=s.y>=s.groundY-s.size-0.6, onC=s.y<=s.ceil+0.6; if((s.gravDir>0&&onF)||(s.gravDir<0&&onC)) s.gravDir=-s.gravDir; }
  else if(s.mode==='spider'){ s.gravDir=-s.gravDir; s.y = s.gravDir>0 ? (s.groundY-s.size) : s.ceil; s.vy=0; }
  else if(s.mode==='swing'){ s.gravDir=-s.gravDir; }
}
function gdNextMode(m){ return GD_MODES[(GD_MODES.indexOf(m)+1)%GD_MODES.length]; }
function gdSetMode(s,m){ s.mode=m; s.vy=0; s.flash=12;
  if(m==='ship'||m==='wave'||m==='swing'){ s.y=(s.ceil+(s.groundY-s.size))/2; if(m==='swing') s.gravDir=1; }
  else if(m==='ball'||m==='spider'){ s.gravDir=1; s.y=s.groundY-s.size; }
  const tag=document.getElementById('gd-mode-tag'); if(tag) tag.textContent=m.charAt(0).toUpperCase()+m.slice(1);
}
function gdCubeGap(s){ const air=2*Math.abs(s.jump)/s.grav, reach=air*s.speed; return reach*1.3 + Math.random()*reach*0.6; }
function gdGenAhead(s){
  let last=s.obstacles.length? s.obstacles[s.obstacles.length-1].x : s.W;
  while(last < s.W+300){
    if(s.sinceSwitch>=s.segLen){
      const nm=gdNextMode(s.genMode);
      last+=170; s.obstacles.push({type:'portal', x:last, w:16, mode:nm});
      last+=140; s.genMode=nm; s.sinceSwitch=0;
      s.segLen = nm==='cube'? 5+Math.floor(Math.random()*3) : nm==='spider'? 6+Math.floor(Math.random()*3) : 4+Math.floor(Math.random()*2);
      s.lastGapC=(s.ceil+(s.groundY-s.size))/2; s.lastSurfSide='ceiling';
      continue;
    }
    if(s.genMode==='cube'){
      last+=gdCubeGap(s); const n=Math.random()<0.82?1:2;
      s.obstacles.push({type:'spike', x:last, w:26*n, n});
    } else if(s.genMode==='ship'||s.genMode==='wave'||s.genMode==='swing'){
      const gm=s.genMode;
      last+= s.speed*(gm==='ship'?(48+Math.random()*20):(50+Math.random()*20));
      const gapSize = gm==='ship'?184 : gm==='swing'?172 : 170;
      const minC=s.ceil+gapSize/2+8, maxC=s.groundY-gapSize/2-8;
      let cc=s.lastGapC + (Math.random()*2-1)*(gm==='wave'?46 : gm==='swing'?40 : 66);
      cc=Math.max(minC, Math.min(maxC, cc)); s.lastGapC=cc;
      s.obstacles.push({type:'gap', x:last, w:26, gapTop:cc-gapSize/2, gapBot:cc+gapSize/2});
    } else { // ball or spider: spikes on the floor or ceiling, flip/teleport to dodge
      last+= s.speed*(s.genMode==='ball'?(70+Math.random()*34):(44+Math.random()*16));
      const side = s.lastSurfSide==='floor'?'ceiling':'floor'; s.lastSurfSide=side;
      s.obstacles.push({type:'surf', x:last, w:26, side});
    }
    s.sinceSwitch++;
  }
}
function gdSeed(){ const s=gdState; s.obstacles=[]; s.genMode='cube'; s.sinceSwitch=1; s.segLen=6; s.lastGapC=(s.ceil+(s.groundY-s.size))/2; s.lastSurfSide='ceiling';
  s.obstacles.push({type:'spike', x:s.W+180, w:26, n:1}); gdGenAhead(s); }
function gdStart(){
  if(!gdState){ gdInit(); }
  const ov=document.getElementById('gd-overlay'); if(ov) ov.style.display='none';
  const s=gdState;
  s.started=true; s.dead=false; s.running=true;
  s.mode='cube'; s.holding=false; s.gravDir=1; s.y=s.groundY-s.size; s.vy=0; s.grounded=true;
  s.dist=0; s.score=0; s.speed=s.baseSpeed; s.rot=0; s.flash=0; s.shield=false; s.invuln=0;
  s.colors=gdThemeColors(); gdSeed();
  const tag=document.getElementById('gd-mode-tag'); if(tag) tag.textContent='Cube';
  gdLoop();
}
function gdLoop(){
  const s=gdState; if(!s||!s.running) return;
  if(currentGameId!=='geodash'||!document.body.contains(s.cv)){ gdLeave(); return; }
  s.speed=Math.min(9.1, s.baseSpeed + s.dist/16000);
  s.dist+=s.speed; s.score=Math.floor(s.dist/10);
  const floor=s.groundY-s.size;
  if(s.mode==='cube'){
    s.vy+=s.grav; s.y+=s.vy;
    if(s.y>=floor){ s.y=floor; s.vy=0; s.grounded=true; s.rot=Math.round(s.rot/(Math.PI/2))*(Math.PI/2); if(s.holding){ s.vy=s.jump; s.grounded=false; } }
    else { s.grounded=false; s.rot+=0.16; }
  } else if(s.mode==='ship'){
    s.vy += s.holding? -s.shipUp : s.shipDown;
    s.vy=Math.max(-s.shipMax, Math.min(s.shipMax, s.vy)); s.y+=s.vy;
    if(s.y<s.ceil){ s.y=s.ceil; if(s.vy<0) s.vy=0; }
    if(s.y>floor){ s.y=floor; if(s.vy>0) s.vy=0; }
    s.rot=Math.max(-0.5,Math.min(0.5,s.vy*0.05)); s.grounded=false;
  } else if(s.mode==='wave'){
    const wv=s.speed*0.8; s.vy = s.holding? -wv : wv; s.y+=s.vy;
    if(s.y<s.ceil) s.y=s.ceil; if(s.y>floor) s.y=floor;
    s.rot=s.holding?-0.6:0.6; s.grounded=false;
  } else if(s.mode==='ball'){
    s.vy += s.grav*0.78*s.gravDir;
    s.vy=Math.max(-s.ballMax, Math.min(s.ballMax, s.vy)); s.y+=s.vy;
    if(s.y>=floor){ s.y=floor; if(s.gravDir>0) s.vy=0; }
    if(s.y<=s.ceil){ s.y=s.ceil; if(s.gravDir<0) s.vy=0; }
    s.rot+=s.gravDir*0.2; s.grounded=false;
  } else if(s.mode==='spider'){ // snapped to its current surface, taps teleport it
    s.y = s.gravDir>0 ? floor : s.ceil; s.vy=0; s.rot=0; s.grounded=false;
  } else { // swing: gravity flip you can use mid-air, fly straight through the corridors
    s.vy += s.grav*0.5*s.gravDir;
    s.vy=Math.max(-s.swingMax, Math.min(s.swingMax, s.vy)); s.y+=s.vy;
    if(s.y<s.ceil){ s.y=s.ceil; if(s.vy<0) s.vy=0; }
    if(s.y>floor){ s.y=floor; if(s.vy>0) s.vy=0; }
    s.rot=Math.max(-0.6,Math.min(0.6,s.vy*0.06)); s.grounded=false;
  }
  for(const o of s.obstacles) o.x-=s.speed;
  s.obstacles=s.obstacles.filter(o=>o.x+(o.w||26)>-16);
  gdGenAhead(s);
  for(const o of s.obstacles){ if(o.type==='portal'&&!o.used&&o.x<=s.x+s.size/2){ o.used=true; gdSetMode(s,o.mode); } }
  if(s.flash>0) s.flash--;
  if(gdCollide(s)){ if(s.shield){ s.shield=false; s.invuln=s.dist+240; s.flash=18; showToast('Shield used!'); } else { gdDie(); return; } }
  gdDraw();
  const sc=document.getElementById('gd-score'); if(sc) sc.textContent=s.score;
  s.raf=requestAnimationFrame(gdLoop);
}
function gdCollide(s){
  if(s.invuln && s.dist < s.invuln) return false;
  const cl=s.x+5, cr=s.x+s.size-5, ctop=s.y+4, cb=s.y+s.size-3;
  for(const o of s.obstacles){
    if(o.type==='portal') continue;
    if(cr<o.x || cl>o.x+o.w) continue;
    if(o.type==='spike'){ if(cb>s.groundY-24+5) return true; }
    else if(o.type==='gap'){ if(ctop<o.gapTop || cb>o.gapBot) return true; }
    else if(o.type==='surf'){ if(o.side==='floor'){ if(cb>s.groundY-22) return true; } else { if(ctop<s.ceil+22) return true; } }
  }
  return false;
}
function gdDie(){
  const s=gdState; s.running=false; s.dead=true; if(s.raf) cancelAnimationFrame(s.raf);
  let caps=Math.floor(s.score/GEO_CAP_DIV); if(s.score>=GEO_CAP_DIV*0.4 && caps<1) caps=1;
  if(s.score>(UC.geoBest||0)) UC.geoBest=s.score;
  const best=UC.geoBest||0;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, geoBest:best}); }catch(e){}
  refreshCaps();
  const b=document.getElementById('gd-best'); if(b) b.textContent=best;
  gdDraw(); s.ctx.fillStyle='rgba(0,0,0,.38)'; s.ctx.fillRect(0,0,s.W,s.H);
  const ov=document.getElementById('gd-overlay');
  if(ov){ ov.style.display='flex'; ov.innerHTML=`<div class="gd-card">
    <div class="gd-title">Game Over</div>
    <div class="gd-sub">Score ${s.score} &middot; Best ${best}</div>
    <div class="gd-reward">${caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps'):'Get a bit further next time to earn Bottlecaps.'}</div>
    <button class="gd-btn" onclick="gdStart()">Play again</button></div>`; }
  if(caps>0) showToast('Liquid Dash: +'+caps+' Bottlecaps!');
}
function gdDraw(){
  const s=gdState; if(!s) return; const c=s.ctx, W=s.W, H=s.H, col=s.colors;
  const g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,col.sky1); g.addColorStop(1,col.sky2);
  c.fillStyle=g; c.fillRect(0,0,W,H);
  c.fillStyle=col.ground; c.fillRect(0,s.groundY,W,H-s.groundY); c.fillRect(0,0,W,s.ceil);
  c.fillStyle=col.line; c.fillRect(0,s.groundY,W,3); c.fillRect(0,s.ceil-2,W,2);
  for(const o of s.obstacles){
    if(o.type==='spike'){ c.fillStyle=col.spike; for(let i=0;i<(o.n||1);i++){ const bx=o.x+i*26, base=s.groundY; c.beginPath(); c.moveTo(bx,base); c.lineTo(bx+13,base-26); c.lineTo(bx+26,base); c.closePath(); c.fill(); } }
    else if(o.type==='gap'){ c.fillStyle=col.spike; c.fillRect(o.x,s.ceil,o.w,o.gapTop-s.ceil); c.fillRect(o.x,o.gapBot,o.w,s.groundY-o.gapBot); }
    else if(o.type==='surf'){ c.fillStyle=col.spike; if(o.side==='floor'){ c.beginPath(); c.moveTo(o.x,s.groundY); c.lineTo(o.x+13,s.groundY-24); c.lineTo(o.x+26,s.groundY); c.closePath(); c.fill(); } else { c.beginPath(); c.moveTo(o.x,s.ceil); c.lineTo(o.x+13,s.ceil+24); c.lineTo(o.x+26,s.ceil); c.closePath(); c.fill(); } }
    else if(o.type==='portal'){ const pc=GD_PORTAL_COL[o.mode]||col.cube; c.fillStyle=pc; c.globalAlpha=0.3; c.fillRect(o.x-2,s.ceil,o.w+4,s.groundY-s.ceil); c.globalAlpha=1; c.fillRect(o.x,s.ceil,3,s.groundY-s.ceil); c.fillRect(o.x+o.w-3,s.ceil,3,s.groundY-s.ceil); }
  }
  const cx=s.x+s.size/2, cy=s.y+s.size/2, h=s.size/2;
  c.save(); c.translate(cx,cy); c.rotate(s.rot);
  c.fillStyle = s.flash>0 && !epilepsyMode() ? '#ffffff' : col.cube;
  if(s.mode==='cube'){ c.fillRect(-h,-h,s.size,s.size); c.fillStyle='rgba(255,255,255,.85)'; c.fillRect(-h+6,-h+6,7,7); }
  else if(s.mode==='ship'){ c.beginPath(); c.moveTo(-h,-h+3); c.lineTo(h-5,-h+5); c.lineTo(h,0); c.lineTo(h-5,h-5); c.lineTo(-h,h-3); c.closePath(); c.fill();
    if(s.holding){ c.fillStyle='#ffd23b'; c.beginPath(); c.moveTo(-h,-4); c.lineTo(-h-9,0); c.lineTo(-h,4); c.closePath(); c.fill(); }
    c.fillStyle='rgba(255,255,255,.85)'; c.beginPath(); c.arc(2,-2,3,0,7); c.fill(); }
  else if(s.mode==='wave'){ c.beginPath(); c.moveTo(h,0); c.lineTo(-h,-h+2); c.lineTo(-h*0.3,0); c.lineTo(-h,h-2); c.closePath(); c.fill(); }
  else if(s.mode==='ball'){ const r=s.size*0.48; c.fillStyle='#f8fafc'; c.beginPath(); c.arc(0,0,r,0,Math.PI*2); c.fill(); c.strokeStyle='#0f172a'; c.lineWidth=1.8; c.stroke(); c.fillStyle='#0f172a'; c.beginPath(); c.arc(0,0,r*0.36,0,Math.PI*2); c.fill(); }
  else if(s.mode==='spider'){ c.fillRect(-h,-h,s.size,s.size); c.strokeStyle='rgba(255,255,255,.55)'; c.lineWidth=2; for(let li=-1;li<=1;li++){ c.beginPath(); c.moveTo(-h,li*7); c.lineTo(-h-6,li*7); c.stroke(); c.beginPath(); c.moveTo(h,li*7); c.lineTo(h+6,li*7); c.stroke(); } c.fillStyle='rgba(255,255,255,.85)'; c.fillRect(-4,-h+5,8,4); }
  else { c.beginPath(); c.moveTo(0,-h); c.lineTo(h,0); c.lineTo(0,h); c.lineTo(-h,0); c.closePath(); c.fill(); c.fillStyle='rgba(255,255,255,.85)'; c.beginPath(); c.arc(0,0,3.5,0,7); c.fill(); }
  if(s.shield){ c.strokeStyle='rgba(255,255,255,.9)'; c.lineWidth=2.5; c.beginPath(); c.arc(0,0,h+5,0,Math.PI*2); c.stroke(); }
  c.restore();
}
function gdLeave(){ if(gdState){ gdState.running=false; if(gdState.raf) cancelAnimationFrame(gdState.raf); } }
function gdCleanupListeners(){
  if(gdKeyHandler){ document.removeEventListener('keydown', gdKeyHandler); gdKeyHandler=null; }
  if(gdKeyUpHandler){ document.removeEventListener('keyup', gdKeyUpHandler); gdKeyUpHandler=null; }
  if(gdPointerUp){ window.removeEventListener('pointerup', gdPointerUp); gdPointerUp=null; }
}
function gdCleanup(){ gdLeave(); gdCleanupListeners(); gdState=null; }

// ============================================================
//  SNAKE  (eat Bottlecaps, grow, earn Bottlecaps by length)
// ============================================================
let snakeState=null, snakeTimer=null, snakeKeyHandler=null;
function snakeColors(){ const cs=gameStyle(); const hx=n=>{const v=(cs.getPropertyValue(n)||'').trim(); return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)?v:null;};
  const accent=hx('--accent')||'#2faf4e', surface=boardSurface(hx('--card-bg'));
  return { snake:accent, head:lighten(accent,35), food:'#f5c518', bg:darken(surface,6) }; }
function renderSnake(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="sn-wrap">
    <div class="sn-hud"><span>Bottlecaps eaten <b id="sn-eaten">0</b></span><span>Best <b id="sn-best">${UC.snakeBest||0}</b></span></div>
    <canvas id="sn-canvas" class="sn-canvas"></canvas>
    <div class="sn-overlay" id="sn-overlay"><div class="sn-card">
      <div class="sn-title">Snake</div>
      <div class="sn-sub">Arrow keys, WASD or swipe to steer. Eat the Bottlecaps to grow. Do not hit the walls or yourself.</div>
      <button class="sn-btn" onclick="snakeStart()">Play</button>
    </div></div>
  </div>`;
  snakeInit();
}
function snakeInit(){
  const cv=document.getElementById('sn-canvas'); if(!cv) return;
  const W=Math.max(300,(cv.parentElement&&cv.parentElement.clientWidth)||640);
  const cell=Math.max(16, Math.floor(W/26)), cols=Math.floor(W/cell), rows=Math.max(12, Math.floor(340/cell));
  cv.width=cols*cell; cv.height=rows*cell;
  snakeState={ cv, ctx:cv.getContext('2d'), cell, cols, rows, body:[], dir:{x:1,y:0}, nextDir:{x:1,y:0}, food:null, eaten:0, alive:false, started:false, colors:snakeColors(), touch:null, prev:null, stepAt:0, stepMs:130, raf:0, fx:[], eatAt:0, foodAt:0, dyingAt:0 };
  if(snakeKeyHandler) document.removeEventListener('keydown', snakeKeyHandler);
  snakeKeyHandler=function(e){ if(currentGameId!=='snake'||!snakeState) return; const k=(e.key||'').toLowerCase(); let d=null;
    if(k==='arrowup'||k==='w') d={x:0,y:-1}; else if(k==='arrowdown'||k==='s') d={x:0,y:1}; else if(k==='arrowleft'||k==='a') d={x:-1,y:0}; else if(k==='arrowright'||k==='d') d={x:1,y:0}; else return;
    e.preventDefault(); if(!snakeState.started){ snakeStart(); return; }
    const cur=snakeState.dir; if(d.x===-cur.x&&d.y===-cur.y) return; snakeState.nextDir=d; };
  document.addEventListener('keydown', snakeKeyHandler);
  cv.onpointerdown=function(e){ if(!snakeState) return; snakeState.touch={x:e.clientX,y:e.clientY}; if(!snakeState.started) snakeStart(); };
  cv.onpointerup=function(e){ if(!snakeState||!snakeState.touch) return; const dx=e.clientX-snakeState.touch.x, dy=e.clientY-snakeState.touch.y; snakeState.touch=null; if(Math.abs(dx)<12&&Math.abs(dy)<12) return; const d=Math.abs(dx)>Math.abs(dy)?{x:dx>0?1:-1,y:0}:{x:0,y:dy>0?1:-1}; const cur=snakeState.dir; if(d.x===-cur.x&&d.y===-cur.y) return; snakeState.nextDir=d; };
  snakeDraw();
}
function snakeSpawnFood(){ const s=snakeState; let p, tries=0; do{ p={x:Math.floor(Math.random()*s.cols), y:Math.floor(Math.random()*s.rows)}; tries++; }while(tries<300 && s.body.some(b=>b.x===p.x&&b.y===p.y)); s.food=p; s.foodAt=performance.now(); }
function snakeStart(){
  if(!snakeState) snakeInit(); const s=snakeState;
  const ov=document.getElementById('sn-overlay'); if(ov) ov.style.display='none';
  const cx=Math.floor(s.cols/2), cy=Math.floor(s.rows/2);
  s.body=[{x:cx,y:cy},{x:cx-1,y:cy},{x:cx-2,y:cy}]; s.dir={x:1,y:0}; s.nextDir={x:1,y:0}; s.eaten=0; s.alive=true; s.started=true; s.revive=false; s.colors=snakeColors();
  s.prev=s.body.map(b=>({x:b.x,y:b.y})); s.stepMs=130; s.stepAt=performance.now(); s.fx=[]; s.dyingAt=0; s.eatAt=0;
  snakeSpawnFood();
  const e=document.getElementById('sn-eaten'); if(e) e.textContent='0';
  if(snakeTimer) clearInterval(snakeTimer);
  snakeTimer=setInterval(snakeStep, s.stepMs);
  cancelAnimationFrame(s.raf); snakeLoop();
}
// The game logic still moves one cell per tick; drawing runs every frame and slides each
// segment from where it was to where it is now, so the snake glides instead of hopping.
function snakeLoop(){
  const s=snakeState; if(!s) return;
  snakeDraw();
  const crashing=s.dyingAt && performance.now()-s.dyingAt<650;
  if(s.alive||crashing) s.raf=requestAnimationFrame(snakeLoop);
}
function snakeStep(){
  const s=snakeState; if(!s||!s.alive) return;
  if(currentGameId!=='snake'){ snakeCleanup(); return; }
  s.dir=s.nextDir;
  const head={x:s.body[0].x+s.dir.x, y:s.body[0].y+s.dir.y};
  if(head.x<0||head.y<0||head.x>=s.cols||head.y>=s.rows || s.body.some(b=>b.x===head.x&&b.y===head.y)){
    if(s.revive){ s.revive=false; const cx=Math.floor(s.cols/2), cy=Math.floor(s.rows/2); s.body=[{x:cx,y:cy},{x:cx-1,y:cy},{x:cx-2,y:cy}]; s.dir={x:1,y:0}; s.nextDir={x:1,y:0}; s.prev=s.body.map(b=>({x:b.x,y:b.y})); s.stepAt=performance.now(); snakeSpawnFood(); showToast('Extra life used!'); return; }
    s.dyingAt=performance.now(); snakeDie(); s.raf=requestAnimationFrame(snakeLoop); return;
  }
  const old=s.body.map(b=>({x:b.x,y:b.y}));
  s.body.unshift(head);
  if(s.food && head.x===s.food.x && head.y===s.food.y){
    s.eaten++; const e=document.getElementById('sn-eaten'); if(e){ e.textContent=s.eaten; e.classList.remove('bump'); void e.offsetWidth; e.classList.add('bump'); }
    s.eatAt=performance.now(); s.fx.push({x:head.x, y:head.y, t0:s.eatAt});
    snakeSpawnFood();
    if(s.eaten%4===0){ clearInterval(snakeTimer); s.stepMs=Math.max(70, 130-Math.floor(s.eaten/4)*8); snakeTimer=setInterval(snakeStep, s.stepMs); } }
  else s.body.pop();
  s.prev=s.body.map((_,i)=>old[Math.min(i,old.length-1)]);   // a segment that just grew stays put for one tick
  s.stepAt=performance.now();
}
function snakeDraw(){
  const s=snakeState; if(!s) return; const c=s.ctx, cell=s.cell, col=s.colors, W=s.cv.width, H=s.cv.height, now=performance.now();
  const crash=s.dyingAt? now-s.dyingAt : -1;
  const p = s.alive ? Math.min(1,(now-s.stepAt)/s.stepMs) : 1;
  c.save();
  if(crash>=0 && crash<500){ const k=1-crash/500; c.translate(Math.sin(crash/16)*cell*0.35*k, Math.cos(crash/21)*cell*0.2*k); }
  const g=c.createLinearGradient(0,0,0,H); g.addColorStop(0,col.bg); g.addColorStop(1,darken(col.bg,6)); c.fillStyle=g; c.fillRect(-20,-20,W+40,H+40);
  c.strokeStyle='rgba(255,255,255,.04)'; c.lineWidth=1;
  for(let x=cell;x<W;x+=cell){ c.beginPath(); c.moveTo(x+.5,0); c.lineTo(x+.5,H); c.stroke(); }
  for(let y=cell;y<H;y+=cell){ c.beginPath(); c.moveTo(0,y+.5); c.lineTo(W,y+.5); c.stroke(); }
  if(s.food){ const fx=s.food.x*cell+cell/2, fy=s.food.y*cell+cell/2;
    const born=Math.min(1,(now-s.foodAt)/260);
    const r=cell*(0.34+0.04*Math.sin(now/170))*Math.max(0.05,born<1?born*1.15:1);
    c.save(); c.shadowColor=col.food; c.shadowBlur=14+6*Math.sin(now/170); c.fillStyle=col.food; c.beginPath(); c.arc(fx,fy,r,0,Math.PI*2); c.fill(); c.restore();
    c.fillStyle='rgba(255,255,255,.8)'; c.beginPath(); c.arc(fx-r*0.32,fy-r*0.32,r*0.28,0,Math.PI*2); c.fill(); }
  // rings and sparks where an Bottlecap was eaten
  s.fx=s.fx.filter(f=>now-f.t0<420);
  s.fx.forEach(f=>{ const k=(now-f.t0)/420, x=f.x*cell+cell/2, y=f.y*cell+cell/2;
    c.strokeStyle='rgba(245,197,24,'+(0.8*(1-k)).toFixed(3)+')'; c.lineWidth=Math.max(1.5,cell*0.1*(1-k)); c.beginPath(); c.arc(x,y,cell*(0.4+k*1.1),0,Math.PI*2); c.stroke();
    c.fillStyle='rgba(245,197,24,'+(0.9*(1-k)).toFixed(3)+')';
    for(let i=0;i<6;i++){ const a=i*Math.PI/3+0.4, d=cell*(0.5+k*1.0); c.beginPath(); c.arc(x+Math.cos(a)*d, y+Math.sin(a)*d, Math.max(0.5,cell*0.09*(1-k)),0,Math.PI*2); c.fill(); } });
  const n=s.body.length; if(!n){ c.restore(); return; }
  const pts=s.body.map((b,i)=>{ const q=(s.prev&&s.prev[i])||b; return { x:(q.x+(b.x-q.x)*p)*cell+cell/2, y:(q.y+(b.y-q.y)*p)*cell+cell/2 }; });
  const hurt = crash>=0 && Math.floor(crash/90)%2===0;
  const body = hurt ? '#e34b4b' : col.snake;
  c.lineJoin='round'; c.lineCap='round';
  const trace=()=>{ c.beginPath(); c.moveTo(pts[0].x,pts[0].y); for(let i=1;i<n;i++) c.lineTo(pts[i].x,pts[i].y); if(n===1) c.lineTo(pts[0].x+0.1,pts[0].y); c.stroke(); };
  c.strokeStyle=darken(body,20); c.lineWidth=cell*0.84; trace();
  c.strokeStyle=body; c.lineWidth=cell*0.6; trace();
  const hx=pts[0].x, hy=pts[0].y, ex=s.dir.x, ey=s.dir.y;
  const squash=1+0.28*Math.max(0,1-(now-s.eatAt)/200);
  c.fillStyle=hurt?lighten('#e34b4b',25):col.head; c.beginPath(); c.arc(hx,hy,cell*0.46*squash,0,Math.PI*2); c.fill();
  const flick=Math.sin(now/110)>0.2 ? 1 : 0.55;
  c.strokeStyle='#e34b4b'; c.lineWidth=Math.max(1.5,cell*0.07); c.beginPath(); c.moveTo(hx+ex*cell*0.44,hy+ey*cell*0.44); c.lineTo(hx+ex*cell*0.72*flick,hy+ey*cell*0.72*flick); c.stroke();
  const off=cell*0.2, er=Math.max(1.8,cell*0.12), fwd=cell*0.13, px=-ey, py=ex;
  [[hx+ex*fwd+px*off, hy+ey*fwd+py*off],[hx+ex*fwd-px*off, hy+ey*fwd-py*off]].forEach(e=>{
    c.fillStyle='#fff'; c.beginPath(); c.arc(e[0],e[1],er,0,Math.PI*2); c.fill();
    if(crash>=0){ c.strokeStyle='#111'; c.lineWidth=Math.max(1,er*0.4); c.beginPath(); c.moveTo(e[0]-er*0.5,e[1]-er*0.5); c.lineTo(e[0]+er*0.5,e[1]+er*0.5); c.moveTo(e[0]+er*0.5,e[1]-er*0.5); c.lineTo(e[0]-er*0.5,e[1]+er*0.5); c.stroke(); }
    else { c.fillStyle='#111'; c.beginPath(); c.arc(e[0]+ex*er*0.5,e[1]+ey*er*0.5,er*0.55,0,Math.PI*2); c.fill(); } });
  c.restore();
}
function snakeDie(){
  const s=snakeState; s.alive=false; if(snakeTimer){ clearInterval(snakeTimer); snakeTimer=null; }
  const caps=Math.floor(s.eaten/2);
  if(s.eaten>(UC.snakeBest||0)) UC.snakeBest=s.eaten;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, snakeBest:UC.snakeBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('sn-best'); if(bb) bb.textContent=UC.snakeBest||0;
  const ov=document.getElementById('sn-overlay');
  if(ov){ ov.style.display='none'; setTimeout(()=>{ if(snakeState===s && ov.isConnected) ov.style.display='flex'; }, 650); ov.innerHTML=`<div class="sn-card"><div class="sn-title">Game Over</div><div class="sn-sub">You ate ${s.eaten} Bottlecap${s.eaten===1?'':'s'}. Best ${UC.snakeBest||0}.</div><div class="sn-reward">${caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps'):'Eat a couple more next time to earn Bottlecaps.'}</div><button class="sn-btn" onclick="snakeStart()">Play again</button></div>`; }
  if(caps>0) showToast('Snake: +'+caps+' Bottlecaps!');
}
function snakeCleanup(){ if(snakeState) cancelAnimationFrame(snakeState.raf); if(snakeTimer){ clearInterval(snakeTimer); snakeTimer=null; } if(snakeKeyHandler){ document.removeEventListener('keydown', snakeKeyHandler); snakeKeyHandler=null; } snakeState=null; }

// ============================================================
//  BLOX MERGE  (2048-style, Bottlecaps for each new high tile)
// ============================================================
let mergeState=null, mergeKeyHandler=null;
const MERGE_COLORS={2:'#eee4da',4:'#ede0c8',8:'#f2b179',16:'#f59563',32:'#f67c5f',64:'#f65e3b',128:'#edcf72',256:'#edcc61',512:'#edc850',1024:'#edc53f',2048:'#edc22e'};
function mergeTileColor(v){ return MERGE_COLORS[v]||'#3c3a32'; }
function renderMerge(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="mg-wrap">
    <div class="mg-hud"><span>Score <b id="mg-score">0</b></span><span>Best tile <b id="mg-best">${UC.mergeBest||0}</b></span></div>
    <div class="mg-board" id="mg-board"></div>
    <div class="mg-foot">Arrow keys, WASD or swipe. Reach a new high tile to earn Bottlecaps.<button class="mg-restart" onclick="mergeStart()">Restart</button></div>
    <div class="mg-over" id="mg-over" style="display:none"></div>
  </div>`;
  mergeInit();
}
function mergeInit(){
  mergeState={ grid:[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]], score:0, highest:0, awarded:{}, over:false, touch:null, prevGrid:null, prevScore:0, spawnCell:null, mergedCells:[] };
  if(mergeKeyHandler) document.removeEventListener('keydown', mergeKeyHandler);
  mergeKeyHandler=function(e){ if(currentGameId!=='merge'||!mergeState||mergeState.over) return; const k=(e.key||'').toLowerCase(); let dir=null;
    if(k==='arrowleft'||k==='a')dir='left'; else if(k==='arrowright'||k==='d')dir='right'; else if(k==='arrowup'||k==='w')dir='up'; else if(k==='arrowdown'||k==='s')dir='down'; else return;
    e.preventDefault(); mergeMove(dir); };
  document.addEventListener('keydown', mergeKeyHandler);
  const board=document.getElementById('mg-board');
  if(board){ board.onpointerdown=function(e){ if(mergeState) mergeState.touch={x:e.clientX,y:e.clientY}; };
    board.onpointerup=function(e){ if(!mergeState||!mergeState.touch||mergeState.over) return; const dx=e.clientX-mergeState.touch.x, dy=e.clientY-mergeState.touch.y; mergeState.touch=null; if(Math.abs(dx)<20&&Math.abs(dy)<20) return; mergeMove(Math.abs(dx)>Math.abs(dy)?(dx>0?'right':'left'):(dy>0?'down':'up')); }; }
  mergeStart();
}
function mergeStart(){
  const s=mergeState; if(!s) return;
  s.grid=[[0,0,0,0],[0,0,0,0],[0,0,0,0],[0,0,0,0]]; s.score=0; s.highest=0; s.awarded={}; s.over=false; s.prevGrid=null; s.spawnCell=null; s.mergedCells=[];
  mergeSpawn(); mergeSpawn();
  const ov=document.getElementById('mg-over'); if(ov) ov.style.display='none';
  mergeDraw();
}
function mergeSpawn(){ const s=mergeState; const empty=[]; for(let r=0;r<4;r++)for(let c=0;c<4;c++) if(s.grid[r][c]===0) empty.push([r,c]); if(!empty.length) return; const cell=empty[Math.floor(Math.random()*empty.length)]; s.grid[cell[0]][cell[1]]=Math.random()<0.9?2:4; s.spawnCell=[cell[0],cell[1]]; }
function mergeSlide(line){ const a=[]; line.forEach((v,j)=>{ if(v) a.push({v,j}); });
  const out=[], moves=[]; let gained=0, i=0, mergedAt=[];
  while(i<a.length){
    if(i+1<a.length&&a[i].v===a[i+1].v){ out.push(a[i].v*2); gained+=a[i].v*2; mergedAt.push(out.length-1); moves.push({from:a[i].j,to:out.length-1,v:a[i].v},{from:a[i+1].j,to:out.length-1,v:a[i+1].v,ghost:true}); i+=2; }
    else { out.push(a[i].v); moves.push({from:a[i].j,to:out.length-1,v:a[i].v}); i++; } }
  while(out.length<4) out.push(0); return {out, gained, mergedAt, moves}; }
function mergeMove(dir){
  const s=mergeState; if(!s||s.over) return; const g=s.grid; let changed=false, gained=0;
  const snap=g.map(r=>r.slice()), snapScore=s.score;
  const getLine=i=> dir==='left'?[g[i][0],g[i][1],g[i][2],g[i][3]] : dir==='right'?[g[i][3],g[i][2],g[i][1],g[i][0]] : dir==='up'?[g[0][i],g[1][i],g[2][i],g[3][i]] : [g[3][i],g[2][i],g[1][i],g[0][i]];
  const setLine=(i,arr)=>{ if(dir==='left'){ for(let j=0;j<4;j++) g[i][j]=arr[j]; } else if(dir==='right'){ for(let j=0;j<4;j++) g[i][3-j]=arr[j]; } else if(dir==='up'){ for(let j=0;j<4;j++) g[j][i]=arr[j]; } else { for(let j=0;j<4;j++) g[3-j][i]=arr[j]; } };
  const cellOf=(i,j)=> dir==='left'?[i,j] : dir==='right'?[i,3-j] : dir==='up'?[j,i] : [3-j,i];
  s.mergedCells=[]; s.spawnCell=null; s.slides=[];
  for(let i=0;i<4;i++){ const before=getLine(i), r=mergeSlide(before); gained+=r.gained; r.moves.forEach(m=>s.slides.push({from:cellOf(i,m.from), to:cellOf(i,m.to), v:m.v, ghost:!!m.ghost})); for(let j=0;j<4;j++) if(before[j]!==r.out[j]) changed=true; setLine(i,r.out); r.mergedAt.forEach(j=>s.mergedCells.push(cellOf(i,j))); }
  if(!changed) return;
  s.prevGrid=snap; s.prevScore=snapScore;
  s.score+=gained; mergeSpawn();
  let hi=0; for(let r=0;r<4;r++)for(let c=0;c<4;c++) if(g[r][c]>hi) hi=g[r][c];
  if(hi>s.highest){ s.highest=hi;
    if(hi>=64 && !s.awarded[hi]){ s.awarded[hi]=1; const caps=hi/32; UC.coins=(UC.coins||0)+caps; if(hi>(UC.mergeBest||0)) UC.mergeBest=hi; try{ dbUpdateUser(getU(),{coins:UC.coins, mergeBest:UC.mergeBest}); }catch(e){} refreshCaps(); showToast('Blox Merge: reached '+hi+'! +'+caps+' Bottlecaps'); }
    else if(hi>(UC.mergeBest||0)){ UC.mergeBest=hi; try{ dbUpdateUser(getU(),{mergeBest:UC.mergeBest}); }catch(e){} } }
  mergeDraw();
  if(mergeNoMoves()){ s.over=true; const ov=document.getElementById('mg-over'); if(ov){ ov.style.display='flex'; ov.innerHTML=`<div class="mg-over-card"><div class="sn-title">No moves left</div><div class="sn-sub">Score ${s.score} &middot; Best tile ${s.highest}</div><button class="sn-btn" onclick="mergeStart()">Play again</button></div>`; } }
}
function mergeNoMoves(){ const g=mergeState.grid; for(let r=0;r<4;r++)for(let c=0;c<4;c++){ if(g[r][c]===0) return false; if(c<3&&g[r][c]===g[r][c+1]) return false; if(r<3&&g[r][c]===g[r+1][c]) return false; } return true; }
function mergeDraw(){
  const s=mergeState; const board=document.getElementById('mg-board'); if(!board) return;
  const sc=document.getElementById('mg-score'); if(sc) sc.textContent=s.score;
  const bt=document.getElementById('mg-best'); if(bt) bt.textContent=UC.mergeBest||0;
  let html='';
  for(let r=0;r<4;r++)for(let c=0;c<4;c++){ const v=s.grid[r][c];
    if(!v){ html+='<div class="mg-cell"></div>'; continue; }
    const isNew=s.spawnCell&&s.spawnCell[0]===r&&s.spawnCell[1]===c;
    const isMerged=(s.mergedCells||[]).some(m=>m[0]===r&&m[1]===c);
    const fg = v<=4?'#3a352f':'#fff';
    const fs = v>=1000?'1.15rem':(v>=100?'1.45rem':'1.7rem');
    html+=`<div class="mg-cell"><div class="mg-tile${isNew?' mg-new':isMerged?' mg-merged':''}" style="background:${mergeTileColor(v)};color:${fg};font-size:${fs}">${v}</div></div>`; }
  board.innerHTML=html;
  mergeSlideTiles(board, s);
  s.slides=[];
}
// Tiles glide from where they were to where they landed. The second tile of a merge
// slides in as a ghost and fades out as the combined tile pulses.
function mergeSlideTiles(board, s){
  if(!s.slides||!s.slides.length||matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const cells=board.children, at=p=>cells[p[0]*4+p[1]];
  s.slides.forEach(m=>{
    if(m.from[0]===m.to[0]&&m.from[1]===m.to[1]) return;
    const dest=at(m.to), src=at(m.from); if(!dest||!src) return;
    const d=dest.getBoundingClientRect(), o=src.getBoundingClientRect();
    let el;
    if(m.ghost){ el=document.createElement('div'); el.className='mg-tile mg-ghost'; el.textContent=m.v;
      el.style.cssText='background:'+mergeTileColor(m.v)+';color:'+(m.v<=4?'#3a352f':'#fff')+';font-size:'+(m.v>=1000?'1.15rem':(m.v>=100?'1.45rem':'1.7rem'))+';z-index:0';
      dest.insertBefore(el, dest.firstChild); }
    else el=dest.querySelector('.mg-tile');
    if(!el) return;
    el.style.transition='none'; el.style.transform='translate('+(o.left-d.left)+'px,'+(o.top-d.top)+'px)';
    void el.offsetWidth;
    el.style.transition='transform .13s ease-out'; el.style.transform='';
    if(m.ghost) setTimeout(()=>el.remove(), 150);
  });
}
function mergeCleanup(){ if(mergeKeyHandler){ document.removeEventListener('keydown', mergeKeyHandler); mergeKeyHandler=null; } mergeState=null; }

// ============================================================
//  TYPING SPRINT
// ============================================================
const TS_WORDS=['Bottlecap','red','game','play','jump','race','dash','snake','merge','planet','newbgi','cookie','tower','math','speed','type','word','level','score','boost','wave','ball','spider','shield','swing','block','green','blue','fast','slow','best','high','click','target','daily','rebirth','theme','avatar','chat','friend','trade','gold','coin','bonus','quick','sharp','focus','power','energy','rocket','pixel','arcade','combo','streak','master','rookie','legend','craft','quest','online','badge','crown','royal','swift','blaze','frost','storm','flame','ocean','forest','galaxy','matrix','neon','cyber','retro','vault','quest','climb','flash'];
let tsState=null;
function renderTyping(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="ts-wrap">
    <div class="ts-hud"><span>Cleared <b id="ts-cleared">0</b></span><span id="ts-lives"></span><span>Best <b id="ts-best">${UC.typingBest||0}</b></span></div>
    <div class="ts-field" id="ts-field"></div>
    <div class="ts-foot"><input class="ts-input" id="ts-input" placeholder="Type a word and press Enter" autocomplete="off" autocapitalize="off" spellcheck="false" onkeydown="if(event.key==='Enter')tsSubmit()"></div>
    <div class="ts-overlay" id="ts-overlay"><div class="ts-card"><div class="ts-title">Typing Sprint</div><div class="ts-sub">Words fly in from the right. Type each one and press Enter before it escapes. Three misses ends the run.</div><button class="ts-btn" onclick="tsStart()">Play</button></div></div>
  </div>`;
  tsState={ field:document.getElementById('ts-field'), words:[], lives:3, cleared:0, speed:1.1, spawnT:30, running:false, raf:0 };
}
function tsStart(){
  if(!tsState) return; const s=tsState;
  const ov=document.getElementById('ts-overlay'); if(ov) ov.style.display='none';
  s.words.forEach(w=>w.el.remove()); s.words=[]; s.lives=3; s.cleared=0; s.speed=1.1; s.spawnT=15; s.running=true;
  tsUpdateHud();
  const inp=document.getElementById('ts-input'); if(inp){ inp.value=''; inp.focus(); }
  tsLoop();
}
function tsSpawn(){
  const s=tsState, field=s.field; const fw=field.clientWidth||640, fh=field.clientHeight||320;
  const text=TS_WORDS[Math.floor(Math.random()*TS_WORDS.length)];
  const el=document.createElement('div'); el.className='ts-word'; el.textContent=text;
  el.style.top=(10+Math.random()*(fh-46))+'px'; el.style.left=fw+'px'; field.appendChild(el);
  s.words.push({text:text.toLowerCase(), x:fw, el});
}
function tsLoop(){
  const s=tsState; if(!s||!s.running) return;
  if(currentGameId!=='typing'||!document.body.contains(s.field)){ tsCleanup(); return; }
  s.spawnT--; if(s.spawnT<=0){ tsSpawn(); s.spawnT=Math.max(34, 105 - s.cleared*1.4); }
  s.speed=Math.min(3.4, 1.1 + s.cleared*0.025);
  for(let i=s.words.length-1;i>=0;i--){ const w=s.words[i]; w.x-=s.speed; w.el.style.left=w.x+'px';
    if(w.x < -10 - w.el.offsetWidth){ w.el.remove(); s.words.splice(i,1); s.lives--; tsUpdateHud(); if(s.lives<=0){ tsGameOver(); return; } } }
  s.raf=requestAnimationFrame(tsLoop);
}
function tsUpdateHud(){
  const s=tsState; const cl=document.getElementById('ts-cleared'); if(cl) cl.textContent=s.cleared;
  const lv=document.getElementById('ts-lives'); if(lv){ const live=Math.max(0,s.lives); lv.innerHTML='<span style="color:#e34b4b">'+npdGameSvg('heart', 14).repeat(live)+'</span>'; }
}
function tsSubmit(){
  const s=tsState; if(!s||!s.running) return;
  const inp=document.getElementById('ts-input'); const val=(inp.value||'').trim().toLowerCase(); inp.value='';
  if(!val) return;
  let idx=-1, minx=Infinity;
  for(let i=0;i<s.words.length;i++){ if(s.words[i].text===val && s.words[i].x<minx){ minx=s.words[i].x; idx=i; } }
  if(idx>=0){ const el=s.words[idx].el; el.classList.add('hit'); setTimeout(()=>el.remove(),120); s.words.splice(idx,1); s.cleared++; tsUpdateHud(); }
  else { inp.classList.add('wrong'); setTimeout(()=>inp.classList.remove('wrong'),200); }
}
function tsGameOver(){
  const s=tsState; s.running=false; if(s.raf) cancelAnimationFrame(s.raf);
  s.words.forEach(w=>w.el.remove()); s.words=[];
  const caps=Math.floor(s.cleared/2);
  if(s.cleared>(UC.typingBest||0)) UC.typingBest=s.cleared;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, typingBest:UC.typingBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('ts-best'); if(bb) bb.textContent=UC.typingBest||0;
  const ov=document.getElementById('ts-overlay'); if(ov){ ov.style.display='flex'; ov.innerHTML=`<div class="ts-card"><div class="ts-title">Run over</div><div class="ts-sub">You cleared ${s.cleared} word${s.cleared===1?'':'s'}.</div><div class="ts-reward">${caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps'):'Clear a couple more to earn Bottlecaps.'}</div><button class="ts-btn" onclick="tsStart()">Play again</button></div>`; }
  if(caps>0) showToast('Typing Sprint: +'+caps+' Bottlecaps!');
}
function tsCleanup(){ if(tsState){ if(tsState.raf) cancelAnimationFrame(tsState.raf); tsState.running=false; } tsState=null; }

// ============================================================
//  AIM TRAINER
// ============================================================
let atState=null;
function renderAim(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="at-wrap">
    <div class="at-hud"><span>Time <b id="at-time">30</b></span><span>Hits <b id="at-hits">0</b></span><span>Acc <b id="at-acc">100%</b></span><span>Best <b id="at-best">${UC.aimBest||0}</b></span></div>
    <div class="at-field" id="at-field" onpointerdown="atMiss(event)"></div>
    <div class="at-overlay ts-overlay" id="at-overlay"><div class="ts-card"><div class="ts-title">Aim Trainer</div><div class="ts-sub">Pop as many targets as you can in 30 seconds. Precision counts.</div><button class="ts-btn" onclick="atStart()">Play</button></div></div>
  </div>`;
  atState={ hits:0, misses:0, running:false, endTime:0, timer:null };
}
function atStart(){
  const s=atState; if(!s) return;
  const ov=document.getElementById('at-overlay'); if(ov) ov.style.display='none';
  s.hits=0; s.misses=0; s.running=true; s.endTime=Date.now()+30000;
  atUpdateHud(); atSpawn();
  if(s.timer) clearInterval(s.timer);
  s.timer=setInterval(()=>{ if(!atState||!atState.running) return; const left=Math.max(0,Math.ceil((s.endTime-Date.now())/1000)); const t=document.getElementById('at-time'); if(t) t.textContent=left; if(Date.now()>=s.endTime) atEnd(); }, 100);
}
function atSpawn(){
  const field=document.getElementById('at-field'); if(!field) return;
  const old=field.querySelector('.at-target'); if(old) old.remove();
  const fw=field.clientWidth||600, fh=field.clientHeight||320, sz=Math.max(34,Math.min(64,fw*0.08));
  const t=document.createElement('div'); t.className='at-target'; t.style.width=t.style.height=sz+'px';
  t.style.left=(Math.random()*(fw-sz))+'px'; t.style.top=(Math.random()*(fh-sz))+'px';
  t.onpointerdown=function(e){ e.stopPropagation(); atHit(); };
  field.appendChild(t);
}
function atHit(){ const s=atState; if(!s||!s.running) return; s.hits++; atUpdateHud(); atSpawn(); }
function atMiss(){ const s=atState; if(!s||!s.running) return; s.misses++; atUpdateHud(); }
function atUpdateHud(){ const s=atState; const set=(id,v)=>{const el=document.getElementById(id); if(el) el.textContent=v;}; set('at-hits',s.hits); const tot=s.hits+s.misses; set('at-acc',(tot?Math.round(s.hits/tot*100):100)+'%'); }
function atEnd(){
  const s=atState; s.running=false; if(s.timer){ clearInterval(s.timer); s.timer=null; }
  const field=document.getElementById('at-field'); const tg=field&&field.querySelector('.at-target'); if(tg) tg.remove();
  const caps=Math.floor(s.hits/2);
  if(s.hits>(UC.aimBest||0)) UC.aimBest=s.hits;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, aimBest:UC.aimBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('at-best'); if(bb) bb.textContent=UC.aimBest||0;
  const tot=s.hits+s.misses, acc=tot?Math.round(s.hits/tot*100):100;
  const ov=document.getElementById('at-overlay'); if(ov){ ov.style.display='flex'; ov.innerHTML=`<div class="ts-card"><div class="ts-title">Time's up</div><div class="ts-sub">${s.hits} hits at ${acc}% accuracy.</div><div class="ts-reward">${caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps'):'Hit a few more next time to earn caps.'}</div><button class="ts-btn" onclick="atStart()">Play again</button></div>`; }
  if(caps>0) showToast('Aim Trainer: +'+caps+' Bottlecaps!');
}
function atCleanup(){ if(atState){ if(atState.timer) clearInterval(atState.timer); atState.running=false; } atState=null; }

// ============================================================
//  DAILY WORD  (same five-letter word for everyone, by date)
// ============================================================
const DW_WORDS=['apple','brave','crane','dance','eagle','fable','ghost','happy','ivory','jolly','kneel','lemon','mango','noble','olive','pearl','queen','river','solar','tiger','vivid','witty','yacht','zebra','beach','cloud','dream','flame','grape','heart','light','money','north','ocean','plant','quilt','robot','stone','toast','unity','vapor','wagon','blaze','chess','drift','frost','glide','honey','input','joker','karma','laser','metal','ninja','orbit','pixel','quick','raven','sugar','torch','ultra','venom','whale','yield','zesty','amber','bloom','cabin','depth','ember','fairy','globe','hatch','jumbo','knife','lunar','medal','nudge','onion','prism','ridge','spice','trend','usher','valve','wheat','climb','exact','fudge','grasp','hover','index','mirth','party','realm','swirl','table','vouch','adept','brisk','cliff','dwell','flock','gnome','hunch','irony','lodge','mossy','plumb','scout','tonic','vixen','waltz'];
let dwState=null, dwKeyHandler=null;
function dailyWordIndex(){ const d=new Date(); const dayNum=Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000); return ((dayNum % DW_WORDS.length)+DW_WORDS.length)%DW_WORDS.length; }
const DW_REWARDS=[0,120,90,70,50,35,25]; // index by number of guesses used (1..6) on a win
function dwEval(guess, word){
  const res=new Array(5).fill('b'), warr=word.split('');
  for(let i=0;i<5;i++){ if(guess[i]===word[i]){ res[i]='g'; warr[i]=null; } }
  for(let i=0;i<5;i++){ if(res[i]==='g') continue; const j=warr.indexOf(guess[i]); if(j>=0){ res[i]='y'; warr[j]=null; } }
  return res;
}
function renderDailyWord(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  const today=todayStr();
  if(UC.dwDate!==today){ UC.dwDate=today; UC.dwRows=[]; UC.dwDone=null; UC.dwHints=[]; }
  dwState={ word:DW_WORDS[dailyWordIndex()], rows:(UC.dwRows||[]).slice(), current:'', done:UC.dwDone||null, hints:(UC.dwHints||[]).slice() };
  stage.innerHTML=`<div class="dw-wrap">
    <div class="dw-head"><div class="dw-title">Daily Word</div><div class="dw-sub">One five-letter word for everyone today. Fewer guesses pay more Bottlecaps.</div></div>
    <div class="dw-board" id="dw-board"></div>
    <div class="dw-msg" id="dw-msg"></div>
    <div class="dw-hint" id="dw-hint"></div>
    
    <div class="dw-keys" id="dw-keys"></div>
  </div>`;
  dwBuildKeys(); dwDraw();
  if(dwKeyHandler) document.removeEventListener('keydown', dwKeyHandler);
  dwKeyHandler=function(e){ if(currentGameId!=='dailyword'||!dwState) return; const k=e.key;
    if(k==='Enter'){ e.preventDefault(); dwSubmit(); } else if(k==='Backspace'){ e.preventDefault(); dwBack(); } else if(/^[a-zA-Z]$/.test(k)){ dwType(k.toLowerCase()); } };
  document.addEventListener('keydown', dwKeyHandler);
}
function dwDraw(){
  const s=dwState, board=document.getElementById('dw-board'); if(!board) return;
  let html='';
  for(let r=0;r<6;r++){
    const guess = r<s.rows.length ? s.rows[r] : (r===s.rows.length && !s.done ? s.current : '');
    const evald = r<s.rows.length ? dwEval(s.rows[r], s.word) : null;
    html+='<div class="dw-row">';
    for(let i=0;i<5;i++){ const ch=guess[i]||''; const cls = evald?('dw-'+evald[i]):(ch?'dw-filled':''); html+=`<div class="dw-tile ${cls}">${ch.toUpperCase()}</div>`; }
    html+='</div>';
  }
  board.innerHTML=html;
  const msg=document.getElementById('dw-msg');
  if(msg){ if(s.done==='win'){ msg.textContent='Solved! Come back tomorrow for a new word.'; msg.className='dw-msg ok'; }
    else if(s.done==='lose'){ msg.textContent='The word was '+s.word.toUpperCase()+'. New word tomorrow.'; msg.className='dw-msg bad'; }
    else { msg.textContent=''; msg.className='dw-msg'; } }
  const hint=document.getElementById('dw-hint');
  if(hint){ hint.textContent = (s.hints&&s.hints.length) ? ('Hint: '+s.hints.slice().sort((a,b)=>a-b).map(i=>'letter '+(i+1)+' is '+s.word[i].toUpperCase()).join(', ')) : ''; }
  dwColorKeys();
}
function dwType(ch){ const s=dwState; if(!s||s.done) return; if(s.current.length<5){ s.current+=ch; dwDraw(); } }
function dwBack(){ const s=dwState; if(!s||s.done) return; s.current=s.current.slice(0,-1); dwDraw(); }
async function dwSubmit(){
  const s=dwState; if(!s||s.done) return;
  if(s.current.length<5){ const m=document.getElementById('dw-msg'); if(m){ m.textContent='Needs 5 letters.'; m.className='dw-msg bad'; } return; }
  const guess=s.current; s.rows.push(guess); s.current='';
  UC.dwRows=s.rows.slice(); UC.dwDate=todayStr();
  const win=guess===s.word; const save={dwRows:UC.dwRows, dwDate:UC.dwDate};
  if(win){ s.done='win'; UC.dwDone='win'; save.dwDone='win';
    const caps=DW_REWARDS[s.rows.length]||20; UC.coins=(UC.coins||0)+caps; save.coins=UC.coins;
    showToast('Daily Word solved! +'+caps+' Bottlecaps'); }
  else if(s.rows.length>=6){ s.done='lose'; UC.dwDone='lose'; save.dwDone='lose'; }
  try{ await dbUpdateUser(getU(), save); }catch(e){}
  if(win) refreshCaps();
  dwDraw();
}
function dwBuildKeys(){
  const rows=['qwertyuiop','asdfghjkl','zxcvbnm'], k=document.getElementById('dw-keys'); if(!k) return;
  let html='';
  rows.forEach((row,ri)=>{ html+='<div class="dw-krow">';
    if(ri===2) html+='<button class="dw-key dw-wide" onclick="dwSubmit()">Enter</button>';
    for(const ch of row) html+=`<button class="dw-key" id="dwk-${ch}" onclick="dwType('${ch}')">${ch.toUpperCase()}</button>`;
    if(ri===2) html+='<button class="dw-key dw-wide" onclick="dwBack()">Del</button>';
    html+='</div>'; });
  k.innerHTML=html;
}
function dwColorKeys(){
  const s=dwState, best={}, rank={b:0,y:1,g:2};
  s.rows.forEach(g=>{ const ev=dwEval(g,s.word); for(let i=0;i<5;i++){ const ch=g[i], v=ev[i]; if(best[ch]===undefined||rank[v]>rank[best[ch]]) best[ch]=v; } });
  Object.keys(best).forEach(ch=>{ const el=document.getElementById('dwk-'+ch); if(el){ el.classList.remove('dw-g','dw-y','dw-b'); el.classList.add('dw-'+best[ch]); } });
}
function dwCleanup(){ if(dwKeyHandler){ document.removeEventListener('keydown', dwKeyHandler); dwKeyHandler=null; } dwState=null; }

// ============================================================
//  BLOCK BLAST  (falling blocks, clear lines)
// ============================================================
const BB_SHAPES={ I:['XXXX'], O:['XX','XX'], T:['.X.','XXX'], S:['.XX','XX.'], Z:['XX.','.XX'], J:['X..','XXX'], L:['..X','XXX'] };
const BB_COLORS={ I:'#19c3ff', O:'#edc22e', T:'#b06bff', S:'#2faf4e', Z:'#e34b4b', J:'#3b6fe0', L:'#e0863b' };
const BB_TYPES=['I','O','T','S','Z','J','L'];
let bbState=null, bbKeyHandler=null;
function bbMatrix(type){ return BB_SHAPES[type].map(r=>r.split('').map(ch=>ch==='X')); }
function bbRotate(m){ const h=m.length, w=m[0].length, out=[]; for(let c=0;c<w;c++){ out.push([]); for(let r=h-1;r>=0;r--) out[c].push(m[r][c]); } return out; }
function bbCollide(s,m,px,py){ for(let r=0;r<m.length;r++)for(let c=0;c<m[r].length;c++){ if(!m[r][c]) continue; const x=px+c,y=py+r; if(x<0||x>=s.cols||y>=s.rows) return true; if(y>=0&&s.grid[y][x]) return true; } return false; }
function renderBlockBlast(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="bb-wrap">
    <div class="bb-hud"><span>Lines <b id="bb-lines">0</b></span><span>Score <b id="bb-score">0</b></span><span>Best <b id="bb-best">${UC.blastBest||0}</b></span></div>
    <div class="bb-stage"><canvas id="bb-canvas" class="bb-canvas"></canvas></div>
    <div class="bb-controls"><button onclick="bbMove(-1)">${npdGameSvg("left", 16)}</button><button onclick="bbRotateMove()">${npdGameSvg("rot", 16)}</button><button onclick="bbMove(1)">${npdGameSvg("right", 16)}</button><button onclick="bbSoft()">${npdGameSvg("down", 16)}</button><button onclick="bbHard()">Drop</button></div>
    <div class="bb-overlay ts-overlay" id="bb-overlay"><div class="ts-card"><div class="ts-title">Block Blast</div><div class="ts-sub">Stack the falling blocks and clear full rows. Use the arrow keys or the buttons. Up rotates, space hard-drops.</div><button class="ts-btn" onclick="bbStart()">Play</button></div></div>
  </div>`;
  bbInit();
}
function bbInit(){
  const cv=document.getElementById('bb-canvas'); if(!cv) return;
  const cols=10, rows=18, cell=Math.max(14,Math.min(22,Math.floor(340/rows)));
  cv.width=cols*cell; cv.height=rows*cell;
  bbState={ cv, ctx:cv.getContext('2d'), cols, rows, cell, grid:[], piece:null, next:null, score:0, lines:0, dropC:0, dropI:48, running:false, over:false, raf:0 };
  for(let r=0;r<rows;r++) bbState.grid.push(new Array(cols).fill(null));
  if(bbKeyHandler) document.removeEventListener('keydown', bbKeyHandler);
  bbKeyHandler=function(e){ if(currentGameId!=='blockblast'||!bbState||!bbState.running) return; const k=e.key;
    if(k==='ArrowLeft'){ e.preventDefault(); bbMove(-1); } else if(k==='ArrowRight'){ e.preventDefault(); bbMove(1); } else if(k==='ArrowDown'){ e.preventDefault(); bbSoft(); } else if(k==='ArrowUp'){ e.preventDefault(); bbRotateMove(); } else if(k===' '){ e.preventDefault(); bbHard(); } };
  document.addEventListener('keydown', bbKeyHandler);
  bbDraw();
}
function bbSpawn(){ const s=bbState; const type=s.next||BB_TYPES[Math.floor(Math.random()*7)]; s.next=BB_TYPES[Math.floor(Math.random()*7)];
  const m=bbMatrix(type), px=Math.floor((s.cols-m[0].length)/2);
  if(bbCollide(s,m,px,0)){ bbOver(); return; }
  s.piece={type,m,x:px,y:-1}; }
function bbStart(){
  if(!bbState) bbInit(); const s=bbState;
  const ov=document.getElementById('bb-overlay'); if(ov) ov.style.display='none';
  for(let r=0;r<s.rows;r++)for(let c=0;c<s.cols;c++) s.grid[r][c]=null;
  s.score=0; s.lines=0; s.dropC=0; s.dropI=48; s.over=false; s.running=true; s.next=null;
  bbSpawn(); bbUpdateHud(); bbLoop();
}
function bbLoop(){
  const s=bbState; if(!s||!s.running) return;
  if(currentGameId!=='blockblast'||!document.body.contains(s.cv)){ bbCleanup(); return; }
  s.dropC++; if(s.dropC>=s.dropI){ s.dropC=0; bbGravity(); }
  bbDraw(); s.raf=requestAnimationFrame(bbLoop);
}
function bbGravity(){ const s=bbState; if(!s.piece) return; if(!bbCollide(s,s.piece.m,s.piece.x,s.piece.y+1)) s.piece.y++; else bbLock(); }
function bbLock(){ const s=bbState, p=s.piece; if(!p) return;
  for(let r=0;r<p.m.length;r++)for(let c=0;c<p.m[r].length;c++){ if(p.m[r][c]){ const y=p.y+r,x=p.x+c; if(y>=0) s.grid[y][x]=BB_COLORS[p.type]; } }
  let cleared=0;
  for(let r=s.rows-1;r>=0;r--){ if(s.grid[r].every(v=>v)){ s.grid.splice(r,1); s.grid.unshift(new Array(s.cols).fill(null)); cleared++; r++; } }
  if(cleared){ s.lines+=cleared; s.score+=[0,100,300,500,800][cleared]||800; s.dropI=Math.max(8,48-Math.floor(s.lines/2)); }
  bbUpdateHud(); bbSpawn();
}
function bbMove(dx){ const s=bbState; if(!s||!s.piece||!s.running) return; if(!bbCollide(s,s.piece.m,s.piece.x+dx,s.piece.y)) s.piece.x+=dx; bbDraw(); }
function bbRotateMove(){ const s=bbState; if(!s||!s.piece||!s.running) return; const rm=bbRotate(s.piece.m); for(const k of [0,-1,1,-2,2]){ if(!bbCollide(s,rm,s.piece.x+k,s.piece.y)){ s.piece.m=rm; s.piece.x+=k; break; } } bbDraw(); }
function bbSoft(){ const s=bbState; if(!s||!s.piece||!s.running) return; if(!bbCollide(s,s.piece.m,s.piece.x,s.piece.y+1)){ s.piece.y++; s.dropC=0; } bbDraw(); }
function bbHard(){ const s=bbState; if(!s||!s.piece||!s.running) return; while(!bbCollide(s,s.piece.m,s.piece.x,s.piece.y+1)) s.piece.y++; bbLock(); bbDraw(); }
function bbUpdateHud(){ const s=bbState; const set=(id,v)=>{const el=document.getElementById(id); if(el) el.textContent=v;}; set('bb-lines',s.lines); set('bb-score',s.score); }
function bbDraw(){
  const s=bbState; if(!s) return; const c=s.ctx, cell=s.cell;
  c.fillStyle='#0d0f14'; c.fillRect(0,0,s.cv.width,s.cv.height);
  c.strokeStyle='rgba(255,255,255,.05)'; c.lineWidth=1;
  for(let x=0;x<=s.cols;x++){ c.beginPath(); c.moveTo(x*cell+.5,0); c.lineTo(x*cell+.5,s.cv.height); c.stroke(); }
  for(let y=0;y<=s.rows;y++){ c.beginPath(); c.moveTo(0,y*cell+.5); c.lineTo(s.cv.width,y*cell+.5); c.stroke(); }
  const dc=(x,y,col)=>{ c.fillStyle=col; c.fillRect(x*cell+1,y*cell+1,cell-2,cell-2); c.fillStyle='rgba(255,255,255,.2)'; c.fillRect(x*cell+1,y*cell+1,cell-2,3); };
  for(let r=0;r<s.rows;r++)for(let cc=0;cc<s.cols;cc++){ if(s.grid[r][cc]) dc(cc,r,s.grid[r][cc]); }
  if(s.piece){ const p=s.piece; for(let r=0;r<p.m.length;r++)for(let cc=0;cc<p.m[r].length;cc++){ if(p.m[r][cc]&&p.y+r>=0) dc(p.x+cc,p.y+r,BB_COLORS[p.type]); } }
}
function bbOver(){
  const s=bbState; s.running=false; s.over=true; if(s.raf) cancelAnimationFrame(s.raf);
  const caps=s.lines;
  if(s.lines>(UC.blastBest||0)) UC.blastBest=s.lines;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, blastBest:UC.blastBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('bb-best'); if(bb) bb.textContent=UC.blastBest||0;
  const ov=document.getElementById('bb-overlay'); if(ov){ ov.style.display='flex'; ov.innerHTML=`<div class="ts-card"><div class="ts-title">Game Over</div><div class="ts-sub">You cleared ${s.lines} line${s.lines===1?'':'s'} for ${s.score} points.</div><div class="ts-reward">${caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps'):'Clear some lines to earn Bottlecaps.'}</div><button class="ts-btn" onclick="bbStart()">Play again</button></div>`; }
  if(caps>0) showToast('Block Blast: +'+caps+' Bottlecaps!');
}
function bbCleanup(){ if(bbState){ if(bbState.raf) cancelAnimationFrame(bbState.raf); bbState.running=false; } if(bbKeyHandler){ document.removeEventListener('keydown', bbKeyHandler); bbKeyHandler=null; } bbState=null; }

// ============================================================
//  SUDOKU  (one daily puzzle for everyone)
// ============================================================
let suState=null, suKeyHandler=null;
function suRng(seed){ let a=(seed>>>0)||1; return function(){ a|=0; a=a+0x6D2B79F5|0; let t=Math.imul(a^a>>>15,1|a); t=t+Math.imul(t^t>>>7,61|t)^t; return ((t^t>>>14)>>>0)/4294967296; }; }
function suShuffle(arr,rng){ const a=arr.slice(); for(let i=a.length-1;i>0;i--){ const j=Math.floor(rng()*(i+1)); const t=a[i]; a[i]=a[j]; a[j]=t; } return a; }
function suGen(seed){
  const rng=suRng(seed);
  let sol=[]; for(let r=0;r<9;r++){ sol.push([]); for(let c=0;c<9;c++) sol[r].push((3*(r%3)+Math.floor(r/3)+c)%9+1); }
  const digs=suShuffle([1,2,3,4,5,6,7,8,9],rng); sol=sol.map(row=>row.map(v=>digs[v-1]));
  let rowOrder=[]; suShuffle([0,1,2],rng).forEach(b=>{ suShuffle([0,1,2],rng).forEach(x=>rowOrder.push(b*3+x)); }); sol=rowOrder.map(r=>sol[r]);
  let colOrder=[]; suShuffle([0,1,2],rng).forEach(st=>{ suShuffle([0,1,2],rng).forEach(x=>colOrder.push(st*3+x)); }); sol=sol.map(row=>colOrder.map(c=>row[c]));
  if(rng()<0.5){ const t=[]; for(let c=0;c<9;c++){ t.push([]); for(let r=0;r<9;r++) t[c].push(sol[r][c]); } sol=t; }
  const solution=sol.flat().join('');
  const idx=suShuffle(Array.from({length:81},(_,i)=>i),rng), puz=solution.split('');
  for(let i=0;i<44;i++) puz[idx[i]]='.';
  return { puzzle:puz.join(''), solution };
}
function suValid(cells){
  for(let i=0;i<81;i++) if(!cells[i]) return false;
  const ok=group=>{ const seen={}; for(const v of group){ if(seen[v]) return false; seen[v]=1; } return true; };
  for(let r=0;r<9;r++){ const row=[],col=[]; for(let c=0;c<9;c++){ row.push(cells[r*9+c]); col.push(cells[c*9+r]); } if(!ok(row)||!ok(col)) return false; }
  for(let br=0;br<3;br++)for(let bc=0;bc<3;bc++){ const box=[]; for(let r=0;r<3;r++)for(let c=0;c<3;c++) box.push(cells[(br*3+r)*9+(bc*3+c)]); if(!ok(box)) return false; }
  return true;
}
const SU_REWARD=150;
function renderSudoku(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  const today=todayStr(); const d=new Date(); const seed=Math.floor(Date.UTC(d.getFullYear(),d.getMonth(),d.getDate())/86400000);
  const gen=suGen(seed);
  if(UC.suDate!==today){ UC.suDate=today; UC.suProgress=gen.puzzle; UC.suDone=null; }
  const given=gen.puzzle.split('').map(ch=>ch==='.'?0:+ch);
  const prog=(UC.suProgress||gen.puzzle).split('').map(ch=>ch==='.'?0:+ch);
  suState={ given, cells:prog, solution:gen.solution, sel:-1, done:UC.suDone||null };
  stage.innerHTML=`<div class="su-wrap">
    <div class="su-head"><div class="su-title">Sudoku</div><div class="su-sub">Today's puzzle, the same for every player. Fill it so every row, column and box has 1 to 9.</div></div>
    <div class="su-board" id="su-board"></div>
    <div class="su-msg" id="su-msg"></div>
    <div class="su-pad" id="su-pad"></div>
    
  </div>`;
  suBuildPad(); suDraw();
  if(suKeyHandler) document.removeEventListener('keydown', suKeyHandler);
  suKeyHandler=function(e){ if(currentGameId!=='sudoku'||!suState||suState.done) return; const k=e.key;
    if(/^[1-9]$/.test(k)){ e.preventDefault(); suInput(+k); } else if(k==='Backspace'||k==='Delete'||k==='0'){ e.preventDefault(); suErase(); }
    else if(k==='ArrowLeft'&&suState.sel>0){ suState.sel--; suDraw(); } else if(k==='ArrowRight'&&suState.sel>=0&&suState.sel<80){ suState.sel++; suDraw(); }
    else if(k==='ArrowUp'&&suState.sel>=9){ suState.sel-=9; suDraw(); } else if(k==='ArrowDown'&&suState.sel>=0&&suState.sel<72){ suState.sel+=9; suDraw(); } };
  document.addEventListener('keydown', suKeyHandler);
}
function suConflict(cells,i){ const r=Math.floor(i/9),c=i%9,v=cells[i]; if(!v) return false;
  for(let k=0;k<9;k++){ if(k!==c&&cells[r*9+k]===v) return true; if(k!==r&&cells[k*9+c]===v) return true; }
  const br=Math.floor(r/3)*3,bc=Math.floor(c/3)*3;
  for(let rr=0;rr<3;rr++)for(let cc=0;cc<3;cc++){ const j=(br+rr)*9+(bc+cc); if(j!==i&&cells[j]===v) return true; }
  return false;
}
function suDraw(){
  const s=suState, board=document.getElementById('su-board'); if(!board) return;
  let html='';
  for(let i=0;i<81;i++){ const r=Math.floor(i/9),c=i%9,v=s.cells[i],isGiven=s.given[i]!==0;
    const cls='su-cell'+(isGiven?' su-given':'')+(i===s.sel?' su-sel':'')+(v&&!isGiven&&suConflict(s.cells,i)?' su-bad':'')+(c===2||c===5?' su-br':'')+(r===2||r===5?' su-bb':'');
    html+=`<div class="${cls}" onclick="suSel(${i})">${v||''}</div>`; }
  board.innerHTML=html;
  const msg=document.getElementById('su-msg');
  if(msg){ if(s.done==='win'){ msg.textContent='Solved! Come back tomorrow for a new puzzle.'; msg.className='su-msg ok'; } else { msg.textContent=''; msg.className='su-msg'; } }
}
function suSel(i){ const s=suState; if(!s||s.done) return; s.sel=i; suDraw(); }
function suInput(n){ const s=suState; if(!s||s.done||s.sel<0||s.given[s.sel]) return; s.cells[s.sel]=n; suAfterInput(); }
function suErase(){ const s=suState; if(!s||s.done||s.sel<0||s.given[s.sel]) return; s.cells[s.sel]=0; suAfterInput(); }
function suAfterInput(){ const s=suState; UC.suProgress=s.cells.map(v=>v||'.').join('');
  if(suValid(s.cells)){ s.done='win'; UC.suDone='win'; UC.coins=(UC.coins||0)+SU_REWARD; try{ dbUpdateUser(getU(),{coins:UC.coins,suDone:'win',suProgress:UC.suProgress,suDate:todayStr()}); }catch(e){} refreshCaps(); showToast('Sudoku solved! +'+SU_REWARD+' Bottlecaps'); }
  else { try{ dbUpdateUser(getU(),{suProgress:UC.suProgress,suDate:todayStr()}); }catch(e){} }
  suDraw();
}
function suBuildPad(){ const pad=document.getElementById('su-pad'); if(!pad) return; let html=''; for(let n=1;n<=9;n++) html+=`<button class="su-key" onclick="suInput(${n})">${n}</button>`; html+='<button class="su-key su-erase" onclick="suErase()">Erase</button>'; pad.innerHTML=html; }
function suCleanup(){ if(suKeyHandler){ document.removeEventListener('keydown', suKeyHandler); suKeyHandler=null; } if(suState&&UC&&getU()&&!suState.done){ try{ dbUpdateUser(getU(),{suProgress:suState.cells.map(v=>v||'.').join(''),suDate:todayStr()}); }catch(e){} } suState=null; }

// ============================================================
//  CONNECT FOUR vs REED
// ============================================================
let c4State=null;
const C4_WIN_TAUNTS=["Too easy. Want to go again?","Four in a row. As expected.","Reed wins. Predictable.","Did you even try?"];
const C4_LOSE_TAUNTS=["Lucky. Rematch?","Hmph. You got me that round.","Fine, you win this one.","Beginner's luck, surely."];
function c4Make(){ const b=[]; for(let r=0;r<6;r++) b.push(new Array(7).fill(0)); return b; }
function c4Drop(b,col,p){ for(let r=5;r>=0;r--){ if(!b[r][col]){ b[r][col]=p; return r; } } return -1; }
function c4Cols(b){ const cs=[]; for(let c=0;c<7;c++) if(!b[0][c]) cs.push(c); return cs; }
function c4Wins(b,p){
  for(let r=0;r<6;r++)for(let c=0;c<7;c++){ if(b[r][c]!==p) continue;
    if(c<=3&&b[r][c+1]===p&&b[r][c+2]===p&&b[r][c+3]===p) return true;
    if(r<=2&&b[r+1][c]===p&&b[r+2][c]===p&&b[r+3][c]===p) return true;
    if(r<=2&&c<=3&&b[r+1][c+1]===p&&b[r+2][c+2]===p&&b[r+3][c+3]===p) return true;
    if(r<=2&&c>=3&&b[r+1][c-1]===p&&b[r+2][c-2]===p&&b[r+3][c-3]===p) return true; }
  return false;
}
function c4Eval(b){
  let score=0; const W=[];
  for(let r=0;r<6;r++)for(let c=0;c<7;c++){
    if(c<=3) W.push([b[r][c],b[r][c+1],b[r][c+2],b[r][c+3]]);
    if(r<=2) W.push([b[r][c],b[r+1][c],b[r+2][c],b[r+3][c]]);
    if(r<=2&&c<=3) W.push([b[r][c],b[r+1][c+1],b[r+2][c+2],b[r+3][c+3]]);
    if(r<=2&&c>=3) W.push([b[r][c],b[r+1][c-1],b[r+2][c-2],b[r+3][c-3]]); }
  for(const w of W){ const me=w.filter(x=>x===2).length, op=w.filter(x=>x===1).length, em=w.filter(x=>x===0).length;
    if(me===3&&em===1) score+=50; else if(me===2&&em===2) score+=10;
    if(op===3&&em===1) score-=80; else if(op===2&&em===2) score-=8; }
  for(let r=0;r<6;r++){ if(b[r][3]===2) score+=6; else if(b[r][3]===1) score-=6; }
  return score;
}
function c4Minimax(b,depth,alpha,beta,maxing){
  if(c4Wins(b,2)) return [100000+depth,null];
  if(c4Wins(b,1)) return [-100000-depth,null];
  const cols=c4Cols(b);
  if(depth===0||!cols.length) return [c4Eval(b),null];
  cols.sort((a,c)=>Math.abs(3-a)-Math.abs(3-c));
  let best=cols[0];
  if(maxing){ let val=-Infinity; for(const col of cols){ const nb=b.map(row=>row.slice()); c4Drop(nb,col,2); const sc=c4Minimax(nb,depth-1,alpha,beta,false)[0]; if(sc>val){ val=sc; best=col; } alpha=Math.max(alpha,val); if(alpha>=beta) break; } return [val,best]; }
  let val=Infinity; for(const col of cols){ const nb=b.map(row=>row.slice()); c4Drop(nb,col,1); const sc=c4Minimax(nb,depth-1,alpha,beta,true)[0]; if(sc<val){ val=sc; best=col; } beta=Math.min(beta,val); if(alpha>=beta) break; } return [val,best];
}
function renderConnect4(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  c4State={ board:c4Make(), turn:1, over:false, busy:false, history:[] };
  stage.innerHTML=`<div class="c4-wrap">
    <div class="c4-head"><div class="c4-ava">${npdGameSvg("brain", 22)}</div><div style="flex:1;min-width:0"><div class="c4-name">Reed</div><div class="c4-status" id="c4-status">Your turn. You are red, Reed is yellow.</div></div></div>
    <div class="c4-board" id="c4-board"></div>
    <div class="c4-foot"><button class="mg-restart" onclick="c4Reset()">New Game</button></div>
  </div>`;
  c4Draw();
}
function c4Reset(){ const s=c4State; if(!s) return; s.board=c4Make(); s.turn=1; s.over=false; s.busy=false; s.history=[]; const st=document.getElementById('c4-status'); if(st) st.textContent='Your turn. You are red, Reed is yellow.'; c4Draw(); }
function c4Draw(){
  const s=c4State, board=document.getElementById('c4-board'); if(!board) return;
  let html='';
  const seen=s.drawn;   // discs that were not on the board at the last draw fall in from the top
  for(let c=0;c<7;c++){ html+=`<div class="c4-col" onclick="c4Play(${c})">`;
    for(let r=0;r<6;r++){ const v=s.board[r][c], fresh=v && seen && seen[r][c]!==v;
      html+=`<div class="c4-slot"><div class="c4-disc ${v===1?'c4-p':v===2?'c4-r':''}${fresh?' c4-drop':''}"${fresh?` style="--fall:${r+1}"`:''}></div></div>`; }
    html+='</div>'; }
  board.innerHTML=html;
  s.drawn=s.board.map(row=>row.slice());
}
function c4Play(col){
  const s=c4State; if(!s||s.over||s.busy||s.turn!==1) return;
  if(s.board[0][col]) return;
  s.busy=true; s.history.push(s.board.map(row=>row.slice()));
  c4Drop(s.board,col,1); c4Draw();
  if(c4Wins(s.board,1)){ c4End('win'); s.busy=false; return; }
  if(!c4Cols(s.board).length){ c4End('draw'); s.busy=false; return; }
  s.turn=2; const st=document.getElementById('c4-status'); if(st) st.textContent='Reed is thinking...';
  setTimeout(()=>{ if(!c4State||c4State.over){ if(c4State) c4State.busy=false; return; }
    const mv=c4Minimax(s.board,5,-Infinity,Infinity,true)[1];
    const col2=(mv==null? c4Cols(s.board)[0] : mv);
    c4Drop(s.board,col2,2); c4Draw();
    if(c4Wins(s.board,2)){ c4End('lose'); s.busy=false; return; }
    if(!c4Cols(s.board).length){ c4End('draw'); s.busy=false; return; }
    s.turn=1; const st2=document.getElementById('c4-status'); if(st2) st2.textContent='Your turn.'; s.busy=false;
  }, 320);
}
function c4End(result){
  const s=c4State; s.over=true; const st=document.getElementById('c4-status');
  if(result==='win'){ const caps=50; UC.coins=(UC.coins||0)+caps; try{ dbUpdateUser(getU(),{coins:UC.coins}); }catch(e){} refreshCaps(); if(st) st.textContent=pick(C4_LOSE_TAUNTS)+'  You win, +'+caps+' Bottlecaps!'; showToast('You beat Reed! +'+caps+' Bottlecaps'); }
  else if(result==='lose'){ if(st) st.textContent=pick(C4_WIN_TAUNTS); }
  else { const caps=10; UC.coins=(UC.coins||0)+caps; try{ dbUpdateUser(getU(),{coins:UC.coins}); }catch(e){} refreshCaps(); if(st) st.textContent='A draw. +'+caps+' Bottlecaps.'; }
}
function c4Cleanup(){ c4State=null; }

// ============================================================
//  STACK TOWER  (drop and align blocks)
// ============================================================
let stState=null, stKeyHandler=null;
function stColors(){ const cs=gameStyle(); const hx=n=>{const v=(cs.getPropertyValue(n)||'').trim(); return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)?v:null;}; return { accent:hx('--accent')||'#e08a1e', a2:hx('--accent-2')||'#ffcc66', bg:boardSurface(hx('--card-bg')) }; }
function renderStack(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="st-wrap">
    <div class="st-hud"><span>Height <b id="st-h">0</b></span><span>Best <b id="st-best">${UC.stackBest||0}</b></span></div>
    <canvas id="st-canvas" class="st-canvas"></canvas>
    <div class="st-overlay ts-overlay" id="st-overlay"><div class="ts-card"><div class="ts-title">Stack Tower</div><div class="ts-sub">Tap, click or press Space to drop each block. Line it up with the one below. Whatever hangs over is sliced off. Build as high as you can.</div><button class="ts-btn" onclick="stStart()">Play</button></div></div>
  </div>`;
  stInit();
}
function stInit(){
  const cv=document.getElementById('st-canvas'); if(!cv) return;
  const W=Math.max(300,(cv.parentElement&&cv.parentElement.clientWidth)||640), H=380;
  cv.width=W; cv.height=H;
  stState={ cv, ctx:cv.getContext('2d'), W, H, blockH:26, blocks:[], cur:null, speed:3, dir:1, running:false, over:false, raf:0, colors:stColors() };
  if(stKeyHandler) document.removeEventListener('keydown', stKeyHandler);
  stKeyHandler=function(e){ if((e.code==='Space'||e.key===' ')&&currentGameId==='stack'){ e.preventDefault(); stDrop(); } };
  document.addEventListener('keydown', stKeyHandler);
  cv.onpointerdown=function(){ stDrop(); };
  stDraw();
}
function stStart(){
  if(!stState) stInit(); const s=stState;
  const ov=document.getElementById('st-overlay'); if(ov) ov.style.display='none';
  const baseW=Math.min(180, s.W*0.42);
  s.blocks=[{x:(s.W-baseW)/2, w:baseW}]; s.speed=3; s.dir=1; s.over=false; s.running=true; s.colors=stColors();
  s.cur={ x:0, w:baseW };
  stUpdateHud(); stLoop();
}
function stLoop(){
  const s=stState; if(!s||!s.running) return;
  if(currentGameId!=='stack'||!document.body.contains(s.cv)){ stCleanup(); return; }
  s.cur.x+=s.speed*s.dir;
  if(s.cur.x<=0){ s.cur.x=0; s.dir=1; } else if(s.cur.x+s.cur.w>=s.W){ s.cur.x=s.W-s.cur.w; s.dir=-1; }
  stDraw(); s.raf=requestAnimationFrame(stLoop);
}
function stDrop(){
  const s=stState; if(!s||!s.running) return;
  const top=s.blocks[s.blocks.length-1];
  const left=Math.max(s.cur.x, top.x), right=Math.min(s.cur.x+s.cur.w, top.x+top.w), overlap=right-left;
  if(overlap<=0){ stOver(); return; }
  let nx=left, nw=overlap;
  if(Math.abs(s.cur.x-top.x)<5){ nx=top.x; nw=top.w; }
  s.blocks.push({x:nx, w:nw});
  s.speed=Math.min(8, 3+s.blocks.length*0.18);
  s.cur={ x:0, w:nw }; s.dir=1;
  stUpdateHud(); stDraw();
}
function stUpdateHud(){ const s=stState; const h=document.getElementById('st-h'); if(h) h.textContent=s.blocks.length-1; }
function stDraw(){
  const s=stState; if(!s) return; const c=s.ctx, col=s.colors, bh=s.blockH;
  const g=c.createLinearGradient(0,0,0,s.H); g.addColorStop(0,darken(col.bg,4)); g.addColorStop(1,darken(col.bg,16)); c.fillStyle=g; c.fillRect(0,0,s.W,s.H);
  const curLevel=s.blocks.length, baseY=s.H*0.32, yOf=level=>baseY+(curLevel-level)*bh;
  for(let i=0;i<s.blocks.length;i++){ const b=s.blocks[i], y=yOf(i); if(y>s.H) continue;
    c.fillStyle = i%2? col.accent : col.a2; c.fillRect(b.x,y,b.w,bh-2); c.fillStyle='rgba(255,255,255,.14)'; c.fillRect(b.x,y,b.w,3); }
  if(s.running&&s.cur){ c.fillStyle=col.accent; c.fillRect(s.cur.x,yOf(curLevel),s.cur.w,bh-2); c.fillStyle='rgba(255,255,255,.2)'; c.fillRect(s.cur.x,yOf(curLevel),s.cur.w,3); }
}
function stOver(){
  const s=stState; s.running=false; s.over=true; if(s.raf) cancelAnimationFrame(s.raf);
  const h=s.blocks.length-1, caps=h;
  if(h>(UC.stackBest||0)) UC.stackBest=h;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, stackBest:UC.stackBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('st-best'); if(bb) bb.textContent=UC.stackBest||0;
  const ov=document.getElementById('st-overlay'); if(ov){ ov.style.display='flex'; ov.innerHTML=`<div class="ts-card"><div class="ts-title">Toppled</div><div class="ts-sub">You stacked ${h} block${h===1?'':'s'} high.</div><div class="ts-reward">${caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps'):'Stack a few to earn Bottlecaps.'}</div><button class="ts-btn" onclick="stStart()">Play again</button></div>`; }
  if(caps>0) showToast('Stack Tower: +'+caps+' Bottlecaps!');
}
function stCleanup(){ if(stState){ if(stState.raf) cancelAnimationFrame(stState.raf); stState.running=false; } if(stKeyHandler){ document.removeEventListener('keydown', stKeyHandler); stKeyHandler=null; } stState=null; }

// ============================================================
//  MEMORY MATCH
// ============================================================
const MM_ICONS=[npdGameSvg('cookie',24),'<span class="orb-ic"></span>',npdGameSvg('snake',24),npdGameSvg('gem',24),npdGameSvg('math',24),npdGameSvg('wave',24),npdGameSvg('target',24),npdGameSvg('blocks',24),npdGameSvg('sudoku',24),npdGameSvg('connect4',24),npdGameSvg('stack',24),npdGameSvg('bomb',24),npdGameSvg('simon',24),npdGameSvg('brick',24),npdGameSvg('spark',24),npdGameSvg('rainbow',24)];
let mmState=null;
function renderMemory(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="mm-wrap">
    <div class="mm-hud"><span>Moves <b id="mm-moves">0</b></span><span>Best <b id="mm-best">${UC.memoryBest?UC.memoryBest+' moves':'-'}</b></span></div>
    <div class="mm-board" id="mm-board"></div>
    <div class="mm-msg" id="mm-msg"></div>
  </div>`;
  mmStart();
}
function mmStart(){
  const picks=MM_ICONS.slice(0,8); let deck=picks.concat(picks);
  for(let i=deck.length-1;i>0;i--){ const j=Math.floor(Math.random()*(i+1)); const t=deck[i]; deck[i]=deck[j]; deck[j]=t; }
  mmState={ cards:deck.map(v=>({val:v, flipped:false, matched:false})), first:-1, busy:false, moves:0, matched:0, done:false, peek:false };
  const msg=document.getElementById('mm-msg'); if(msg){ msg.textContent=''; msg.className='mm-msg'; }
  const mv=document.getElementById('mm-moves'); if(mv) mv.textContent='0';
  mmDraw();
}
// The board is built once and cards are updated in place, so flipping is a real CSS
// transition (rebuilding the cards on every flip is what made them snap before).
function mmDraw(){
  const s=mmState, board=document.getElementById('mm-board'); if(!board) return;
  if(board.children.length!==s.cards.length){
    board.classList.remove('win');
    board.innerHTML=s.cards.map((c,i)=>`<div class="mm-card deal" style="--i:${i}" onclick="mmFlip(${i})"><div class="mm-inner"><div class="mm-front"></div><div class="mm-back">${c.val}</div></div></div>`).join('');
    [...board.children].forEach(el=>el.addEventListener('animationend', e=>{ if(e.animationName==='mmDeal') el.classList.remove('deal'); }));
  }
  [...board.children].forEach((el,i)=>{ const c=s.cards[i], show=c.flipped||c.matched||s.peek;
    el.querySelector('.mm-back').innerHTML!==c.val && (el.querySelector('.mm-back').innerHTML=c.val);
    el.classList.toggle('flip', show);
    if(!show) el.classList.remove('shake');
    if(c.matched && !el.classList.contains('done')){ el.classList.add('done','pop'); setTimeout(()=>el.classList.remove('pop'), 900); }
    if(!c.matched) el.classList.remove('done'); });
}
function mmFlip(i){
  const s=mmState; if(!s||s.busy||s.done||s.peek) return; const card=s.cards[i];
  if(card.flipped||card.matched) return;
  card.flipped=true; mmDraw();
  if(s.first===-1){ s.first=i; return; }
  s.moves++; const mv=document.getElementById('mm-moves'); if(mv) mv.textContent=s.moves;
  const a=s.cards[s.first], b=card;
  if(a.val===b.val){ a.matched=b.matched=true; s.matched++; s.first=-1; mmDraw(); if(s.matched===8) mmWin(); }
  else { s.busy=true; const fi=s.first; s.first=-1;
    setTimeout(()=>{ const bd=document.getElementById('mm-board'); if(!mmState||!bd) return; [fi,i].forEach(k=>bd.children[k]&&bd.children[k].classList.add('shake')); }, 380);
    setTimeout(()=>{ if(!mmState) return; s.cards[fi].flipped=false; b.flipped=false; s.busy=false; mmDraw(); }, 750); }
}
function mmWin(){
  const s=mmState; s.done=true;
  setTimeout(()=>{ const bd=document.getElementById('mm-board'); if(bd&&mmState===s) bd.classList.add('win'); }, 500);
  const caps=Math.max(8, 60-Math.max(0,(s.moves-8))*2);
  if(!UC.memoryBest || s.moves<UC.memoryBest) UC.memoryBest=s.moves;
  UC.coins=(UC.coins||0)+caps;
  try{ dbUpdateUser(getU(),{coins:UC.coins, memoryBest:UC.memoryBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('mm-best'); if(bb) bb.textContent=UC.memoryBest+' moves';
  const msg=document.getElementById('mm-msg'); if(msg){ msg.innerHTML='Cleared in '+s.moves+' moves. <span class="orb-ic"></span> +'+caps+' Bottlecaps. <button class="ts-btn" style="padding:6px 16px;margin-left:8px" onclick="mmStart()">Again</button>'; msg.className='mm-msg ok'; }
  showToast('Memory Match: +'+caps+' Bottlecaps!');
}
function mmCleanup(){ mmState=null; }

// ============================================================
//  Bottlecap Sweeper  (minesweeper)
// ============================================================
let csState=null;
const CS_NUMCOL=['','#3b6fe0','#2faf4e','#e34b4b','#9b5cff','#e08a1e','#19c3ff','#e0457a','#888'];
function renderSweeper(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="cs-wrap">
    <div class="cs-hud"><span>Mines <b id="cs-mines">10</b></span><button class="cs-flagbtn" id="cs-flagbtn" onclick="csToggleFlag()">${npdGameSvg("flag", 13)} Flag: off</button></div>
    <div class="cs-board" id="cs-board"></div>
    <div class="cs-msg" id="cs-msg"></div>
    <div class="cs-foot"><button class="mg-restart" onclick="csStart()">New Board</button></div>
  </div>`;
  csStart();
}
function csStart(){
  const rows=9, cols=9, mines=10, grid=[];
  for(let r=0;r<rows;r++){ grid.push([]); for(let c=0;c<cols;c++) grid[r].push({mine:false, rev:false, flag:false, n:0}); }
  csState={ rows, cols, mines, grid, started:false, over:false, win:false, flagMode:false, revealed:0 };
  const fb=document.getElementById('cs-flagbtn'); if(fb) fb.innerHTML=npdGameSvg('flag',13)+' Flag: off';
  const mn=document.getElementById('cs-mines'); if(mn) mn.textContent=mines;
  const msg=document.getElementById('cs-msg'); if(msg){ msg.textContent=''; msg.className='cs-msg'; }
  csDraw();
}
function csPlace(sr,sc){
  const s=csState; let placed=0;
  while(placed<s.mines){ const r=Math.floor(Math.random()*s.rows), c=Math.floor(Math.random()*s.cols);
    if(s.grid[r][c].mine) continue; if(Math.abs(r-sr)<=1&&Math.abs(c-sc)<=1) continue;
    s.grid[r][c].mine=true; placed++; }
  for(let r=0;r<s.rows;r++)for(let c=0;c<s.cols;c++){ if(s.grid[r][c].mine) continue; let n=0;
    for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){ const nr=r+dr,nc=c+dc; if(nr>=0&&nr<s.rows&&nc>=0&&nc<s.cols&&s.grid[nr][nc].mine) n++; }
    s.grid[r][c].n=n; }
}
function csReveal(r,c){
  const s=csState, cell=s.grid[r][c]; if(cell.rev||cell.flag) return;
  cell.rev=true; s.revealed++;
  if(cell.n===0&&!cell.mine){ for(let dr=-1;dr<=1;dr++)for(let dc=-1;dc<=1;dc++){ const nr=r+dr,nc=c+dc; if(nr>=0&&nr<s.rows&&nc>=0&&nc<s.cols&&!s.grid[nr][nc].rev) csReveal(nr,nc); } }
}
function csClick(r,c){
  const s=csState; if(!s||s.over) return; const cell=s.grid[r][c];
  if(s.flagMode){ if(!cell.rev){ cell.flag=!cell.flag; csUpdateMines(); csDraw(); } return; }
  if(cell.flag) return;
  if(!s.started){ csPlace(r,c); s.started=true; }
  if(cell.mine){ cell.rev=true; s.over=true; csLose(); csDraw(); return; }
  csReveal(r,c);
  if(s.revealed===s.rows*s.cols-s.mines){ s.over=true; s.win=true; csWin(); }
  csDraw();
}
function csFlag(r,c){ const s=csState; if(!s||s.over) return; const cell=s.grid[r][c]; if(cell.rev) return; cell.flag=!cell.flag; csUpdateMines(); csDraw(); }
function csUpdateMines(){ const s=csState; let f=0; for(let r=0;r<s.rows;r++)for(let c=0;c<s.cols;c++) if(s.grid[r][c].flag) f++; const mn=document.getElementById('cs-mines'); if(mn) mn.textContent=Math.max(0,s.mines-f); }
function csToggleFlag(){ const s=csState; if(!s) return; s.flagMode=!s.flagMode; const fb=document.getElementById('cs-flagbtn'); if(fb) fb.innerHTML=npdGameSvg('flag',13)+' Flag: '+(s.flagMode?'on':'off'); }
function csDraw(){
  const s=csState, board=document.getElementById('cs-board'); if(!board) return;
  board.style.gridTemplateColumns='repeat('+s.cols+',1fr)';
  let html='';
  for(let r=0;r<s.rows;r++)for(let c=0;c<s.cols;c++){ const cell=s.grid[r][c]; let cls='cs-cell', txt='';
    if(cell.rev){ if(cell.mine){ cls+=' cs-mine'; txt=npdGameSvg('bomb', 16); } else { cls+=' cs-rev'; if(cell.n) txt='<span style="color:'+CS_NUMCOL[cell.n]+'">'+cell.n+'</span>'; } }
    else if(cell.flag){ cls+=' cs-flag'; txt=npdGameSvg('flag', 14); }
    html+=`<div class="${cls}" oncontextmenu="event.preventDefault();csFlag(${r},${c});return false" onclick="csClick(${r},${c})">${txt}</div>`; }
  board.innerHTML=html;
}
function csLose(){ const s=csState; for(let r=0;r<s.rows;r++)for(let c=0;c<s.cols;c++) if(s.grid[r][c].mine) s.grid[r][c].rev=true; const msg=document.getElementById('cs-msg'); if(msg){ msg.textContent='Boom! You hit a mine. Try a new board.'; msg.className='cs-msg bad'; } }
function csWin(){
  const caps=40; UC.coins=(UC.coins||0)+caps; try{ dbUpdateUser(getU(),{coins:UC.coins}); }catch(e){} refreshCaps();
  const msg=document.getElementById('cs-msg'); if(msg){ msg.innerHTML='Swept! Every mine avoided. <span class="orb-ic"></span> +'+caps+' Bottlecaps.'; msg.className='cs-msg ok'; }
  showToast('Bottlecap Sweeper: +'+caps+' Bottlecaps!');
}
function csCleanup(){ csState=null; }

// ============================================================
//  Bottlecap Crush  (match-3)
// ============================================================
const CR_COLORS=['#e34b4b','#19c3ff','#2faf4e','#edc22e','#b06bff','#e0863b'];
const CR_N=8, CR_MOVES=20;
let crState=null;
function crRandColor(){ return Math.floor(Math.random()*CR_COLORS.length); }
function crFindMatches(g){
  const m=new Set();
  for(let r=0;r<CR_N;r++)for(let c=0;c<CR_N-2;c++){ const v=g[r][c]; if(v!=null&&v===g[r][c+1]&&v===g[r][c+2]){ m.add(r+','+c); m.add(r+','+(c+1)); m.add(r+','+(c+2)); } }
  for(let c=0;c<CR_N;c++)for(let r=0;r<CR_N-2;r++){ const v=g[r][c]; if(v!=null&&v===g[r+1][c]&&v===g[r+2][c]){ m.add(r+','+c); m.add((r+1)+','+c); m.add((r+2)+','+c); } }
  return m;
}
function renderCrush(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="cr-wrap">
    <div class="cr-hud"><span>Score <b id="cr-score">0</b></span><span>Moves <b id="cr-moves">20</b></span></div>
    <div class="cr-board" id="cr-board"></div>
    <div class="cr-msg" id="cr-msg">Swap two touching gems to line up three of a colour.</div>
  </div>`;
  crStart();
}
function crStart(){
  crState={ grid:[], sel:-1, moves:CR_MOVES, score:0, busy:false, done:false, _t:null };
  const g=[]; for(let r=0;r<CR_N;r++){ g.push([]); for(let c=0;c<CR_N;c++) g[r].push(crRandColor()); }
  crState.grid=g;
  let m, guard=0; while((m=crFindMatches(g)).size && guard++<200){ m.forEach(k=>{ const p=k.split(',').map(Number); g[p[0]][p[1]]=crRandColor(); }); }
  const ms=document.getElementById('cr-msg'); if(ms){ ms.textContent='Swap two touching gems to line up three of a colour.'; ms.className='cr-msg'; }
  crUpdateHud(); crDraw();
}
function crDraw(){
  const s=crState, board=document.getElementById('cr-board'); if(!s||!board) return;
  board.style.gridTemplateColumns='repeat('+CR_N+',1fr)';
  let html='';
  for(let r=0;r<CR_N;r++)for(let c=0;c<CR_N;c++){ const v=s.grid[r][c], i=r*CR_N+c;
    html+=`<div class="cr-cell${s.sel===i?' cr-sel':''}" onclick="crClick(${r},${c})">${v==null?'':'<div class="cr-gem" style="background:'+CR_COLORS[v]+'"></div>'}</div>`; }
  board.innerHTML=html;
}
function crUpdateHud(){ const s=crState; const sc=document.getElementById('cr-score'); if(sc) sc.textContent=s.score; const mv=document.getElementById('cr-moves'); if(mv) mv.textContent=s.moves; }
function crClick(r,c){
  const s=crState; if(!s||s.busy||s.done) return; const i=r*CR_N+c;
  if(s.sel===-1){ s.sel=i; crDraw(); return; }
  const sr=Math.floor(s.sel/CR_N), sc=s.sel%CR_N;
  if(Math.abs(sr-r)+Math.abs(sc-c)===1){ s.sel=-1; crSwap(sr,sc,r,c); } else { s.sel=i; crDraw(); }
}
function crWait(ms){ return new Promise(res=>{ const t=setTimeout(res,ms); if(crState) crState._t=t; }); }
async function crSwap(r1,c1,r2,c2){
  const s=crState; s.busy=true; const g=s.grid;
  const tmp=g[r1][c1]; g[r1][c1]=g[r2][c2]; g[r2][c2]=tmp; crDraw();
  await crWait(140); if(!crState||currentGameId!=='crush') return;
  if(!crFindMatches(g).size){ const t2=g[r1][c1]; g[r1][c1]=g[r2][c2]; g[r2][c2]=t2; crDraw(); s.busy=false; return; }
  s.moves--; crUpdateHud();
  await crResolve(); if(!crState||currentGameId!=='crush') return;
  s.busy=false;
  if(s.moves<=0) crEnd();
}
async function crResolve(){
  const s=crState; let cascade=1;
  while(true){ if(!crState||currentGameId!=='crush') return; const m=crFindMatches(s.grid); if(!m.size) break;
    s.score+=m.size*10*cascade; crUpdateHud();
    m.forEach(k=>{ const p=k.split(',').map(Number); s.grid[p[0]][p[1]]=null; });
    crDraw(); await crWait(160); if(!crState) return;
    for(let c=0;c<CR_N;c++){ const col=[]; for(let r=CR_N-1;r>=0;r--) if(s.grid[r][c]!=null) col.push(s.grid[r][c]); for(let r=CR_N-1;r>=0;r--) s.grid[r][c]=(CR_N-1-r)<col.length?col[CR_N-1-r]:crRandColor(); }
    crDraw(); await crWait(140); if(!crState) return; cascade++;
  }
}
function crEnd(){
  const s=crState; s.done=true; const caps=Math.floor(s.score/100);
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); } if(s.score>(UC.crushBest||0)) UC.crushBest=s.score;
  try{ dbUpdateUser(getU(),{coins:UC.coins, crushBest:UC.crushBest}); }catch(e){}
  refreshCaps();
  const ms=document.getElementById('cr-msg'); if(ms){ ms.innerHTML='Out of moves. Score '+s.score+'. '+(caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps. '):'')+'<button class="ts-btn" style="padding:6px 16px;margin-left:8px" onclick="crStart()">Again</button>'; ms.className='cr-msg ok'; }
  if(caps>0) showToast('Bottlecap Crush: +'+caps+' Bottlecaps!');
}
function crCleanup(){ if(crState&&crState._t) clearTimeout(crState._t); crState=null; }

// ============================================================
//  BRICK BREAKER
// ============================================================
let bkState=null, bkKeyHandler=null;
const BK_BRICKCOLS=['#e34b4b','#e0863b','#edc22e','#2faf4e','#19c3ff'];
function bkColors(){ const cs=gameStyle(); const hx=n=>{const v=(cs.getPropertyValue(n)||'').trim(); return /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(v)?v:null;}; return { accent:hx('--accent')||'#e0563b', bg:boardSurface(hx('--card-bg')) }; }
function renderBrick(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="bk-wrap">
    <div class="bk-hud"><span>Score <b id="bk-score">0</b></span><span id="bk-lives"></span><span>Best <b id="bk-best">${UC.brickBest||0}</b></span></div>
    <canvas id="bk-canvas" class="bk-canvas"></canvas>
    <div class="bk-overlay ts-overlay" id="bk-overlay"><div class="ts-card"><div class="ts-title">Brick Breaker</div><div class="ts-sub">Move the paddle with your mouse, touch or the arrow keys. Bounce the ball and break every brick without letting it fall.</div><button class="ts-btn" onclick="bkStart()">Play</button></div></div>
  </div>`;
  bkInit();
}
function bkInit(){
  const cv=document.getElementById('bk-canvas'); if(!cv) return;
  const W=Math.max(300,(cv.parentElement&&cv.parentElement.clientWidth)||640), H=380;
  cv.width=W; cv.height=H;
  bkState={ cv, ctx:cv.getContext('2d'), W, H, paddle:{x:W/2-45,w:90,h:12}, ball:null, bricks:[], lives:3, score:0, level:1, running:false, over:false, raf:0, colors:bkColors() };
  if(bkKeyHandler) document.removeEventListener('keydown', bkKeyHandler);
  bkKeyHandler=function(e){ if(currentGameId!=='brick'||!bkState) return; const p=bkState.paddle; if(e.key==='ArrowLeft'){ e.preventDefault(); p.x=Math.max(0,p.x-28); } else if(e.key==='ArrowRight'){ e.preventDefault(); p.x=Math.min(bkState.W-p.w,p.x+28); } };
  document.addEventListener('keydown', bkKeyHandler);
  cv.onpointermove=function(e){ if(!bkState) return; const rect=cv.getBoundingClientRect(); const mx=(e.clientX-rect.left)*(cv.width/rect.width); bkState.paddle.x=Math.max(0,Math.min(bkState.W-bkState.paddle.w, mx-bkState.paddle.w/2)); };
  cv.onpointerdown=function(){ if(bkState&&!bkState.running&&!bkState.over) bkStart(); };
  bkBuildBricks(); bkResetBall(); bkDraw();
}
function bkBuildBricks(){
  const s=bkState; s.bricks=[]; const cols=8, rows=4+Math.min(3,s.level-1), gap=4, bw=(s.W-gap*(cols+1))/cols, bh=18;
  for(let r=0;r<rows;r++)for(let c=0;c<cols;c++) s.bricks.push({ x:gap+c*(bw+gap), y:40+r*(bh+gap), w:bw, h:bh, alive:true, color:BK_BRICKCOLS[r%BK_BRICKCOLS.length] });
}
function bkResetBall(){ const s=bkState; s.ball={ x:s.W/2, y:s.H-42, vx:(Math.random()<0.5?-1:1)*3, vy:-3.4, r:7 }; }
function bkStart(){
  if(!bkState) bkInit(); const s=bkState;
  const ov=document.getElementById('bk-overlay'); if(ov) ov.style.display='none';
  s.lives=3; s.score=0; s.level=1; s.over=false; s.running=true; s.colors=bkColors();
  bkBuildBricks(); bkResetBall(); bkUpdateHud(); bkLoop();
}
function bkLoop(){
  const s=bkState; if(!s||!s.running) return;
  if(currentGameId!=='brick'||!document.body.contains(s.cv)){ bkCleanup(); return; }
  const b=s.ball; b.x+=b.vx; b.y+=b.vy;
  if(b.x-b.r<0){ b.x=b.r; b.vx=Math.abs(b.vx); } else if(b.x+b.r>s.W){ b.x=s.W-b.r; b.vx=-Math.abs(b.vx); }
  if(b.y-b.r<0){ b.y=b.r; b.vy=Math.abs(b.vy); }
  const p=s.paddle;
  if(b.vy>0 && b.y+b.r>=s.H-22 && b.y+b.r<=s.H-6 && b.x>=p.x && b.x<=p.x+p.w){ b.vy=-Math.abs(b.vy); b.vx=((b.x-(p.x+p.w/2))/(p.w/2))*4.4; }
  if(b.y-b.r>s.H){ s.lives--; bkUpdateHud(); if(s.lives<=0){ bkOver(); return; } bkResetBall(); }
  for(const br of s.bricks){ if(!br.alive) continue; if(b.x>br.x-b.r && b.x<br.x+br.w+b.r && b.y>br.y-b.r && b.y<br.y+br.h+b.r){ br.alive=false; s.score+=10; b.vy=-b.vy; bkUpdateHud(); break; } }
  if(s.bricks.every(br=>!br.alive)){ s.level++; bkBuildBricks(); bkResetBall(); s.ball.vx*=1.06; s.ball.vy*=1.06; }
  bkDraw(); s.raf=requestAnimationFrame(bkLoop);
}
function bkUpdateHud(){ const s=bkState; const sc=document.getElementById('bk-score'); if(sc) sc.textContent=s.score; const lv=document.getElementById('bk-lives'); if(lv) lv.innerHTML='<span style="color:#e34b4b">'+npdGameSvg('heart', 14).repeat(Math.max(0,s.lives))+'</span>'; }
function bkDraw(){
  const s=bkState; if(!s) return; const c=s.ctx, col=s.colors;
  const g=c.createLinearGradient(0,0,0,s.H); g.addColorStop(0,darken(col.bg,4)); g.addColorStop(1,darken(col.bg,14)); c.fillStyle=g; c.fillRect(0,0,s.W,s.H);
  for(const br of s.bricks){ if(!br.alive) continue; c.fillStyle=br.color; c.fillRect(br.x,br.y,br.w,br.h); c.fillStyle='rgba(255,255,255,.2)'; c.fillRect(br.x,br.y,br.w,3); }
  const p=s.paddle; c.fillStyle=col.accent; c.fillRect(p.x,s.H-22,p.w,p.h);
  if(s.ball){ c.fillStyle='#fff'; c.beginPath(); c.arc(s.ball.x,s.ball.y,s.ball.r,0,Math.PI*2); c.fill(); }
}
function bkOver(){
  const s=bkState; s.running=false; s.over=true; if(s.raf) cancelAnimationFrame(s.raf);
  const caps=Math.floor(s.score/30);
  if(s.score>(UC.brickBest||0)) UC.brickBest=s.score;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, brickBest:UC.brickBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('bk-best'); if(bb) bb.textContent=UC.brickBest||0;
  const ov=document.getElementById('bk-overlay'); if(ov){ ov.style.display='flex'; ov.innerHTML=`<div class="ts-card"><div class="ts-title">Game Over</div><div class="ts-sub">Score ${s.score}, reached level ${s.level}.</div><div class="ts-reward">${caps>0?('<span class="orb-ic"></span> +'+caps+' Bottlecaps'):'Break more bricks to earn Bottlecaps.'}</div><button class="ts-btn" onclick="bkStart()">Play again</button></div>`; }
  if(caps>0) showToast('Brick Breaker: +'+caps+' Bottlecaps!');
}
function bkCleanup(){ if(bkState){ if(bkState.raf) cancelAnimationFrame(bkState.raf); bkState.running=false; } if(bkKeyHandler){ document.removeEventListener('keydown', bkKeyHandler); bkKeyHandler=null; } bkState=null; }

// ============================================================
//  COLOR SIMON
// ============================================================
let smState=null, smTimer=null;
const SM_PADS=[{id:0,color:'#2faf4e'},{id:1,color:'#e34b4b'},{id:2,color:'#edc22e'},{id:3,color:'#19c3ff'}];
function renderSimon(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  stage.innerHTML=`<div class="sm-wrap">
    <div class="sm-hud"><span>Round <b id="sm-round">0</b></span><span>Best <b id="sm-best">${UC.simonBest||0}</b></span></div>
    <div class="sm-pads">${SM_PADS.map(p=>`<button class="sm-pad" data-pad="${p.id}" style="background:${p.color}" onclick="smPress(${p.id})"></button>`).join('')}</div>
    <div class="sm-msg" id="sm-msg">Watch the sequence, then repeat it.</div>
    <div style="text-align:center"><button class="ts-btn" id="sm-startbtn" onclick="smStart()">Start</button></div>
  </div>`;
  smState={ seq:[], step:0, round:0, showing:false, accepting:false, over:false };
}
function smStart(){ const s=smState; if(!s) return; s.seq=[]; s.round=0; s.over=false; const b=document.getElementById('sm-startbtn'); if(b) b.style.display='none'; smNext(); }
function smNext(){ const s=smState; s.seq.push(Math.floor(Math.random()*4)); s.round=s.seq.length; const r=document.getElementById('sm-round'); if(r) r.textContent=s.round; smShow(); }
function smFlash(id){ const el=document.querySelector('.sm-pad[data-pad="'+id+'"]'); if(el){ el.classList.add('lit'); setTimeout(()=>el.classList.remove('lit'),300); } }
function smShow(){
  const s=smState; s.showing=true; s.accepting=false; s.step=0;
  const msg=document.getElementById('sm-msg'); if(msg) msg.textContent='Watch...';
  let i=0; if(smTimer) clearInterval(smTimer);
  smTimer=setInterval(()=>{ if(!smState||currentGameId!=='simon'){ clearInterval(smTimer); smTimer=null; return; }
    if(i>=s.seq.length){ clearInterval(smTimer); smTimer=null; s.showing=false; s.accepting=true; const m=document.getElementById('sm-msg'); if(m) m.textContent='Your turn.'; return; }
    smFlash(s.seq[i]); i++; }, 620);
}
function smPress(id){
  const s=smState; if(!s||!s.accepting||s.over) return;
  smFlash(id);
  if(id!==s.seq[s.step]){ smOver(); return; }
  s.step++;
  if(s.step>=s.seq.length){ s.accepting=false; const m=document.getElementById('sm-msg'); if(m) m.textContent='Nice!'; setTimeout(()=>{ if(smState&&!smState.over) smNext(); }, 650); }
}
function smOver(){
  const s=smState; s.over=true; s.accepting=false;
  const rounds=Math.max(0,s.round-1), caps=rounds;
  if(rounds>(UC.simonBest||0)) UC.simonBest=rounds;
  if(caps>0){ UC.coins=(UC.coins||0)+caps; trackQuest('caps',caps); }
  try{ dbUpdateUser(getU(),{coins:UC.coins, simonBest:UC.simonBest}); }catch(e){}
  refreshCaps();
  const bb=document.getElementById('sm-best'); if(bb) bb.textContent=UC.simonBest||0;
  const msg=document.getElementById('sm-msg'); if(msg) msg.textContent='Wrong! You reached round '+rounds+'.'+(caps>0?(' +'+caps+' Bottlecaps.'):'');
  const b=document.getElementById('sm-startbtn'); if(b){ b.style.display=''; b.textContent='Play again'; }
  if(caps>0) showToast('Color Simon: +'+caps+' Bottlecaps!');
}
function smCleanup(){ if(smTimer){ clearInterval(smTimer); smTimer=null; } smState=null; }

// ============================================================
//  X-TRA MATH  (AI-generated problems for Bottlecaps)
// ============================================================
const XTRA_LEVELS=[
  {lv:1, name:'Arithmetic',       reward:5,  guide:'simple addition or subtraction of two whole numbers between 10 and 99'},
  {lv:2, name:'Times Tables',     reward:10, guide:'a multiplication, or a clean whole-number division, of numbers up to 15'},
  {lv:3, name:'Pre-Algebra',      reward:18, guide:'order of operations, or a percentage such as "what is 25% of 80", with a single whole-number answer'},
  {lv:4, name:'Linear Algebra',   reward:30, guide:'solving a linear equation for x, for example 3x + 7 = 22, with an integer or simple fraction answer'},
  {lv:5, name:'Advanced Algebra', reward:50, guide:'solving a quadratic equation x^2 + bx + c = 0 with whole-number roots and asking for the LARGER root; the answer must be a single exact integer'},
  {lv:6, name:'Calculus',         reward:75, guide:'single-variable calculus: differentiating a polynomial and evaluating the derivative at an integer point, or evaluating a simple definite integral of a polynomial; the answer must be a single exact integer'}
];
let xtraState=null;
function renderXtraMath(){
  const stage=document.getElementById('game-stage'); if(!stage||!UC) return;
  xtraState={level:null, problem:null, next:null, streak:0, solved:0, earned:0};
  stage.innerHTML=`<div class="xm-wrap">
    <div class="xm-head"><div class="xm-title">X-tra Math</div><div class="xm-sub">Solve problems for Bottlecaps. Harder levels pay more. Problems are written by AI.</div></div>
    <div class="xm-stats"><span>Solved <b id="xm-solved">0</b></span><span>Streak <b id="xm-streak">0</b></span><span>Earned <b id="xm-earned">0</b> <span class="orb-ic"></span></span></div>
    <div class="xm-levels" id="xm-levels">${XTRA_LEVELS.map(L=>`<button class="xm-lvl" onclick="xtraPick(${L.lv})"><span class="xm-lvl-n">Level ${L.lv}</span><span class="xm-lvl-name">${L.name}</span><span class="xm-lvl-rw"><span class="orb-ic"></span> ${L.reward}+</span></button>`).join('')}</div>
    <div class="xm-play" id="xm-play" style="display:none"></div>
  </div>`;
}
function xtraPick(lv){
  if(!xtraState) return;
  xtraState.level=XTRA_LEVELS.find(L=>L.lv===lv); xtraState.next=null;
  document.getElementById('xm-levels').style.display='none';
  const play=document.getElementById('xm-play'); play.style.display='block';
  play.innerHTML=`<div class="xm-playhead"><button class="xm-back2" onclick="xtraMenu()">‹ Change level</button><span class="xm-lvltag">Level ${xtraState.level.lv} &middot; ${xtraState.level.name} &middot; <span class="orb-ic"></span> ${xtraState.level.reward}+</span></div>
    <div class="xm-problem" id="xm-problem">Generating problem...</div>
    <div class="xm-row"><input class="xm-input" id="xm-answer" placeholder="Your answer" autocomplete="off" onkeydown="if(event.key==='Enter')xtraSubmit()"><button class="xm-submit" onclick="xtraSubmit()">Submit</button></div>
    <div class="xm-actions"><button class="xm-skip" onclick="xtraSkip()">Skip (no Bottlecaps)</button><span class="xm-fb" id="xm-fb"></span></div>`;
  xtraServe();
}
function xtraMenu(){
  if(!xtraState) return; xtraState.problem=null; xtraState.next=null;
  const play=document.getElementById('xm-play'); if(play) play.style.display='none';
  const lv=document.getElementById('xm-levels'); if(lv) lv.style.display='';
}
async function xtraServe(){
  const st=xtraState; if(!st||!st.level) return;
  const pEl=document.getElementById('xm-problem'), aEl=document.getElementById('xm-answer');
  if(st.next){ st.problem=st.next; st.next=null; }
  else { if(pEl) pEl.textContent='Generating problem...'; st.problem=await xtraGen(st.level); }
  if(currentGameId!=='xtramath'||!st.problem) return;
  if(pEl) pEl.textContent=st.problem.q;
  if(aEl){ aEl.value=''; aEl.focus(); }
  st.hintShown=false;
  const fb=document.getElementById('xm-fb'); if(fb){ fb.textContent=''; fb.className='xm-fb'; }
  const lv=st.level;
  xtraGen(lv).then(p=>{ if(xtraState&&xtraState.level&&xtraState.level.lv===lv.lv&&!xtraState.next) xtraState.next=p; }).catch(()=>{});
}
async function xtraGen(L){ const ai=await xtraGenAI(L); return ai||xtraGenLocal(L.lv); }
async function xtraGenAI(L){
  if(!aiOn()) return null;
  try{
    const prompt='Create ONE math problem about: '+L.guide+'. Solve it yourself carefully and put ONLY the final exact answer as a number (integer, decimal, or a simplified fraction like 3/4) in "answer", with no words or units. Output ONLY compact JSON like {"question":"...","answer":"..."}. Never put the answer inside the question.';
    const ctrl=new AbortController(); const to=setTimeout(()=>ctrl.abort(),14000);
    let res; try{ res=await fetch(AI_CONFIG.endpoint,{method:'POST',headers:aiHeaders(),body:JSON.stringify({model:AI_CONFIG.model,messages:[{role:'user',content:prompt}],max_tokens:320}),signal:ctrl.signal}); } finally{ clearTimeout(to); }
    if(!res.ok) return null;
    const data=await res.json();
    const content=(((data.choices||[])[0]||{}).message||{}).content||'';
    const m=String(content).match(/\{[\s\S]*\}/); if(!m) return null;
    const obj=JSON.parse(m[0]);
    const q=String(obj.question||'').trim(); const num=parseNum(obj.answer);
    if(!q||num===null) return null;
    if(xtraRevealsAnswer(q, num, obj.answer)) return null; // never show a problem that gives away its own answer
    return {q, a:num};
  }catch(e){ return null; }
}
function xtraGenLocal(lv){
  const ri=(a,b)=>a+Math.floor(Math.random()*(b-a+1));
  if(lv===1){ const a=ri(10,99),b=ri(10,99); if(Math.random()<0.5) return {q:`${a} + ${b} = ?`,a:a+b}; const x=Math.max(a,b),y=Math.min(a,b); return {q:`${x} - ${y} = ?`,a:x-y}; }
  if(lv===2){ if(Math.random()<0.5){ const a=ri(2,15),b=ri(2,15); return {q:`${a} × ${b} = ?`,a:a*b}; } const b=ri(2,12),x=ri(2,12); return {q:`${b*x} ÷ ${b} = ?`,a:x}; }
  if(lv===3){ if(Math.random()<0.5){ const p=[10,20,25,50][ri(0,3)], whole=ri(1,9)*20; return {q:`What is ${p}% of ${whole}?`,a:whole*p/100}; } const a=ri(2,9),b=ri(2,9),c=ri(2,9); return {q:`${a} + ${b} × ${c} = ?`,a:a+b*c}; }
  if(lv===4){ const x=ri(-9,9),a=ri(2,9),b=ri(-9,9), c=a*x+b; const sign=b<0?`- ${-b}`:`+ ${b}`; return {q:`Solve for x:  ${a}x ${sign} = ${c}`,a:x}; }
  if(lv===5){ const r1=ri(-7,7),r2=ri(-7,7), b=-(r1+r2), c=r1*r2;
    const bs=b<0?`- ${-b}x`:(b>0?`+ ${b}x`:''), cs=c<0?`- ${-c}`:(c>0?`+ ${c}`:'');
    return {q:`Solve x² ${bs} ${cs} = 0. Give the larger root.`, a:Math.max(r1,r2)}; }
  // lv 6: calculus (derivatives and a definite integral, all integer answers)
  const t=Math.random();
  if(t<0.4){ const a=ri(1,5),b=ri(-6,6),cc=ri(-5,5),k=ri(-3,5); const bs=b<0?`- ${-b}x`:`+ ${b}x`, cs=cc<0?`- ${-cc}`:`+ ${cc}`;
    return {q:`If f(x) = ${a}x² ${bs} ${cs}, find f'(${k}).`, a:2*a*k+b}; }
  if(t<0.7){ const a=ri(1,4),k=ri(-3,4);
    return {q:`If f(x) = ${a}x³, find f'(${k}).`, a:3*a*k*k}; }
  const ia=ri(1,6), ib=ri(1,4)*2;
  return {q:`Evaluate the definite integral of ${ia}x dx from 0 to ${ib}.`, a:ia*ib*ib/2};
}
function xtraRevealsAnswer(q, num, rawAns){
  const ql=q.toLowerCase();
  if(/answer|solution|equals/.test(ql)) return true;
  const norm=q.replace(/\s+/g,'');
  if(norm.indexOf('='+String(num))>=0) return true;
  if(rawAns!=null && norm.indexOf('='+String(rawAns).replace(/\s+/g,''))>=0) return true;
  return false;
}
function parseNum(s){
  if(s===null||s===undefined) return null;
  s=String(s).trim().replace(/^x\s*=\s*/i,'').replace(/[^0-9./+\-]/g,'');
  if(s==='') return null;
  if(/^[-+]?\d+\/\d+$/.test(s)){ const p=s.split('/').map(Number); if(p[1]===0) return null; return p[0]/p[1]; }
  const n=Number(s); return isNaN(n)?null:n;
}
function xtraFmt(n){ return (Math.abs(n-Math.round(n))<1e-9)?String(Math.round(n)):String(Math.round(n*1000)/1000); }
async function xtraSubmit(){
  const st=xtraState; if(!st||!st.problem) return;
  const aEl=document.getElementById('xm-answer'), fb=document.getElementById('xm-fb');
  const guess=parseNum(aEl?aEl.value:'');
  if(guess===null){ if(fb){ fb.textContent='Type a number (fractions like 3/4 are fine).'; fb.className='xm-fb warn'; } return; }
  if(Math.abs(guess-st.problem.a)<1e-6){
    let reward=st.level.reward; st.streak++; const bonus=Math.min(20,(st.streak-1)*2); reward+=bonus;
    st.solved++; st.earned+=reward; UC.coins=(UC.coins||0)+reward;
    try{ await dbUpdateUser(getU(),{coins:UC.coins}); }catch(e){}
    refreshCaps();
    const set=(id,v)=>{ const el=document.getElementById(id); if(el) el.textContent=v; };
    set('xm-solved',st.solved); set('xm-streak',st.streak); set('xm-earned',st.earned);
    if(fb){ fb.textContent='Correct! +'+reward+' Bottlecaps'+(bonus?(' ('+bonus+' streak bonus)'):''); fb.className='xm-fb ok'; }
    showToast('Correct! +'+reward+' Bottlecaps');
    setTimeout(()=>{ if(currentGameId==='xtramath') xtraServe(); }, 750);
  } else {
    st.streak=0; const sEl=document.getElementById('xm-streak'); if(sEl) sEl.textContent=0;
    if(fb){ fb.textContent='Not quite. Answer was '+xtraFmt(st.problem.a)+'. Next problem coming...'; fb.className='xm-fb bad'; }
    setTimeout(()=>{ if(currentGameId==='xtramath') xtraServe(); }, 1500);
  }
}
function xtraSkip(){
  const st=xtraState; if(!st) return; st.streak=0;
  const sEl=document.getElementById('xm-streak'); if(sEl) sEl.textContent=0;
  const fb=document.getElementById('xm-fb'); if(fb){ fb.textContent='Skipped.'; fb.className='xm-fb'; }
  xtraServe();
}
function xtraMakeHint(num){
  if(!Number.isInteger(num)){ return 'it is not a whole number. It rounds to about '+Math.round(num)+'.'; }
  const w=Math.max(4, Math.round(Math.abs(num)*0.3)), off=1+Math.floor(Math.random()*(w-1));
  const lo=num-off, hi=num+(w-off);
  return 'it is a number between '+lo+' and '+hi+'.';
}
function xtraCleanup(){ xtraState=null; }


// ============================================================
// Games hub + window
// ============================================================

const GAME_TILES = [
  { id: 'growgarden', title: 'Grow a Garden', ic: npdGameSvg('seed', 28), c: '#3fae54', open: () => renderGrowGarden() },
  { id: 'cookie',     title: 'Cookie Clicker', ic: npdGameSvg('cookie', 28), c: '#c8841e', open: stage => { stage.innerHTML = '<div class="cookie-game" id="cookie-game"></div>'; renderCookie(); } },
  { id: 'geodash',    title: 'Liquid Dash', ic: npdGameSvg('wave', 28), c: '#2aa7ff', open: () => renderGeoDash() },
  { id: 'snake',      title: 'Snake', ic: npdGameSvg('snake', 28), c: '#2faf4e', open: () => renderSnake() },
  { id: 'merge',      title: 'Blox Merge', ic: npdGameSvg('grid', 28), c: '#edc22e', open: () => renderMerge() },
  { id: 'xtramath',   title: 'X-tra Math', ic: npdGameSvg('math', 28), c: '#1f9e57', open: () => renderXtraMath() },
  { id: 'typing',     title: 'Typing Sprint', ic: npdGameSvg('keyboard', 28), c: '#3b6fe0', open: () => renderTyping() },
  { id: 'aim',        title: 'Aim Trainer', ic: npdGameSvg('target', 28), c: '#e0563b', open: () => renderAim() },
  { id: 'dailyword',  title: 'Daily Word', ic: npdGameSvg('word', 28), c: '#15a05a', open: () => renderDailyWord() },
  { id: 'blockblast', title: 'Block Blast', ic: npdGameSvg('blocks', 28), c: '#e0563b', open: () => renderBlockBlast() },
  { id: 'sudoku',     title: 'Sudoku', ic: npdGameSvg('sudoku', 28), c: '#3b6fe0', open: () => renderSudoku() },
  { id: 'connect4',   title: 'Connect Four', ic: npdGameSvg('connect4', 28), c: '#e0b020', open: () => renderConnect4() },
  { id: 'stack',      title: 'Stack Tower', ic: npdGameSvg('stack', 28), c: '#e08a1e', open: () => renderStack() },
  { id: 'memory',     title: 'Memory Match', ic: npdGameSvg('cards', 28), c: '#b06bff', open: () => renderMemory() },
  { id: 'sweeper',    title: 'Bottlecap Sweeper', ic: npdGameSvg('bomb', 28), c: '#5b6b7a', open: () => renderSweeper() },
  { id: 'crush',      title: 'Bottlecap Crush', ic: npdGameSvg('gem', 28), c: '#19c3ff', open: () => renderCrush() },
  { id: 'brick',      title: 'Brick Breaker', ic: npdGameSvg('brick', 28), c: '#e0563b', open: () => renderBrick() },
  { id: 'simon',      title: 'Color Simon', ic: npdGameSvg('simon', 28), c: '#2faf4e', open: () => renderSimon() },
];

const GAME_CLEANUPS = () => [gdCleanup, xtraCleanup, snakeCleanup, mergeCleanup, tsCleanup, atCleanup, dwCleanup, bbCleanup,
  suCleanup, c4Cleanup, stCleanup, mmCleanup, csCleanup, crCleanup, bkCleanup, smCleanup, ggCleanup];

let gameWin = null;

function ensureGameWindow() {
  if (gameWin) return gameWin;
  gameWin = document.createElement('div');
  gameWin.className = 'fg-overlay';
  gameWin.hidden = true;
  gameWin.innerHTML =
    '<div class="fg-window" role="dialog" aria-modal="true" aria-labelledby="fg-title">' +
    '<header class="fg-bar"><h3 class="fg-title" id="fg-title"></h3>' +
    '<span class="fg-chip"><span class="orb-ic"></span><b class="fg-orbs">0</b></span>' +
    '<button class="fg-x" aria-label="Close game">' + npdGameSvg("close", 18) + '</button></header>' +
    '<div class="fg-stage" id="game-stage"></div></div>';
  document.body.append(gameWin);
  gameWin.querySelector('.fg-x').onclick = closeGame;
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !gameWin.hidden) closeGame(); });
  return gameWin;
}

function openGame(id) {
  const game = GAME_TILES.find(g => g.id === id);
  if (!game || !myUid) return;
  ensureGameWindow();
  GAME_CLEANUPS().forEach(fn => fn());
  const stage = gameWin.querySelector('#game-stage');
  stage.innerHTML = '';
  stage.scrollTop = 0;
  gameWin.querySelector('.fg-title').textContent = game.title;
  gameWin.hidden = false;
  currentGameId = id; rpcGameStartedAt = Date.now();
  activityRefresh();
  refreshCaps();
  game.open(stage);
}

function closeGame() {
  GAME_CLEANUPS().forEach(fn => { try { fn(); } catch (e) {} });
  currentGameId = null; rpcGameStartedAt = 0;
  activityRefresh();
  if (gameWin) { gameWin.hidden = true; gameWin.querySelector('#game-stage').innerHTML = ''; }
}

function mountGameHubs() {
  document.querySelectorAll('.fg-mount').forEach(root => {
    root.innerHTML =
      '<div class="fg-head"><div><h3 class="fg-heading">Play Games, Earn Bottlecaps</h3>' +
      '<p class="fg-sub">Every mini-game pays out in Bottlecaps when a run ends. Spend them on Cars, Paints, Shop items &amp; NPD Premium.</p></div>' +
      '<span class="fg-chip"><span class="orb-ic"></span><b class="fg-orbs">0</b></span></div>' +
      '<div class="fg-grid">' +
      GAME_TILES.map(g =>
        `<button class="fg-tile" data-game="${g.id}"><span class="fg-thumb" style="background:linear-gradient(135deg,${g.c},${lighten(g.c, 45)})">` +
        `<span class="fg-ic">${g.ic}</span></span><span class="fg-name">${g.title}</span></button>`).join('') + '</div>';
    root.onclick = e => {
      const tile = e.target.closest('.fg-tile');
      if (tile) openGame(tile.dataset.game);
    };
  });
  refreshCaps();
}
