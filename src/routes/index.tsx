import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/site/PublicNav";
import { Footer } from "@/components/site/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowRight, Sparkles, Microscope, BarChart3, AlertTriangle, Plug, FileText, Brain, ShieldCheck, TrendingDown } from "lucide-react";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar } from "recharts";
import { returnTrend, issueDistribution } from "@/lib/mockData";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "ReturnSense — Stop losing revenue to product returns" },
      { name: "description", content: "AI returns intelligence that surfaces root cause by SKU and tells your team exactly what to fix this week." },
    ],
  }),
  component: Landing,
});

function Landing() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        {/* HERO */}
        <section className="relative overflow-hidden" style={{ background: "var(--hero-gradient)" }}>
          <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
            <div className="grid items-center gap-12 lg:grid-cols-2">
              <div>
                <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs text-muted-foreground backdrop-blur">
                  <Sparkles className="h-3 w-3" /> SKU Causality Engine
                </div>
                <h1 className="mt-5 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
                  Stop losing revenue to <span className="bg-clip-text text-transparent" style={{ backgroundImage: "var(--brand-gradient)" }}>product returns</span>
                </h1>
                <p className="mt-5 max-w-xl text-lg text-muted-foreground">
                  ReturnSense reads every return, complaint, and refund and tells your team — by SKU — exactly what to fix this week.
                </p>
                <div className="mt-7 flex flex-wrap gap-3">
                  <Button asChild size="lg"><Link to="/register">Start free trial <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
                  <Button asChild size="lg" variant="outline"><Link to="/features">See features</Link></Button>
                </div>
                <div className="mt-6 flex items-center gap-4 text-xs text-muted-foreground">
                  <span>No credit card required</span><span>•</span><span>SOC 2 in progress</span>
                </div>
              </div>
              <div>
                <DashboardPreview />
              </div>
            </div>
          </div>
        </section>

        {/* BENEFITS */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { icon: TrendingDown, title: "Cut return rate", body: "Customers see fit, defect, and shipping issues solved upstream." },
              { icon: Brain, title: "Root cause in minutes", body: "Failure fingerprints connect complaints to SKUs automatically." },
              { icon: ShieldCheck, title: "Margin recovery", body: "Recoverable savings surfaced weekly with confidence scoring." },
            ].map((b) => (
              <Card key={b.title} className="p-6">
                <b.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-base font-semibold">{b.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{b.body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* FEATURES */}
        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="mb-10 max-w-2xl">
              <h2 className="text-3xl font-semibold tracking-tight">Everything operations and quality need, in one place</h2>
              <p className="mt-2 text-muted-foreground">From SKU-level diagnosis to weekly action recommendations — purpose-built for the teams that own returns.</p>
            </div>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {[
                { icon: Microscope, t: "SKU Root Cause", d: "Trace returns to the exact failing component." },
                { icon: Brain, t: "Failure Fingerprinting", d: "Recurring defect patterns auto-detected." },
                { icon: BarChart3, t: "NLP Complaints", d: "Theme clusters from raw customer text." },
                { icon: Sparkles, t: "Weekly Action Center", d: "Ranked fixes, owners, and estimated savings." },
                { icon: AlertTriangle, t: "Real-time Alerts", d: "Spike detection across SKUs and channels." },
                { icon: Plug, t: "Plug-and-play integrations", d: "Shopify, Loop, Gorgias, Klaviyo, and more." },
              ].map((f) => (
                <Card key={f.t} className="p-6">
                  <f.icon className="h-5 w-5 text-primary" />
                  <div className="mt-3 text-base font-semibold">{f.t}</div>
                  <p className="mt-1 text-sm text-muted-foreground">{f.d}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* TESTIMONIALS */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { q: "We cut footwear returns by 22% in one quarter. The action center is genuinely actionable.", a: "Ops Lead, footwear DTC" },
              { q: "Replaced three dashboards and a weekly spreadsheet. The SKU causality view is the killer feature.", a: "VP Operations, apparel" },
              { q: "Quality team finally has a shared language with merch and supplier teams.", a: "Quality Director, home goods" },
            ].map((t, i) => (
              <Card key={i} className="p-6">
                <p className="text-sm text-foreground">“{t.q}”</p>
                <div className="mt-4 text-xs text-muted-foreground">{t.a}</div>
              </Card>
            ))}
          </div>
        </section>

        {/* PRICING PREVIEW */}
        <section className="bg-secondary/40 py-20">
          <div className="mx-auto max-w-5xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-3xl font-semibold tracking-tight">Pricing that scales with savings</h2>
            <p className="mt-2 text-muted-foreground">Start small. Most teams recoup their plan in under 30 days.</p>
            <div className="mt-8">
              <Button asChild size="lg"><Link to="/pricing">See plans <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
          <Card className="overflow-hidden p-10 text-center" style={{ background: "var(--brand-gradient)" }}>
            <h2 className="text-3xl font-semibold tracking-tight text-primary-foreground">Ready to see your causality engine?</h2>
            <p className="mt-2 text-primary-foreground/85">Spin up a workspace in under two minutes.</p>
            <div className="mt-6 flex justify-center gap-3">
              <Button asChild size="lg" variant="secondary"><Link to="/register">Create account</Link></Button>
              <Button asChild size="lg" variant="outline" className="border-primary-foreground/40 bg-transparent text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground"><Link to="/contact">Talk to us</Link></Button>
            </div>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}

function DashboardPreview() {
  return (
    <Card className="overflow-hidden p-0 shadow-2xl">
      <div className="flex items-center gap-1.5 border-b border-border bg-secondary/50 px-4 py-2">
        <span className="h-2.5 w-2.5 rounded-full bg-rose-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-amber-400/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-emerald-400/70" />
        <span className="ml-3 text-xs text-muted-foreground">returnsense.app / operations</span>
      </div>
      <div className="grid gap-3 p-4 sm:grid-cols-3">
        {[
          { l: "Return rate", v: "7.8%", d: "-0.4 wow" },
          { l: "Recoverable", v: "$412k", d: "+12.1%" },
          { l: "Alerts", v: "4", d: "2 critical" },
        ].map((k) => (
          <div key={k.l} className="rounded-md border border-border bg-background p-3">
            <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{k.l}</div>
            <div className="mt-1 text-lg font-semibold">{k.v}</div>
            <div className="text-[11px] text-muted-foreground">{k.d}</div>
          </div>
        ))}
      </div>
      <div className="px-4 pb-3">
        <div className="h-40 w-full">
          <ResponsiveContainer>
            <LineChart data={returnTrend} margin={{ left: -20, right: 8, top: 8 }}>
              <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
              <XAxis dataKey="month" tick={{ fontSize: 10 }} />
              <YAxis tick={{ fontSize: 10 }} />
              <Tooltip />
              <Line type="monotone" dataKey="returns" stroke="var(--primary)" strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
      <div className="border-t border-border px-4 py-3">
        <div className="mb-2 flex items-center justify-between">
          <span className="text-xs font-medium">Top issues</span>
          <FileText className="h-3.5 w-3.5 text-muted-foreground" />
        </div>
        <div className="h-28 w-full">
          <ResponsiveContainer>
            <BarChart data={issueDistribution.slice(0, 5)}>
              <XAxis dataKey="issue" tick={{ fontSize: 9 }} />
              <YAxis hide />
              <Tooltip />
              <Bar dataKey="count" fill="var(--primary)" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </Card>
  );
}
