import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/site/PublicNav";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/about")({
  head: () => ({ meta: [{ title: "About — ReturnSense" }, { name: "description", content: "AI platform helping retailers reduce returns." }] }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-20 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight">Our story</h1>
          <p className="mt-6 text-lg text-muted-foreground">ReturnSense was founded by operators who lived inside the returns problem. We watched teams patch the same SKU failures month after month — without the tools to see why.</p>
          <p className="mt-4 text-lg text-muted-foreground">We built the SKU Causality Engine to give operations and quality teams one shared truth: not just what is being returned, but why, and what to do about it this week.</p>
          <div className="mt-12 grid gap-4 sm:grid-cols-3">
            {[{ k: "$120M+", v: "Margin recovered" }, { k: "86", v: "Brands on platform" }, { k: "9", v: "Native integrations" }].map((s) => (
              <Card key={s.k} className="p-6 text-center"><div className="text-2xl font-semibold">{s.k}</div><div className="mt-1 text-sm text-muted-foreground">{s.v}</div></Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
