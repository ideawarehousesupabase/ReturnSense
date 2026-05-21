import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  ArrowLeft,
  Sparkles,
  ShieldAlert,
  Lightbulb,
  TrendingUp,
  MessageSquare,
} from "lucide-react";
import { getInvestigation } from "@/lib/investigationData";

export const Route = createFileRoute("/dashboard/quality/sku-investigation/$skuId")({
  component: Page,
  notFoundComponent: NotFound,
});

const severityTone: Record<string, string> = {
  Critical: "bg-rose-500/15 text-rose-600 border-rose-500/30",
  High: "bg-amber-500/15 text-amber-600 border-amber-500/30",
  Medium: "bg-sky-500/15 text-sky-600 border-sky-500/30",
  Low: "bg-emerald-500/15 text-emerald-600 border-emerald-500/30",
};

const outcomeStatusTone: Record<string, string> = {
  Open: "bg-rose-500/10 text-rose-600 border-rose-500/30",
  "In Progress": "bg-amber-500/10 text-amber-600 border-amber-500/30",
  Resolved: "bg-emerald-500/10 text-emerald-600 border-emerald-500/30",
};

function NotFound() {
  return (
    <div className="grid place-items-center py-20 text-sm text-muted-foreground">
      Investigation not found.
    </div>
  );
}

function Page() {
  const { skuId } = Route.useParams();
  const inv = getInvestigation(skuId);
  if (!inv) throw notFound();

  return (
    <div className="space-y-6">
      <div>
        <Button asChild variant="ghost" size="sm" className="mb-3 -ml-2">
          <Link to="/dashboard/quality/sku-investigation">
            <ArrowLeft className="mr-1 h-4 w-4" /> All investigations
          </Link>
        </Button>
        <PageHeader
          title={`SKU investigation · ${inv.skuId}`}
          subtitle={`${inv.productName} · ${inv.category}`}
        >
          <Badge variant="outline" className={severityTone[inv.severity]}>
            {inv.severity} severity
          </Badge>
          <Badge variant="outline" className={outcomeStatusTone[inv.outcome.status]}>
            {inv.outcome.status}
          </Badge>
        </PageHeader>
      </div>

      {/* Top row: timeline + SKU details */}
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-5 lg:col-span-2">
          <div className="mb-3 text-sm font-medium">Investigation timeline</div>
          <ol className="relative space-y-4 border-l border-border pl-4">
            {inv.timeline.map((t, i) => (
              <li key={i} className="relative">
                <div className="absolute -left-[21px] mt-1 h-3 w-3 rounded-full bg-primary" />
                <div className="text-xs text-muted-foreground">{t.date}</div>
                <div className="text-sm">{t.event}</div>
              </li>
            ))}
          </ol>
        </Card>
        <Card className="p-5">
          <div className="mb-3 text-sm font-medium">SKU details</div>
          <dl className="space-y-2 text-sm">
            <div className="flex justify-between">
              <dt className="text-muted-foreground">SKU</dt>
              <dd className="font-mono text-xs">{inv.skuId}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Returns (30d)</dt>
              <dd>{inv.details.returns30d}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Return rate</dt>
              <dd>{inv.returnRate}%</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Recoverable</dt>
              <dd>${inv.details.recoverable.toLocaleString()}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-muted-foreground">Severity</dt>
              <dd>{inv.severity}</dd>
            </div>
          </dl>
        </Card>
      </div>

      {/* Complaint summaries */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <MessageSquare className="h-4 w-4 text-muted-foreground" />
          Recent complaint summaries
        </div>
        <div className="grid gap-3 md:grid-cols-2">
          {inv.complaints.map((c, i) => (
            <div key={i} className="rounded-md border border-border p-3 text-sm">
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{c.name}</span>
                <span className="font-mono">{inv.skuId}</span>
              </div>
              <p className="mt-2">{c.text}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Defect evidence */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <ShieldAlert className="h-4 w-4 text-rose-500" />
          Detected defects
          <span className="text-xs font-normal text-muted-foreground">
            · AI-detected issue evidence
          </span>
        </div>
        <div className="grid gap-3 md:grid-cols-3">
          {inv.defects.map((d, i) => (
            <div key={i} className="rounded-md border border-border p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-medium">{d.description}</p>
                <Badge variant="outline" className={severityTone[d.severity]}>
                  {d.severity}
                </Badge>
              </div>
              <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                <div className="flex justify-between">
                  <span>Frequency</span>
                  <span className="font-medium text-foreground">{d.frequency}</span>
                </div>
                <div>
                  <div className="mb-1 flex justify-between">
                    <span>Confidence</span>
                    <span className="font-medium text-foreground">{d.confidence}%</span>
                  </div>
                  <Progress value={d.confidence} className="h-1.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Root cause */}
      <Card
        className="relative overflow-hidden border-primary/30 p-5"
        style={{ background: "linear-gradient(135deg, color-mix(in oklab, var(--primary) 8%, transparent), transparent 60%)" }}
      >
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Sparkles className="h-4 w-4 text-primary" />
          AI root cause analysis
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Likely source
            </div>
            <div className="mt-1 text-base font-semibold">{inv.rootCause.source}</div>
            <div className="mt-4 text-xs uppercase tracking-wider text-muted-foreground">
              Contributing factors
            </div>
            <ul className="mt-2 space-y-1.5 text-sm">
              {inv.rootCause.factors.map((f, i) => (
                <li key={i} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {f}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-md border border-border bg-background/60 p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">
              Confidence score
            </div>
            <div className="mt-1 text-3xl font-semibold tracking-tight">
              {inv.rootCause.confidence}%
            </div>
            <Progress value={inv.rootCause.confidence} className="mt-3 h-1.5" />
          </div>
        </div>
      </Card>

      {/* AI recommendations */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <Lightbulb className="h-4 w-4 text-amber-500" />
          AI recommended actions
        </div>
        <div className="grid gap-2 md:grid-cols-2">
          {inv.recommendations.map((r, i) => (
            <div
              key={i}
              className="flex items-center justify-between rounded-md border border-border p-3 text-sm"
            >
              <div className="flex items-center gap-3">
                <div className="grid h-7 w-7 place-items-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                  {i + 1}
                </div>
                {r}
              </div>
              <Button size="sm" variant="ghost">
                Apply
              </Button>
            </div>
          ))}
        </div>
      </Card>

      {/* Business outcome */}
      <Card className="p-5">
        <div className="mb-3 flex items-center gap-2 text-sm font-medium">
          <TrendingUp className="h-4 w-4 text-emerald-500" />
          Investigation outcome
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <Stat label="Revenue at risk" value={`$${inv.outcome.revenueAtRisk.toLocaleString()}`} />
          <Stat
            label="Recoverable revenue"
            value={`$${inv.outcome.recoverableRevenue.toLocaleString()}`}
            tone="positive"
          />
          <Stat label="Units prevented" value={inv.outcome.unitsPrevented.toLocaleString()} />
          <Stat
            label="Projected return rate"
            value={`${inv.outcome.projectedReductionFrom}% → ${inv.outcome.projectedReductionTo}%`}
            tone="positive"
          />
          <div className="rounded-md border border-border p-4">
            <div className="text-xs uppercase tracking-wider text-muted-foreground">Status</div>
            <div className="mt-2">
              <Badge variant="outline" className={outcomeStatusTone[inv.outcome.status]}>
                {inv.outcome.status}
              </Badge>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

function Stat({
  label,
  value,
  tone,
}: {
  label: string;
  value: string;
  tone?: "positive";
}) {
  return (
    <div className="rounded-md border border-border p-4">
      <div className="text-xs uppercase tracking-wider text-muted-foreground">{label}</div>
      <div
        className={`mt-2 text-lg font-semibold tracking-tight ${
          tone === "positive" ? "text-emerald-600" : ""
        }`}
      >
        {value}
      </div>
    </div>
  );
}