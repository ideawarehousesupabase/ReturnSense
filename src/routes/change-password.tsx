import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { useAuth } from "@/lib/auth";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Activity, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/change-password")({
  head: () => ({ meta: [{ title: "Change password — ReturnSense" }] }),
  component: ChangePasswordPage,
});

function ChangePasswordPage() {
  const { changePassword } = useAuth();
  const nav = useNavigate();
  const [email, setEmail] = useState("");
  const [pw, setPw] = useState("");
  const [cf, setCf] = useState("");
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPw, setShowPw] = useState(false);
  const [showCf, setShowCf] = useState(false);

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    if (pw.length < 6) return setErr("Password must be at least 6 characters");
    if (pw !== cf) return setErr("Passwords do not match");
    setLoading(true);
    try {
      const r = await changePassword(email, pw);
      if (!r.ok) return setErr(r.error);
      toast.success("Password updated. Please sign in.");
      nav({ to: "/login" });
    } catch {
      setErr("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="grid min-h-screen place-items-center bg-secondary/40 px-4">
      <Card className="w-full max-w-md p-8">
        <Link to="/" className="mb-6 flex items-center gap-2">
          <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--brand-gradient)" }}>
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <span className="text-base font-semibold">ReturnSense</span>
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Change password</h1>
        <p className="mt-1 text-sm text-muted-foreground">Enter your registered email and a new password.</p>
        <form onSubmit={submit} className="mt-6 space-y-4">
          <div><Label htmlFor="e">Registered email</Label><Input id="e" type="email" required value={email} onChange={(e) => setEmail(e.target.value)} className="mt-1" /></div>
          <div>
            <Label htmlFor="p">New password</Label>
            <div className="relative mt-1">
              <Input id="p" type={showPw ? "text" : "password"} required value={pw} onChange={(e) => setPw(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShowPw(!showPw)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <div>
            <Label htmlFor="c">Confirm new password</Label>
            <div className="relative mt-1">
              <Input id="c" type={showCf ? "text" : "password"} required value={cf} onChange={(e) => setCf(e.target.value)} className="pr-10" />
              <button type="button" onClick={() => setShowCf(!showCf)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors" tabIndex={-1}>
                {showCf ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          {err && <div className="rounded-md border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">{err}</div>}
          <Button type="submit" className="w-full" disabled={loading}>{loading ? "Updating…" : "Update password"}</Button>
        </form>
        <div className="mt-4 text-center text-sm"><Link to="/login" className="text-muted-foreground hover:text-foreground">Back to sign in</Link></div>
      </Card>
    </div>
  );
}
