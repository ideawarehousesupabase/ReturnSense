import { createFileRoute } from "@tanstack/react-router";
import { PublicNav } from "@/components/site/PublicNav";
import { Footer } from "@/components/site/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { toast } from "sonner";

export const Route = createFileRoute("/contact")({
  head: () => ({ meta: [{ title: "Contact — ReturnSense" }] }),
  component: ContactPage,
});

function ContactPage() {
  const [loading, setLoading] = useState(false);
  return (
    <div className="flex min-h-screen flex-col">
      <PublicNav />
      <main className="flex-1">
        <section className="mx-auto grid max-w-5xl gap-10 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
          <div>
            <h1 className="text-4xl font-semibold tracking-tight">Let's talk</h1>
            <p className="mt-4 text-muted-foreground">We usually reply within a business day.</p>
            <div className="mt-8 space-y-2 text-sm text-muted-foreground">
              <div><span className="text-foreground">Sales:</span> sales@returnsense.io</div>
              <div><span className="text-foreground">Support:</span> support@returnsense.io</div>
            </div>
          </div>
          <Card className="p-6">
            <form onSubmit={(e) => { e.preventDefault(); setLoading(true); setTimeout(() => { setLoading(false); toast.success("Message sent."); (e.target as HTMLFormElement).reset(); }, 500); }} className="space-y-4">
              <div><Label htmlFor="n">Name</Label><Input id="n" required className="mt-1" /></div>
              <div><Label htmlFor="e">Email</Label><Input id="e" type="email" required className="mt-1" /></div>
              <div><Label htmlFor="m">Message</Label><Textarea id="m" required className="mt-1" rows={5} /></div>
              <Button type="submit" className="w-full" disabled={loading}>{loading ? "Sending…" : "Send message"}</Button>
            </form>
          </Card>
        </section>
      </main>
      <Footer />
    </div>
  );
}
