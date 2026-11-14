// Passes /__/auth/* through to Firebase (bottleliquidalt.firebaseapp.com) on NPD's own address, so "Continue with Google" works in
// Safari, Firefox and Brave too: modern browsers wall off storage from a second address, which broke Google sign-in when
// authDomain pointed straight at firebaseapp.com.
export async function onRequest({ request }) {
  const u = new URL(request.url);
  u.hostname = 'bottleliquidalt.firebaseapp.com';
  u.port = '';
  u.protocol = 'https:';
  const r = await fetch(new Request(u.toString(), request), { redirect: 'manual' });
  const h = new Headers(r.headers);
  h.delete('X-Frame-Options');          // Firebase's helper page opens in a hidden frame on this same address
  return new Response(r.body, { status: r.status, statusText: r.statusText, headers: h });
}
