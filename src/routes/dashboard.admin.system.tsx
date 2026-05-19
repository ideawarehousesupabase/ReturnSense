import { createFileRoute } from "@tanstack/react-router";
import { Kpi, PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { adminStats, integrations } from "@/lib/mockData";
import { Activity, ServerCog, Plug, Database } from "lucide-react";
export const Route = createFileRoute("/dashboard/admin/system")({ component: Page });
function Page() {
  return (
    <div>
      <PageHeader title="System overview" subtitle="Platform health and connector status." />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Kpi label="Uptime (30d)" value={`${adminStats.uptime}%`} icon={Activity} delta="SLA met" />
        <Kpi label="Servers" value="14" delta="all healthy" icon={ServerCog} />
        <Kpi label="Active integrations" value={String(integrations.filter((i) => i.status === "Connected").length)} icon={Plug} />
        <Kpi label="Data warehouse" value="Healthy" icon={Database} />
      </div>
      <Card className="mt-6 p-5"><div className="mb-3 text-sm font-medium">Connector status</div>
        <table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-2">Connector</th><th>Status</th><th>Health</th><th>Last sync</th>
          </tr></thead>
          <tbody>{integrations.map((i) => (
            <tr key={i.name} className="border-b last:border-0">
              <td className="py-2">{i.name}</td><td>{i.status}</td><td>{i.health}</td><td className="text-muted-foreground">{i.lastSync}</td>
            </tr>))}</tbody>
        </table>
      </Card>
    </div>
  );
}
