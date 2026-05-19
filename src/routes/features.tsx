import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/site/PublicNav";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Microscope, Brain, MessageSquare, Sparkles, DollarSign, BarChart3, Bell, FileText, Plug } from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — ReturnSense" },
      { name: "description", content: "SKU causality, failure fingerprinting, NLP complaint analysis, weekly action center, and more." },
    ],
  }),
  component: FeaturesPage,
});

const features = [
  { icon: Microscope, title: "SKU Root Cause Detection", body: "Pinpoint why each SKU is returned — fit, defect, expectation gap, logistics." },
  { icon: Brain, title: "Failure Fingerprinting", body: "Recurring defect signatures are detected across SKUs, suppliers, and batches." },
  { icon: MessageSquare, title: "NLP Complaint Analysis", body: "Turn raw customer text into structured themes, sentiment, and severity." },
  { icon: Sparkles, title: "Weekly Action Center", body: "Ranked, owner-assigned fixes with estimated savings — every Monday." },
  { icon: DollarSign, title: "ROI Savings Estimation", body: "Quantify the dollar value of every recommended action before you ship it." },
  { icon: BarChart3, title: "Returns Analytics", body: "Self-serve dashboards across SKU, category, channel, and reason code." },
  { icon: Bell, title: "Smart Alerts", body: "Spike detection that knows your seasonality and ignores the noise." },
  { icon: FileText, title: "Executive Reports", body: "Auto-generated PDFs and CSV exports for leadership and suppliers." },
  { icon: Plug, title: "Integration Dashboard", body: "Connect Shopify, Loop Returns, Gorgias, Klaviyo, NetSuite in minutes." },
];

function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        <section className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 lg:px-8">
          <h1 className="text-4xl font-semibold tracking-tight sm:text-5xl">Built for the teams that own returns</h1>
          <p className="mt-4 text-lg text-muted-foreground">Nine purpose-built capabilities, one connected workspace.</p>
        </section>
        <section className="mx-auto max-w-7xl px-4 pb-20 sm:px-6 lg:px-8">
          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f) => (
              <Card key={f.title} className="p-6">
                <f.icon className="h-5 w-5 text-primary" />
                <div className="mt-3 text-base font-semibold">{f.title}</div>
                <p className="mt-1 text-sm text-muted-foreground">{f.body}</p>
              </Card>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
