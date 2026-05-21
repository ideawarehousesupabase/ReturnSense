import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth, type Role } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Activity } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/register")({
  head: () => ({ meta: [{ title: "Create account — ReturnSense" }] }),
  component: RegisterPage,
});

function RegisterPage() {
  const { register } = useAuth();
  const nav = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [role, setRole] = useState<Role>("operations");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (!fullName || !email || !password) return setErr("All fields are required");
    if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) return setErr("Enter a valid email");
    if (password.length < 6) return setErr("Password must be at least 6 characters");
    if (password !== confirm) return setErr("Passwords do not match");
    setLoading(true);
    const res = await register({ fullName, email, password, role });
    setLoading(false);
    if (!res.ok) return setErr(res.error);
    toast.success("Account created. Please sign in.");
    nav({ to: "/login" });
  }

  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-4 py-10">
      <Card className="w-full max-w-md p-8">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--brand-gradient)" }}>
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold">ReturnSense</span>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Create your account</h1>
        <p className="mt-1 text-sm text-muted-foreground">Get a workspace up in under two minutes.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><Label htmlFor="n">Full name</Label><Input id="n" required value={fullName} onChange={(e) => setFullName(e.target.value)} className="mt-1" /></div>
          <div><Label htmlFor="e">Email</Label><Input id="e" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" /></div>
          <div className="grid grid-cols-2 gap-3">
            <div><Label htmlFor="p">Password</Label><Input id="p" type="password" required value={password} onChange={(e) => setPassword(e.target.value)} className="mt-1" /></div>
            <div><Label htmlFor="c">Confirm</Label><Input id="c" type="password" required value={confirm} onChange={(e) => setConfirm(e.target.value)} className="mt-1" /></div>
          </div>
          <div>
            <Label>Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as Role)}>
              <SelectTrigger className="mt-1"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="operations">Operations Team</SelectItem>
                <SelectItem value="quality">Quality Team</SelectItem>
              </SelectContent>
            </Select>
          </div>
          {err && <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div>}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Creating…" : "Create account"}</Button>
        </form>
        <div className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </div>
      </Card>
    </div>
  );
}
