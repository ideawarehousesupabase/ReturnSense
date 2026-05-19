import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { actionCenter } from "@/lib/mockData";
import { SeverityBadge } from "./dashboard.operations.index";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/dashboard/operations/action-center")({ component: ActionCenterPage });

function ActionCenterPage() {
  return (
    <div>
      <PageHeader title="Action Center" subtitle="Weekly ranked fixes, owners, and estimated savings.">
        <Button variant="outline" size="sm">Export</Button><Button size="sm">Generate new</Button>
      </PageHeader>
      <Card className="p-0">
        <div className="overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="px-4 py-3">SKU</th><th>Issue</th><th>Recommended fix</th><th>Severity</th><th>Est. savings</th><th>Status</th>
          </tr></thead>
          <tbody>{actionCenter.map((r) => (
            <tr key={r.sku} className="border-b last:border-0">
              <td className="px-4 py-3 font-mono text-xs">{r.sku}</td><td>{r.issue}</td>
              <td className="text-muted-foreground">{r.fix}</td><td><SeverityBadge level={r.severity} /></td>
              <td>${r.savings.toLocaleString()}</td>
              <td><span className="rounded-full bg-secondary px-2 py-0.5 text-[11px]">{r.status}</span></td>
            </tr>))}</tbody>
        </table></div>
      </Card>
    </div>
  );
}
