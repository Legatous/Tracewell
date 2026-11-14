import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Role = "admin" | "customer";

export type DemoUser = {
  email: string;
  password: string;
  role: Role;
  name: string;
};

// Seeded demo accounts — replace with real backend auth later.
// This is intentionally simple: plaintext demo passwords, localStorage session.
// Do not use this pattern for real user data.
const SEED_USERS: DemoUser[] = [
  { email: "admin@demo.com", password: "admin123", role: "admin", name: "Admin (demo)" },
  { email: "user@demo.com", password: "user123", role: "customer", name: "Customer (demo)" },
];

const USERS_KEY = "tracewell_demo_users";
const SESSION_KEY = "tracewell_demo_session";

type AuthContextValue = {
  user: DemoUser | null;
  loading: boolean;
  login: (email: string, password: string) => { ok: boolean; error?: string };
  register: (email: string, password: string, name: string) => { ok: boolean; error?: string };
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

function loadUsers(): DemoUser[] {
  const raw = window.localStorage.getItem(USERS_KEY);
  if (!raw) {
    window.localStorage.setItem(USERS_KEY, JSON.stringify(SEED_USERS));
    return SEED_USERS;
  }
  try {
    return JSON.parse(raw) as DemoUser[];
  } catch {
    return SEED_USERS;
  }
}

function saveUsers(users: DemoUser[]) {
  window.localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<DemoUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUsers();
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (raw) {
      try {
        setUser(JSON.parse(raw) as DemoUser);
      } catch {
        // ignore corrupt session
      }
    }
    setLoading(false);
  }, []);

  function login(email: string, password: string) {
    const users = loadUsers();
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) return { ok: false, error: "Invalid email or password." };
    setUser(found);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(found));
    return { ok: true };
  }

  function register(email: string, password: string, name: string) {
    const users = loadUsers();
    if (users.some((u) => u.email.toLowerCase() === email.toLowerCase())) {
      return { ok: false, error: "An account with that email already exists." };
    }
    const newUser: DemoUser = { email, password, role: "customer", name: name || email };
    saveUsers([...users, newUser]);
    setUser(newUser);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(newUser));
    return { ok: true };
  }

  function logout() {
    setUser(null);
    window.localStorage.removeItem(SESSION_KEY);
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
