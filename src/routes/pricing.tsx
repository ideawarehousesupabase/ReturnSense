import { createFileRoute, Link } from "@tanstack/react-router";
import { PublicNav } from "@/components/site/PublicNav";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";

export const Route = createFileRoute("/pricing")({
  head: () => ({ meta: [{ title: "Pricing — ReturnSense" }, { name: "description", content: "Plans for Starter, Professional, and Enterprise teams." }] }),
  component: PricingPage,
});

const plans = [
  { name: "Starter", price: "$299", period: "/mo", desc: "For lean teams getting visibility into returns.", features: ["Up to 5k returns/mo", "1 integration", "Weekly action center", "Email support"], cta: "Start free trial" },
  { name: "Professional", price: "$899", period: "/mo", desc: "Most popular for scaling DTC brands.", features: ["Up to 50k returns/mo", "All integrations", "Failure fingerprinting", "Slack alerts", "Priority support"], cta: "Start free trial", featured: true },
  { name: "Enterprise", price: "Custom", period: "", desc: "For multi-brand groups with custom data needs.", features: ["Unlimited returns", "Custom warehouse", "Dedicated CSM", "SSO + audit log", "SLAs"], cta: "Talk to sales" },
];

function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Pricing that scales with savings</h1>
          <p className="mt-4 text-lg text-muted-foreground">Most teams recoup their plan in under 30 days.</p>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-6 md:grid-cols-3">
            {plans.map((p) => (
              <Card key={p.name} className={`p-6 ${p.featured ? "border-primary ring-2 ring-primary/30" : ""}`}>
                <div className="text-sm font-semibold">{p.name}</div>
                <div className="mt-3 flex items-baseline gap-1"><span className="text-3xl font-semibold">{p.price}</span><span className="text-sm text-muted-foreground">{p.period}</span></div>
                <p className="mt-2 text-sm text-muted-foreground">{p.desc}</p>
                <ul className="mt-5 space-y-2 text-sm">{p.features.map((f) => (<li key={f} className="flex items-start gap-2"><Check className="mt-0.5 h-4 w-4 text-primary" />{f}</li>))}</ul>
                <Button asChild className="mt-6 w-full" variant={p.featured ? "default" : "outline"}><Link to={p.name === "Enterprise" ? "/contact" : "/register"}>{p.cta}</Link></Button>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
