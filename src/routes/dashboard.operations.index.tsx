import { createFileRoute } from "@tanstack/react-router";
import { Kpi, PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { kpis, returnTrend, categoryBreakdown, topSkus, alerts } from "@/lib/mockData";
import { Package, TrendingDown, DollarSign, Coins, AlertTriangle } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, PieChart, Pie, Cell, Legend } from "recharts";
import { Badge } from "@/components/ui/badge";

export const Route = createFileRoute("/dashboard/operations/")({
  component: OpsDash,
});

const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981"];

function OpsDash() {
  return (
    <div>
      <PageHeader title="Operations overview" subtitle="Last 30 days · all SKUs" />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Total returns" value={kpis.totalReturns.toLocaleString()} delta="+4.2% mom" icon={Package} />
        <Kpi label="Return rate" value={`${kpis.returnRate}%`} delta="-0.4%" icon={TrendingDown} />
        <Kpi label="Revenue loss" value={`$${(kpis.revenueLoss / 1000).toFixed(0)}k`} delta="+2.1%" icon={DollarSign} />
        <Kpi label="Recoverable" value={`$${(kpis.recoverableSavings / 1000).toFixed(0)}k`} delta="+12.1%" icon={Coins} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 text-sm font-medium">Returns trend</div>
          <div className="h-72">
            <ResponsiveContainer>
              <LineChart data={returnTrend}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="month" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Line type="monotone" dataKey="returns" stroke="var(--primary)" strokeWidth={2} dot={{ r: 3 }} />
                <Line type="monotone" dataKey="rate" stroke="#8b5cf6" strokeWidth={2} dot={{ r: 3 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-3 text-sm font-medium">Category mix</div>
          <div className="h-72">
            <ResponsiveContainer>
              <PieChart>
                <Pie data={categoryBreakdown} dataKey="value" innerRadius={50} outerRadius={90}>
                  {categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}
                </Pie>
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 flex items-center justify-between">
            <div className="text-sm font-medium">Top problematic SKUs</div>
            <Badge variant="secondary">Live</Badge>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
                  <th className="py-2">SKU</th><th>Name</th><th>Returns</th><th>Rate</th><th>Severity</th><th>Savings</th>
                </tr>
              </thead>
              <tbody>
                {topSkus.map((s) => (
                  <tr key={s.sku} className="border-b last:border-0">
                    <td className="py-2 font-mono text-xs">{s.sku}</td>
                    <td>{s.name}</td>
                    <td>{s.returns}</td>
                    <td>{s.rate}%</td>
                    <td><SeverityBadge level={s.severity} /></td>
                    <td>${s.savings.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-3 flex items-center gap-2 text-sm font-medium"><AlertTriangle className="h-4 w-4 text-amber-500" /> Active alerts</div>
          <div className="space-y-3">
            {alerts.slice(0, 4).map((a) => (
              <div key={a.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{a.title}</div>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground">{a.time}</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{a.body}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}

export function SeverityBadge({ level }: { level: string }) {
  const map: Record<string, string> = {
    Critical: "bg-rose-100 text-rose-700",
    High: "bg-amber-100 text-amber-700",
    Medium: "bg-blue-100 text-blue-700",
    Low: "bg-emerald-100 text-emerald-700",
  };
  return <span className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-medium ${map[level] ?? "bg-muted text-muted-foreground"}`}>{level}</span>;
}
