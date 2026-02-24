import { Sidebar } from "@/components/Sidebar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { billingRecentInvoicesTable, type InvoiceRow, type InvoiceStatus } from "@/data/invoices";
import { Link, useRoute } from "wouter";
import { ArrowLeft } from "lucide-react";

function statusBadgeVariant(status: InvoiceStatus) {
  if (status === "Paid") {
    return "inline-flex items-center justify-center h-8 px-3 rounded-full text-xs font-medium border border-emerald-200 text-emerald-700 bg-emerald-50";
  }
  if (status === "Overdue") {
    return "inline-flex items-center justify-center h-8 px-3 rounded-full text-xs font-medium border border-rose-200 text-rose-700 bg-rose-50";
  }
  return "inline-flex items-center justify-center h-8 px-3 rounded-full text-xs font-medium border border-amber-200 text-amber-700 bg-amber-50";
}

function getInvoiceFromRoute(): InvoiceRow | undefined {
  const [, params] = useRoute("/invoices/:id");
  if (!params?.id) return undefined;
  return billingRecentInvoicesTable.find(
    (inv) => inv.invoiceId === params.id,
  );
}

export default function InvoiceDetails() {
  const invoice = getInvoiceFromRoute();
  const totalDue =
    invoice != null ? invoice.amount - invoice.refundedAmount : 0;

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto max-h-screen">
        <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-4xl">
          <div className="flex items-center justify-between gap-4">
            <Button
              asChild
              variant="ghost"
              size="sm"
              className="px-2 text-xs text-muted-foreground hover:text-primary"
              onClick={() => {
                if (window.history.length > 1) {
                  window.history.back();
                }
              }}
            >
              <Link href="/invoices">
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to invoices
              </Link>
            </Button>
          </div>

          {invoice ? (
            <Card className="theme-panel border-none">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-display">
                    Invoice {invoice.invoiceId}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Issued to {invoice.entity}.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={statusBadgeVariant(invoice.status)}
                  >
                    {invoice.status}
                  </Badge>
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-8 px-3 text-xs font-medium rounded-full"
                  >
                    Download
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Standard invoice layout */}
                <section className="space-y-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                        From
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        Whodini Admin
                      </p>
                      <p className="text-xs text-muted-foreground">
                        123 Platform Way
                        <br />
                        San Francisco, CA
                      </p>
                    </div>
                    <div className="space-y-1.5">
                      <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                        Bill to
                      </p>
                      <p className="text-sm font-medium text-slate-900">
                        {invoice.entity}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Territory: {invoice.territory}
                      </p>
                    </div>
                    <div className="space-y-1.5 text-sm text-slate-800">
                      <p className="flex justify-between gap-8">
                        <span className="text-muted-foreground">Invoice #</span>
                        <span className="font-mono text-xs text-slate-900">
                          {invoice.invoiceId}
                        </span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span className="text-muted-foreground">Issued</span>
                        <span>{invoice.issuedDate}</span>
                      </p>
                      <p className="flex justify-between gap-8">
                        <span className="text-muted-foreground">Due</span>
                        <span>{invoice.dueDate}</span>
                      </p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-semibold uppercase tracking-[0.08em] text-slate-400">
                      Line items
                    </p>
                    <div className="overflow-hidden rounded-xl border border-slate-200 bg-white">
                      <table className="w-full text-sm">
                        <thead className="bg-slate-50">
                          <tr>
                            <th className="px-4 py-2 text-left font-medium text-slate-600">
                              Description
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-slate-600">
                              Qty
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-slate-600">
                              Unit price
                            </th>
                            <th className="px-4 py-2 text-right font-medium text-slate-600">
                              Amount
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-t border-slate-200">
                            <td className="px-4 py-2">
                              Subscription charges
                            </td>
                            <td className="px-4 py-2 text-right">1</td>
                            <td className="px-4 py-2 text-right">
                              {invoice.currency} {invoice.amount}
                            </td>
                            <td className="px-4 py-2 text-right">
                              {invoice.currency} {invoice.amount}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-1 text-sm text-slate-800">
                    <div className="flex justify-between gap-8 w-full max-w-xs">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>
                        {invoice.currency} {invoice.amount}
                      </span>
                    </div>
                    <div className="flex justify-between gap-8 w-full max-w-xs">
                      <span className="text-muted-foreground">
                        Refunds / credits
                      </span>
                      <span>
                        {invoice.currency} {invoice.refundedAmount}
                      </span>
                    </div>
                    <div className="flex justify-between gap-8 w-full max-w-xs border-t border-dashed border-slate-300 pt-2 mt-1">
                      <span className="font-semibold">Total due</span>
                      <span className="font-semibold">
                        {invoice.currency} {totalDue}
                      </span>
                    </div>
                  </div>
                </section>
              </CardContent>
            </Card>
          ) : (
            <Card className="theme-panel border-none">
              <CardHeader>
                <CardTitle className="text-base font-display">
                  Invoice not found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We couldn&apos;t find this invoice. It may have been removed or
                  the URL is incorrect.
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  );
}

