import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { investigations } from "@/lib/investigationData";

export const Route = createFileRoute("/dashboard/quality/sku-investigation/")({
  component: Page,
});

const severityTone: Record<string, string> = {
  Critical: "bg-rose-500/15 text-rose-600 border-rose-500/30",
  High: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  Medium: "bg-sky-500/15 text-sky-600 border-sky-500/30",
  Low: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};

const statusTone: Record<string, string> = {
  Open: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  "In Review": "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Resolved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
};

function Page() {
  return (
    <div>
      <PageHeader
        title="SKU investigations"
        subtitle="All active and recent quality investigations"
      />
      <Card className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-muted/40 text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3 font-medium">SKU ID</th>
                <th className="px-4 py-3 font-medium">Product</th>
                <th className="px-4 py-3 font-medium">Category</th>
                <th className="px-4 py-3 font-medium">Severity</th>
                <th className="px-4 py-3 font-medium">Return rate</th>
                <th className="px-4 py-3 font-medium">Status</th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {investigations.map((row) => (
                <tr key={row.skuId} className="hover:bg-muted/20">
                  <td className="px-4 py-3 font-mono text-xs">{row.skuId}</td>
                  <td className="px-4 py-3">{row.productName}</td>
                  <td className="px-4 py-3 text-muted-foreground">{row.category}</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={severityTone[row.severity]}>
                      {row.severity}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">{row.returnRate}%</td>
                  <td className="px-4 py-3">
                    <Badge variant="outline" className={statusTone[row.status]}>
                      {row.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button asChild size="sm" variant="outline">
                      <Link
                        to="/dashboard/quality/sku-investigation/$skuId"
                        params={{ skuId: row.skuId }}
                      >
                        View investigation
                      </Link>
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}