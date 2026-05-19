import { createFileRoute } from "@tanstack/react-router";
import { Kpi, PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { kpis, failureFingerprints, issueDistribution } from "@/lib/mockData";
import { Microscope, ShieldAlert, Bug, FileSearch } from "lucide-react";
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

export const Route = createFileRoute("/dashboard/quality/")({
  component: QualityDash,
});

function QualityDash() {
  return (
    <div>
      <PageHeader title="Quality overview" subtitle="Defect patterns, fingerprints, and investigations." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Flagged issues" value={String(kpis.flaggedIssues)} delta="+6 this week" icon={ShieldAlert} />
        <Kpi label="Defect trend" value={`${kpis.defectTrendDelta}%`} delta="-12.4% mom" icon={Bug} />
        <Kpi label="Open investigations" value={String(kpis.investigationsOpen)} delta="3 critical" icon={FileSearch} />
        <Kpi label="Top fingerprints" value="5" delta="2 new" icon={Microscope} />
      </div>
      <div className="mt-6 grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 text-sm font-medium">Issue severity</div>
          <div className="h-72">
            <ResponsiveContainer>
              <BarChart data={issueDistribution}>
                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                <XAxis dataKey="issue" tick={{ fontSize: 11 }} />
                <YAxis tick={{ fontSize: 11 }} />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>
        <Card className="p-5">
          <div className="mb-3 text-sm font-medium">Top failure fingerprints</div>
          <div className="space-y-3">
            {failureFingerprints.slice(0, 4).map((f) => (
              <div key={f.id} className="rounded-md border border-border p-3">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span>{f.pattern}</span><span className="text-xs text-muted-foreground">{Math.round(f.confidence * 100)}%</span>
                </div>
                <div className="mt-1 text-xs text-muted-foreground">{f.skus} SKUs · {f.category}</div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
