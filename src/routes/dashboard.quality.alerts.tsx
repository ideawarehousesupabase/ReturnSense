import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { alerts } from "@/lib/mockData";
import { ShieldAlert } from "lucide-react";
export const Route = createFileRoute("/dashboard/quality/alerts")({ component: Page });
function Page() {
  return (
    <div>
      <PageHeader title="Critical defect alerts" subtitle="High-confidence patterns requiring investigation." />
      <div className="space-y-3">{alerts.filter((a) => a.level !== "info").map((a) => (
        <Card key={a.id} className="flex items-start gap-3 p-4">
          <div className="grid h-9 w-9 place-items-center rounded-md border border-rose-200 bg-rose-50 text-rose-700"><ShieldAlert className="h-4 w-4" /></div>
          <div className="flex-1"><div className="flex items-center justify-between"><div className="text-sm font-medium">{a.title}</div><span className="text-xs text-muted-foreground">{a.time}</span></div><p className="mt-1 text-sm text-muted-foreground">{a.body}</p></div>
        </Card>))}</div>
    </div>
  );
}
