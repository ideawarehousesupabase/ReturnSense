import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { failureFingerprints } from "@/lib/mockData";
export const Route = createFileRoute("/dashboard/quality/failure-analysis")({ component: Page });
function Page() {
  return (
    <div>
      <PageHeader title="Failure analysis" subtitle="Detected fingerprints with confidence scores." />
      <Card className="p-0"><table className="w-full text-sm">
        <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
          <th className="px-4 py-3">ID</th><th>Pattern</th><th>Category</th><th>SKUs</th><th>Confidence</th>
        </tr></thead>
        <tbody>{failureFingerprints.map((f) => (
          <tr key={f.id} className="border-b last:border-0">
            <td className="px-4 py-3 font-mono text-xs">{f.id}</td><td>{f.pattern}</td>
            <td><span className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">{f.category}</span></td><td>{f.skus}</td>
            <td><div className="flex items-center gap-2"><div className="h-1.5 w-28 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${f.confidence * 100}%` }} /></div><span className="text-xs text-muted-foreground">{Math.round(f.confidence * 100)}%</span></div></td>
          </tr>))}</tbody>
      </table></Card>
    </div>
  );
}
