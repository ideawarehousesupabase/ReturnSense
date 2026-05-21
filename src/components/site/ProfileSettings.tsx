import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth";
import { toast } from "sonner";

export function ProfileSettings() {
  const { user } = useAuth();
  if (!user) return null;
  return (
    <div>
      <PageHeader title="Settings" subtitle="Manage your profile and workspace preferences." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-6">
          <div className="text-sm font-medium">Profile</div>
          <form
            onSubmit={(e) => { e.preventDefault(); toast.success("Profile saved (mock)"); }}
            className="mt-4 space-y-4"
          >
            <div><Label htmlFor="n">Full name</Label><Input id="n" defaultValue={user.fullName} className="mt-1" /></div>
            <div><Label htmlFor="e">Email</Label><Input id="e" defaultValue={user.email} className="mt-1" /></div>
            <div><Label>Role</Label><Input value={user.role} disabled className="mt-1 capitalize" /></div>
            <Button type="submit">Save changes</Button>
          </form>
        </Card>
        <Card className="p-6">
          <div className="text-sm font-medium">Workspace</div>
          <div className="mt-4 space-y-3 text-sm">
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Plan</span><span>Professional</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Members</span><span>14</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">Region</span><span>US East</span></div>
            <div className="flex items-center justify-between"><span className="text-muted-foreground">SSO</span><span>Not configured</span></div>
          </div>
        </Card>
      </div>
    </div>
  );
}
