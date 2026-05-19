import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { investigationTimeline, customerComments, topSkus } from "@/lib/mockData";
export const Route = createFileRoute("/dashboard/quality/sku-investigation")({ component: Page });
function Page() {
  const sku = topSkus[1];
  return (
    <div>
      <PageHeader title="SKU investigation" subtitle={`${sku.sku} · ${sku.name}`} />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2"><div className="mb-3 text-sm font-medium">Investigation timeline</div>
          <ol className="relative space-y-4 border-l border-border pl-4">{investigationTimeline.map((t, i) => (
            <li key={i}><div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-primary" /><div className="text-xs text-muted-foreground">{t.date}</div><div className="text-sm">{t.event}</div></li>
          ))}</ol>
        </Card>
        <Card className="p-5"><div className="mb-3 text-sm font-medium">SKU details</div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between"><dt className="text-muted-foreground">SKU</dt><dd className="font-mono text-xs">{sku.sku}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Returns (30d)</dt><dd>{sku.returns}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Return rate</dt><dd>{sku.rate}%</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Recoverable</dt><dd>${sku.savings.toLocaleString()}</dd></div>
            <div className="flex justify-between"><dt className="text-muted-foreground">Severity</dt><dd>{sku.severity}</dd></div>
          </dl>
        </Card>
        <Card className="p-5 lg:col-span-3"><div className="mb-3 text-sm font-medium">Recent complaint summaries</div>
          <div className="grid gap-3 md:grid-cols-2">{customerComments.map((c, i) => (
            <div key={i} className="rounded-md border border-border p-3 text-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground"><span>{c.name}</span><span className="font-mono">{c.sku}</span></div>
              <p className="mt-2">{c.text}</p>
            </div>))}</div>
        </Card>
      </div>
    </div>
  );
}
