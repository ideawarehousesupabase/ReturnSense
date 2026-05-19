import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { alerts } from "@/lib/mockData";
import { AlertTriangle, Bell, Info } from "lucide-react";

export const Route = createFileRoute("/dashboard/operations/alerts")({ component: AlertsPage });
const iconByLevel = { critical: AlertTriangle, warning: Bell, info: Info } as const;
const styleByLevel: Record<string, string> = {
  critical: "border-rose-200 bg-rose-50 text-rose-700",
  warning: "border-amber-200 bg-amber-50 text-amber-700",
  info: "border-blue-200 bg-blue-50 text-blue-700",
};

function AlertsPage() {
  return (
    <div>
      <PageHeader title="Alerts" subtitle="Real-time spike detection and critical SKU warnings." />
      <div className="space-y-3">
        {alerts.map((a) => {
          const Icon = iconByLevel[a.level as keyof typeof iconByLevel] ?? Info;
          return (
            <Card key={a.id} className="flex items-start gap-3 p-4">
              <div className={`grid h-9 w-9 place-items-center rounded-md border ${styleByLevel[a.level]}`}><Icon className="h-4 w-4" /></div>
              <div className="flex-1">
                <div className="flex items-center justify-between"><div className="text-sm font-medium">{a.title}</div><span className="text-xs text-muted-foreground">{a.time}</span></div>
                <p className="mt-1 text-sm text-muted-foreground">{a.body}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
