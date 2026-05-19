import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { integrations } from "@/lib/mockData";
import { Button } from "@/components/ui/button";
import { Plug, CheckCircle2, XCircle } from "lucide-react";

export const Route = createFileRoute("/dashboard/operations/integrations")({ component: IntegrationsPage });

function IntegrationsPage() {
  return (
    <div>
      <PageHeader title="Integrations" subtitle="Connect data sources for SKU causality." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {integrations.map((i) => {
          const connected = i.status === "Connected";
          return (
            <Card key={i.name} className="p-5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="grid h-9 w-9 place-items-center rounded-md bg-secondary"><Plug className="h-4 w-4" /></div>
                  <div><div className="text-sm font-medium">{i.name}</div><div className="text-[11px] text-muted-foreground">Last sync: {i.lastSync}</div></div>
                </div>
                {connected ? <CheckCircle2 className="h-4 w-4 text-emerald-500" /> : <XCircle className="h-4 w-4 text-muted-foreground" />}
              </div>
              <div className="mt-4 flex items-center justify-between">
                <span className={`rounded-full px-2 py-0.5 text-[11px] ${connected ? "bg-emerald-100 text-emerald-700" : "bg-muted text-muted-foreground"}`}>{i.status}</span>
                <Button variant="outline" size="sm">{connected ? "Manage" : "Connect"}</Button>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
