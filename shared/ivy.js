// The Ivy Path: one shared connection to the backend, used by every page.
// The key below is the public (publishable) key. It is safe in a web page:
// what each person can see or change is enforced by the database's own rules.
window.IVY = !window.supabase ? null : (() => {
  const SUPABASE_URL = "https://tuipwjdbbevukbhgqyrs.supabase.co";
  const SUPABASE_KEY = "sb_publishable_WcDYYbdG37hf1fzy2PxpXg_nw4d9Tv7";
  const sb = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

  // Site root, whichever page we are on (…/Automation/).
  const base = location.pathname
    .replace(/index\.html$/, "")
    .replace(/(task-capture|admin)\/$/, "");
  const home = location.origin + base;

  const STATUS = {
    submitted: { label: "Submitted" },
    needs_detail: { label: "Needs more detail" },
    plan_ready: { label: "Plan ready" },
    approved: { label: "Approved" },
    live: { label: "Live" },
  };

  async function user() {
    const { data } = await sb.auth.getSession();
    return (data && data.session && data.session.user) || null;
  }
  async function profile(uid) {
    const { data } = await sb.from("profiles").select("*").eq("id", uid).maybeSingle();
    return data || null;
  }
  function sendLink(email, meta) {
    return sb.auth.signInWithOtp({ email, options: { emailRedirectTo: home, data: meta || {} } });
  }
  function day(v) {
    if (!v) return "";
    return new Date(v).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
  }
  function el(tag, attrs, ...kids) {
    const n = document.createElement(tag);
    for (const [k, v] of Object.entries(attrs || {})) {
      if (v === false || v == null) continue;
      if (k === "class") n.className = v;
      else if (k === "text") n.textContent = v;
      else if (k.startsWith("on")) n.addEventListener(k.slice(2), v);
      else n.setAttribute(k, v === true ? "" : v);
    }
    for (const kid of kids.flat()) if (kid != null && kid !== false) n.append(kid);
    return n;
  }
  return { sb, base, home, STATUS, user, profile, sendLink, day, el };
})();
