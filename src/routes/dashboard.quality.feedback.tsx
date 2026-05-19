import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { sentimentTrend, complaintClusters, customerComments } from "@/lib/mockData";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, Legend } from "recharts";
export const Route = createFileRoute("/dashboard/quality/feedback")({ component: Page });
function Page() {
  return (
    <div>
      <PageHeader title="Customer feedback" subtitle="NLP clusters, sentiment, and recent verbatims." />
      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="p-5"><div className="mb-3 text-sm font-medium">Sentiment trend</div>
          <div className="h-72"><ResponsiveContainer><LineChart data={sentimentTrend}>
            <CartesianGrid strokeDasharray="3 3" opacity={0.3} /><XAxis dataKey="week" tick={{ fontSize: 11 }} /><YAxis tick={{ fontSize: 11 }} /><Tooltip /><Legend wrapperStyle={{ fontSize: 11 }} />
            <Line type="monotone" dataKey="positive" stroke="#10b981" strokeWidth={2} />
            <Line type="monotone" dataKey="neutral" stroke="#9ca3af" strokeWidth={2} />
            <Line type="monotone" dataKey="negative" stroke="#ef4444" strokeWidth={2} />
          </LineChart></ResponsiveContainer></div>
        </Card>
        <Card className="p-5"><div className="mb-3 text-sm font-medium">Complaint clusters</div>
          <div className="space-y-2">{complaintClusters.map((c) => (
            <div key={c.keyword} className="flex items-center justify-between rounded-md border border-border px-3 py-2">
              <div className="text-sm">"{c.keyword}"</div>
              <div className="flex items-center gap-3 text-xs text-muted-foreground"><span>{c.mentions} mentions</span><span className={c.sentiment > 0 ? "text-emerald-600" : "text-rose-600"}>{c.sentiment > 0 ? "+" : ""}{c.sentiment.toFixed(2)}</span></div>
            </div>))}</div>
        </Card>
        <Card className="p-5 lg:col-span-2"><div className="mb-3 text-sm font-medium">Recent verbatims</div>
          <div className="grid gap-3 md:grid-cols-2">{customerComments.map((c, i) => (
            <div key={i} className="rounded-md border border-border p-3 text-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{c.name}</span><span className="font-mono">{c.sku}</span></div>
              <p className="mt-2">{c.text}</p>
              <span className={`mt-2 inline-block rounded-full px-2 py-0.5 text-[10px] ${c.sentiment === "positive" ? "bg-emerald-100 text-emerald-700" : c.sentiment === "negative" ? "bg-rose-100 text-rose-700" : "bg-muted text-muted-foreground"}`}>{c.sentiment}</span>
            </div>))}</div>
        </Card>
      </div>
    </div>
  );
}
