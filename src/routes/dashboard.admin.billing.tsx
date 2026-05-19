import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site/Kpi";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
export const Route = createFileRoute("/dashboard/admin/billing")({ component: Page });
const invoices = [
  { id: "INV-1041", date: "Nov 1, 2025", amount: "$899.00", status: "Paid" },
  { id: "INV-1038", date: "Oct 1, 2025", amount: "$899.00", status: "Paid" },
  { id: "INV-1031", date: "Sep 1, 2025", amount: "$899.00", status: "Paid" },
];
function Page() {
  return (
    <div>
      <PageHeader title="Billing" subtitle="Subscription, payment method, and invoices." />
      <div className="grid gap-4 lg:grid-cols-3">
        <Card className="p-6"><div className="text-sm font-medium">Current plan</div>
          <div className="mt-2 text-2xl font-semibold">Professional</div>
          <div className="text-sm text-muted-foreground">$899/mo · renews Dec 1, 2025</div>
          <div className="mt-4 flex gap-2"><Button size="sm">Upgrade</Button><Button size="sm" variant="outline">Cancel</Button></div>
        </Card>
        <Card className="p-6"><div className="text-sm font-medium">Payment method</div>
          <div className="mt-2 rounded-md border border-border bg-secondary/40 p-3 text-sm">Visa •••• 4242 · expires 08/27</div>
          <Button size="sm" variant="outline" className="mt-4">Update card</Button>
        </Card>
        <Card className="p-6"><div className="text-sm font-medium">Usage this month</div>
          <div className="mt-2 text-2xl font-semibold">38,210</div>
          <div className="text-sm text-muted-foreground">returns processed · 76% of plan</div>
          <div className="mt-3 h-1.5 rounded-full bg-secondary"><div className="h-full rounded-full bg-primary" style={{ width: "76%" }} /></div>
        </Card>
      </div>
      <Card className="mt-6 p-0"><table className="w-full text-sm">
        <thead><tr className="border-b text-left text-xs uppercase tracking-wider text-muted-foreground">
          <th className="px-4 py-3">Invoice</th><th>Date</th><th>Amount</th><th>Status</th>
        </tr></thead>
        <tbody>{invoices.map((i) => (
          <tr key={i.id} className="border-b last:border-0">
            <td className="px-4 py-3 font-mono text-xs">{i.id}</td><td>{i.date}</td><td>{i.amount}</td>
            <td><span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] text-emerald-700">{i.status}</span></td>
          </tr>))}</tbody>
      </table></Card>
    </div>
  );
}
