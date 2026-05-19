import { createFileRoute } from "@tanstack/react-router";
import { Kpi, PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { adminStats, usageOverTime } from "@/lib/mockData";
import { Users, Building2, LayoutDashboard, CreditCard } from "lucide-react";
import { AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/dashboard/admin/")({
  component: AdminDash,
});

function AdminDash() {
  return (
    <div>
      <PageHeader title="Admin overview" subtitle="Platform usage and subscription health." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total users" value={adminStats.totalUsers.toLocaleString()} delta="+38 wow" icon={Users} />
        <Kpi label="Accounts" value={String(adminStats.totalAccounts)} delta="+2 mom" icon={Building2} />
        <Kpi label="Active dashboards" value={String(adminStats.activeDashboards)} delta="+11.4%" icon={LayoutDashboard} />
        <Kpi label="Subscriptions" value={String(adminStats.subscriptions)} delta="94% retention" icon={CreditCard} />
      </div>
      <Card className="mt-6 p-5">
        <div className="mb-3 text-sm font-medium">Usage</div>
        <div className="h-80">
          <ResponsiveContainer>
            <AreaChart data={usageOverTime}>
              <defs>
                <linearGradient id="api" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient>
                <linearGradient id="dash" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#8b5cf6" stopOpacity={0.4} /><stop offset="100%" stopColor="#8b5cf6" stopOpacity={0} /></linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="day" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
              <Area type="monotone" dataKey="api" name="API calls" stroke="var(--primary)" fill="url(#api)" />
              <Area type="monotone" dataKey="dash" name="Dashboard views" stroke="#8b5cf6" fill="url(#dash)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </Card>
    </div>
  );
}
