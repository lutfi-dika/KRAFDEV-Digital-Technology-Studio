const SESSION_KEY = "krafdev-admin-session";

export const DEFAULT_ADMIN_PASSWORD = "krafdev-admin";

export function isAuthenticated(): boolean {
  if (typeof window === "undefined") return false;
  try {
    return window.localStorage.getItem(SESSION_KEY) === "1";
  } catch {
    return false;
  }
}

export function login(password: string): boolean {
  const expected =
    typeof process !== "undefined" && process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      ? process.env.NEXT_PUBLIC_ADMIN_PASSWORD
      : DEFAULT_ADMIN_PASSWORD;
  const ok = password === expected;
  if (ok) {
    try {
      window.localStorage.setItem(SESSION_KEY, "1");
    } catch {
      // ignore
    }
  }
  return ok;
}

export function logout() {
  try {
    window.localStorage.removeItem(SESSION_KEY);
  } catch {
    // ignore
  }
}
