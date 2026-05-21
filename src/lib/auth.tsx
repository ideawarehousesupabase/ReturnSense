import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db, USERS_COLLECTION } from "./firebase";

export type Role = "operations" | "quality" | "admin";

export interface StoredUser {
  id: number;
  fullName: string;
  email: string;
  password: string; // prototype only — plaintext per project requirements
  role: Role;
  createdAt: string;
}

export interface SessionUser {
  id: number;
  fullName: string;
  email: string;
  role: Role;
}

const SESSION_KEY = "returnsense.session";

function usersCol() {
  return collection(db, USERS_COLLECTION);
}

function docIdForEmail(email: string) {
  return email.trim().toLowerCase();
}

async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const ref = doc(db, USERS_COLLECTION, docIdForEmail(email));
  const snap = await getDoc(ref);
  if (!snap.exists()) return null;
  return snap.data() as StoredUser;
}

export async function getAllUsers(): Promise<StoredUser[]> {
  const snap = await getDocs(usersCol());
  return snap.docs.map((d) => d.data() as StoredUser);
}

async function nextUserId(): Promise<number> {
  const snap = await getDocs(usersCol());
  let max = 0;
  snap.docs.forEach((d) => {
    const v = (d.data() as { id?: number }).id;
    if (typeof v === "number" && v > max) max = v;
  });
  return max + 1;
}

interface AuthCtx {
  user: SessionUser | null;
  ready: boolean;
  login: (
    email: string,
    password: string
  ) => Promise<{ ok: true; user: SessionUser } | { ok: false; error: string }>;
  register: (input: {
    fullName: string;
    email: string;
    password: string;
    role: Role;
  }) => Promise<{ ok: true } | { ok: false; error: string }>;
  changePassword: (
    email: string,
    newPassword: string
  ) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(SESSION_KEY);
      if (raw) setUser(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  const login: AuthCtx["login"] = async (email, password) => {
    try {
      const u = await findUserByEmail(email);
      if (!u) return { ok: false, error: "User not found" };
      if (u.password !== password) return { ok: false, error: "Invalid credentials" };
      const session: SessionUser = { id: u.id, fullName: u.fullName, email: u.email, role: u.role };
      localStorage.setItem(SESSION_KEY, JSON.stringify(session));
      setUser(session);
      return { ok: true, user: session };
    } catch (e) {
      return { ok: false, error: (e as Error).message || "Login failed" };
    }
  };

  const register: AuthCtx["register"] = async ({ fullName, email, password, role }) => {
    try {
      const existing = await findUserByEmail(email);
      if (existing) return { ok: false, error: "Email already registered" };
      const id = await nextUserId();
      await setDoc(doc(db, USERS_COLLECTION, docIdForEmail(email)), {
        id,
        fullName,
        email,
        password,
        role,
        createdAt: new Date().toISOString(),
      });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message || "Registration failed" };
    }
  };

  const changePassword: AuthCtx["changePassword"] = async (email, newPassword) => {
    try {
      const ref = doc(db, USERS_COLLECTION, docIdForEmail(email));
      const exists = await getDoc(ref);
      if (!exists.exists()) return { ok: false, error: "User not found" };
      await updateDoc(ref, { password: newPassword });
      return { ok: true };
    } catch (e) {
      return { ok: false, error: (e as Error).message || "Update failed" };
    }
  };

  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, ready, login, register, changePassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}

export const roleHome: Record<Role, string> = {
  operations: "/dashboard/operations",
  quality: "/dashboard/quality",
  admin: "/dashboard/admin",
};
