import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { db } from "@/lib/firebase";
import {
  collection,
  doc,
  getDocs,
  getDoc,
  setDoc,
  updateDoc,
  query,
  where,
} from "firebase/firestore";

export type Role = "operations" | "quality" | "admin";

export interface StoredUser {
  id: number;
  fullName: string;
  email: string;
  password: string; // prototype only
  role: Role;
  createdAt: string;
}

export interface SessionUser {
  id: number;
  fullName: string;
  email: string;
  role: Role;
}

const USERS_COLLECTION = "users";
const SESSION_KEY = "returnsense.session";

/* ─── Firestore helpers ─── */

async function readUsersFromFirestore(): Promise<StoredUser[]> {
  const snap = await getDocs(collection(db, USERS_COLLECTION));
  return snap.docs.map((d) => d.data() as StoredUser);
}

async function ensureSeedUsers(): Promise<void> {
  const snap = await getDocs(collection(db, USERS_COLLECTION));
  if (snap.empty) {
    const seed: StoredUser[] = [
      { id: 1, fullName: "Ava Chen", email: "ops@returnsense.io", password: "demo123", role: "operations", createdAt: new Date().toISOString() },
      { id: 2, fullName: "Marcus Vale", email: "quality@returnsense.io", password: "demo123", role: "quality", createdAt: new Date().toISOString() },
      { id: 3, fullName: "Priya Shah", email: "admin@returnsense.io", password: "demo123", role: "admin", createdAt: new Date().toISOString() },
    ];
    for (const u of seed) {
      await setDoc(doc(db, USERS_COLLECTION, u.email.toLowerCase()), u);
    }
  }
}

async function findUserByEmail(email: string): Promise<StoredUser | null> {
  const docRef = doc(db, USERS_COLLECTION, email.toLowerCase());
  const snap = await getDoc(docRef);
  if (!snap.exists()) return null;
  return snap.data() as StoredUser;
}

export async function getAllUsers(): Promise<StoredUser[]> {
  return readUsersFromFirestore();
}

/* ─── Auth context ─── */

interface AuthCtx {
  user: SessionUser | null;
  ready: boolean;
  login: (email: string, password: string) => Promise<{ ok: true; user: SessionUser } | { ok: false; error: string }>;
  register: (input: { fullName: string; email: string; password: string; role: Role }) => Promise<{ ok: true } | { ok: false; error: string }>;
  changePassword: (email: string, newPassword: string) => Promise<{ ok: true } | { ok: false; error: string }>;
  logout: () => void;
}

const AuthContext = createContext<AuthCtx | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<SessionUser | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    async function init() {
      await ensureSeedUsers();
      try {
        const raw = localStorage.getItem(SESSION_KEY);
        if (raw) setUser(JSON.parse(raw));
      } catch {}
      setReady(true);
    }
    init();
  }, []);

  const login: AuthCtx["login"] = async (email, password) => {
    const u = await findUserByEmail(email);
    if (!u) return { ok: false, error: "User not found" };
    if (u.password !== password) return { ok: false, error: "Invalid credentials" };
    const session: SessionUser = { id: u.id, fullName: u.fullName, email: u.email, role: u.role };
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    setUser(session);
    return { ok: true, user: session };
  };

  const register: AuthCtx["register"] = async ({ fullName, email, password, role }) => {
    const existing = await findUserByEmail(email);
    if (existing) {
      return { ok: false, error: "Email already registered" };
    }
    const allUsers = await readUsersFromFirestore();
    const id = allUsers.reduce((m, u) => Math.max(m, u.id), 0) + 1;
    const newUser: StoredUser = { id, fullName, email, password, role, createdAt: new Date().toISOString() };
    await setDoc(doc(db, USERS_COLLECTION, email.toLowerCase()), newUser);
    return { ok: true };
  };

  const changePassword: AuthCtx["changePassword"] = async (email, newPassword) => {
    const existing = await findUserByEmail(email);
    if (!existing) return { ok: false, error: "User not found" };
    await updateDoc(doc(db, USERS_COLLECTION, email.toLowerCase()), { password: newPassword });
    return { ok: true };
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
