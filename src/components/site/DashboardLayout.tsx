import { Link, Outlet, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect } from "react";
import { useAuth, type Role } from "@/lib/auth";
import { Activity, LayoutDashboard, ListChecks, PackageSearch, BarChart3, Bell, Plug, FileText, Settings, Users, Server, CreditCard, ShieldAlert, Microscope, MessageSquare, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";

type NavItem = { to: string; label: string; icon: typeof LayoutDashboard };

const navByRole: Record<Role, NavItem[]> = {
  operations: [
    { to: "/dashboard/operations", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/operations/action-center", label: "Action Center", icon: ListChecks },
    { to: "/dashboard/operations/sku", label: "SKU Performance", icon: PackageSearch },
    { to: "/dashboard/operations/analytics", label: "Returns Analytics", icon: BarChart3 },
    { to: "/dashboard/operations/alerts", label: "Alerts", icon: Bell },
    { to: "/dashboard/operations/integrations", label: "Integrations", icon: Plug },
    { to: "/dashboard/operations/reports", label: "Reports", icon: FileText },
    { to: "/dashboard/operations/settings", label: "Settings", icon: Settings },
  ],
  quality: [
    { to: "/dashboard/quality", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/quality/failure-analysis", label: "Failure Analysis", icon: Microscope },
    { to: "/dashboard/quality/sku-investigation", label: "SKU Investigation", icon: PackageSearch },
    { to: "/dashboard/quality/feedback", label: "Customer Feedback", icon: MessageSquare },
    { to: "/dashboard/quality/alerts", label: "Alerts", icon: ShieldAlert },
    { to: "/dashboard/quality/settings", label: "Settings", icon: Settings },
  ],
  admin: [
    { to: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
    { to: "/dashboard/admin/users", label: "User Management", icon: Users },
    { to: "/dashboard/admin/system", label: "System Overview", icon: Server },
    { to: "/dashboard/admin/billing", label: "Billing", icon: CreditCard },
    { to: "/dashboard/admin/settings", label: "Settings", icon: Settings },
  ],
};

const roleLabels: Record<Role, string> = {
  operations: "Operations",
  quality: "Quality",
  admin: "Admin",
};

export function DashboardLayout({ role }: { role: Role }) {
  const { user, ready, logout } = useAuth();
  const nav = useNavigate();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    if (!ready) return;
    if (!user) {
      nav({ to: "/login" });
    } else if (user.role !== role) {
      nav({ to: "/dashboard/operations" });
    }
  }, [ready, user, role, nav]);

  if (!ready || !user || user.role !== role) {
    return <div className="grid min-h-screen place-items-center text-sm text-muted-foreground">Loading…</div>;
  }

  const items = navByRole[role];

  return (
    <div className="flex min-h-screen bg-background">
      <aside className="hidden w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar text-sidebar-foreground md:flex">
        <div className="flex h-16 items-center gap-2 border-b border-sidebar-border px-5">
          <div className="grid h-8 w-8 place-items-center rounded-lg" style={{ background: "var(--brand-gradient)" }}>
            <Activity className="h-4 w-4 text-primary-foreground" />
          </div>
          <div>
            <div className="text-sm font-semibold leading-none">ReturnSense</div>
            <div className="mt-1 text-[11px] uppercase tracking-wider text-sidebar-foreground/60">{roleLabels[role]}</div>
          </div>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {items.map((it) => {
            const Icon = it.icon;
            const active = path === it.to;
            return (
              <Link
                key={it.to}
                to={it.to}
                className={`flex items-center gap-3 rounded-md px-3 py-2 text-sm transition-colors ${
                  active ? "bg-sidebar-accent text-sidebar-foreground" : "text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"
                }`}
              >
                <Icon className="h-4 w-4" />
                {it.label}
              </Link>
            );
          })}
        </nav>
        <div className="border-t border-sidebar-border p-3">
          <div className="rounded-md bg-sidebar-accent/40 p-3">
            <div className="text-xs font-medium">{user.fullName}</div>
            <div className="truncate text-[11px] text-sidebar-foreground/60">{user.email}</div>
            <button
              onClick={() => { logout(); nav({ to: "/login" }); }}
              className="mt-2 inline-flex items-center gap-1 text-[11px] text-sidebar-foreground/70 hover:text-sidebar-foreground"
            >
              <LogOut className="h-3 w-3" /> Sign out
            </button>
          </div>
        </div>
      </aside>
      <main className="flex-1">
        <div className="flex h-16 items-center justify-between border-b border-border px-6">
          <div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground">{roleLabels[role]} workspace</div>
            <div className="text-sm font-medium">Welcome back, {user.fullName.split(" ")[0]}</div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={() => { logout(); nav({ to: "/login" }); }}>Logout</Button>
          </div>
        </div>
        <div className="p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
