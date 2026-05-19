import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { returnTrend, categoryBreakdown, issueDistribution } from "@/lib/mockData";
import { AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";

export const Route = createFileRoute("/dashboard/operations/analytics")({ component: AnalyticsPage });
const COLORS = ["#3b82f6", "#6366f1", "#8b5cf6", "#06b6d4", "#10b981", "#f59e0b"];

function AnalyticsPage() {
  return (
    <div>
      <PageHeader title="Returns analytics" subtitle="Trends, categories, and issue distribution." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5"><div className="mb-2 text-sm font-medium">Volume trend</div>
          <div className="h-72"><ResponsiveContainer><AreaChart data={returnTrend}>
            <defs><linearGradient id="g1" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="var(--primary)" stopOpacity={0.4} /><stop offset="100%" stopColor="var(--primary)" stopOpacity={0} /></linearGradient></defs>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="month" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip />
            <Area type="monotone" dataKey="returns" stroke="var(--primary)" fill="url(#g1)" strokeWidth={2} />
          </AreaChart></ResponsiveContainer></div>
        </Card>
        <Card className="p-5"><div className="mb-2 text-sm font-medium">Category breakdown</div>
          <div className="h-72"><ResponsiveContainer><PieChart>
            <Pie data={categoryBreakdown} dataKey="value" outerRadius={100} label>{categoryBreakdown.map((_, i) => <Cell key={i} fill={COLORS[i % COLORS.length]} />)}</Pie>
            <Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
          </PieChart></ResponsiveContainer></div>
        </Card>
        <Card className="p-5 lg:col-span-2"><div className="mb-2 text-sm font-medium">Issue distribution</div>
          <div className="h-72"><ResponsiveContainer><BarChart data={issueDistribution}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="issue" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip />
            <Bar dataKey="count" fill="var(--primary)" radius={[6, 6, 0, 0]} />
          </BarChart></ResponsiveContainer></div>
        </Card>
      </div>
    </div>
  );
}
