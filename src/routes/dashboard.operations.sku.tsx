import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { topSkus } from "@/lib/mockData";
import { SeverityBadge } from "./dashboard.operations.index";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";

export const Route = createFileRoute("/dashboard/operations/sku")({ component: SkuPage });

function SkuPage() {
  const [q, setQ] = useState(""); const [sev, setSev] = useState("all");
  const rows = topSkus.filter((r) =>
    (q ? (r.sku.toLowerCase().includes(q.toLowerCase()) || r.name.toLowerCase().includes(q.toLowerCase())) : true) &&
    (sev === "all" ? true : r.severity === sev));
  return (
    <div>
      <PageHeader title="SKU performance" subtitle="Risk scoring and trends per SKU." />
      <Card className="p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Input placeholder="Search SKU or name" value={q} onChange={(e) => setQ(e.target.value)} className="max-w-xs" />
          <Select value={sev} onValueChange={setSev}>
            <SelectTrigger className="w-40"><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All severity</SelectItem><SelectItem value="High">High</SelectItem>
              <SelectItem value="Medium">Medium</SelectItem><SelectItem value="Low">Low</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 overflow-x-auto"><table className="w-full text-sm">
          <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
            <th className="py-2">SKU</th><th>Name</th><th>Returns</th><th>Rate</th><th>Severity</th><th>Issue score</th>
          </tr></thead>
          <tbody>{rows.length === 0 ? (<tr><td colSpan={6} className="py-10 text-center text-muted-foreground">No SKUs match your filters.</td></tr>) : rows.map((s) => (
            <tr key={s.sku} className="border-b last:border-0">
              <td className="py-2 font-mono text-xs">{s.sku}</td><td>{s.name}</td>
              <td>{s.returns}</td><td>{s.rate}%</td><td><SeverityBadge level={s.severity} /></td>
              <td><div className="h-1.5 w-32 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: `${Math.min(100, s.rate * 5)}%` }} /></div></td>
            </tr>))}</tbody>
        </table></div>
      </Card>
    </div>
  );
}
