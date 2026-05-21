import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { reports } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { FileText, Download } from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/dashboard/operations/reports")({ component: ReportsPage });

function ReportsPage() {
  return (
    <div>
      <PageHeader title="Reports" subtitle="Downloadable digests and exports." />
      <Card className="p-0"><table className="w-full text-sm">
        <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
          <th className="px-4 py-3">Report</th><th>Period</th><th>Type</th><th>Size</th><th></th>
        </tr></thead>
        <tbody>{reports.map((r) => (
          <tr key={r.name} className="border-b last:border-0">
            <td className="px-4 py-3"><div className="flex items-center gap-2"><FileText className="h-4 w-4 text-muted-foreground" />{r.name}</div></td>
            <td>{r.period}</td><td><span className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">{r.type}</span></td><td>{r.size}</td>
            <td className="px-4 text-right"><Button variant="outline" size="sm" onClick={() => toast.success(`${r.name} download started (mock)`)}><Download className="mr-1 h-3.5 w-3.5" /> Download</Button></td>
          </tr>))}</tbody>
      </table></Card>
    </div>
  );
}
