/**
 * Minimal mock auth.
 *
 * Any email + password (min 1 char) "logs in" as admin and persists in
 * localStorage. Replace these three functions with real calls to your
 * Express/Mongo backend (return a JWT and store it the same way).
 *
 * Example real implementation:
 *   const r = await fetch(`${API}/auth/login`, { method:"POST", body: JSON.stringify({email,password}), headers:{"content-type":"application/json"} });
 *   const { token, user } = await r.json();
 *   localStorage.setItem(KEY, JSON.stringify({ token, user }));
 */
const KEY = "jdco_session";

export type Session = { token: string; email: string };

export function login(email: string, password: string): Session {
  if (!email || !password) throw new Error("Email and password required");
  const session: Session = { token: "mock-" + Math.random().toString(36).slice(2), email };
  localStorage.setItem(KEY, JSON.stringify(session));
  window.dispatchEvent(new Event("jdco-auth"));
  return session;
}

export function logout() {
  localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("jdco-auth"));
}

export function getSession(): Session | null {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Session) : null;
  } catch {
    return null;
  }
}

export function getToken(): string | null {
  return getSession()?.token ?? null;
}

export function isAuthenticated(): boolean {
  return getSession() !== null;
}

// Subscribe to login/logout changes from anywhere in the app.
export function onAuthChange(cb: () => void): () => void {
  const handler = () => cb();
  window.addEventListener("jdco-auth", handler);
  window.addEventListener("storage", handler);
  return () => {
    window.removeEventListener("jdco-auth", handler);
    window.removeEventListener("storage", handler);
  };
}
