import { Card } from "@/components/ui/card";
import type { LucideIcon } from "lucide-react";

export function Kpi({ label, value, delta, icon: Icon }: { label: string; value: string; delta?: string; icon?: LucideIcon }) {
  const positive = delta?.startsWith("+");
  const negative = delta?.startsWith("-");
  return (
    <Card className="p-5">
      <div className="flex items-center justify-between">
        <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
        {Icon ? <Icon className="h-4 w-4 text-muted-foreground" /> : null}
      </div>
      <div className="mt-2 text-2xl font-semibold tracking-tight">{value}</div>
      {delta ? (
        <div className={`mt-1 text-xs ${positive ? "text-emerald-600" : negative ? "text-rose-600" : "text-muted-foreground"}`}>{delta}</div>
      ) : null}
    </Card>
  );
}

export function PageHeader({ title, subtitle, children }: { title: string; subtitle?: string; children?: React.ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle ? <p className="text-sm text-muted-foreground">{subtitle}</p> : null}
      </div>
      {children ? <div className="flex items-center gap-2">{children}</div> : null}
    </div>
  );
}
