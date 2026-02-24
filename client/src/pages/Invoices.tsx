import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, FileText, Bell } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  billingRecentInvoicesTable,
  type InvoiceRow,
  type InvoiceStatus,
} from "@/data/invoices";
import { Link } from "wouter";

function statusBadgeVariant(status: InvoiceStatus) {
  if (status === "Paid") {
    return "border-emerald-200 text-emerald-700 bg-emerald-50";
  }
  if (status === "Overdue") {
    return "border-rose-200 text-rose-700 bg-rose-50";
  }
  return "border-amber-200 text-amber-700 bg-amber-50";
}

function formatCurrencyAmount(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Invoices() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "all" | InvoiceStatus
  >("all");
  const [territoryFilter, setTerritoryFilter] = useState<
    "all" | "US-East" | "US-West" | "EU-West" | "APAC"
  >("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalInvoices = billingRecentInvoicesTable.length;
  const paidInvoices = billingRecentInvoicesTable.filter(
    (inv) => inv.status === "Paid",
  ).length;
  const pendingInvoices = billingRecentInvoicesTable.filter(
    (inv) => inv.status === "Pending",
  ).length;

  const filteredInvoices = useMemo(() => {
    return billingRecentInvoicesTable.filter((invoice) => {
      const matchesSearch =
        search.trim().length === 0 ||
        invoice.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
        invoice.entity.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || invoice.status === statusFilter;

      const matchesTerritory =
        territoryFilter === "all" || invoice.territory === territoryFilter;

      return matchesSearch && matchesStatus && matchesTerritory;
    });
  }, [search, statusFilter, territoryFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, territoryFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredInvoices.length / pageSize),
  );
  const paginatedInvoices = filteredInvoices.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  const totalAmount = billingRecentInvoicesTable.reduce(
    (sum, inv) => sum + inv.amount,
    0,
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto max-h-screen">
        <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">
                Invoices
              </h1>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                Snapshot of recent invoices, payment statuses, and amounts
                across entities.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                size="icon"
                variant="ghost"
                className="rounded-full bg-white shadow-sm text-muted-foreground hover:text-primary"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <StatCard
              title="Total invoices"
              value={totalInvoices}
              subValue="Recent invoices on file"
              icon={<FileText className="w-4 h-4" />}
            />
            <StatCard
              title="Paid invoices"
              value={paidInvoices}
              subValue="Invoices fully settled"
              icon={<FileText className="w-4 h-4" />}
            />
            <StatCard
              title="Pending invoices"
              value={pendingInvoices}
              subValue="Awaiting payment"
              icon={<FileText className="w-4 h-4" />}
            />
          </section>

          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Invoices management
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Recent invoices by entity with filters for status and
                    territory.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by invoice ID or entity..."
                      className="h-8 pl-9 rounded-lg bg-white border border-slate-200 text-sm placeholder:text-muted-foreground"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value: "all" | InvoiceStatus) =>
                      setStatusFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="Paid">Paid</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Overdue">Overdue</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={territoryFilter}
                    onValueChange={(
                      value:
                        | "all"
                        | "US-East"
                        | "US-West"
                        | "EU-West"
                        | "APAC",
                    ) => setTerritoryFilter(value)}
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Territory" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All territories</SelectItem>
                      <SelectItem value="US-East">US-East</SelectItem>
                      <SelectItem value="US-West">US-West</SelectItem>
                      <SelectItem value="EU-West">EU-West</SelectItem>
                      <SelectItem value="APAC">APAC</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border p-2" />
                <Table className="[&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Invoice ID</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issued Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Territory</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedInvoices.map((row: InvoiceRow) => (
                      <TableRow
                        key={row.invoiceId}
                        className="hover:bg-orange-50/70 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground pl-6">
                          {row.invoiceId}
                        </TableCell>
                        <TableCell className="font-medium">
                          {row.entity}
                        </TableCell>
                        <TableCell className="text-right">
                          {formatCurrencyAmount(row.amount, row.currency)}
                        </TableCell>
                        <TableCell>{row.currency}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusBadgeVariant(row.status)}
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.issuedDate}</TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>{row.territory}</TableCell>
                        <TableCell className="text-right">
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                          >
                            <Link href={`/invoices/${row.invoiceId}`}>
                              View
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredInvoices.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={9}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No invoices match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {filteredInvoices.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
                    <span>
                      Showing{" "}
                      {(page - 1) * pageSize + 1}-
                      {Math.min(page * pageSize, filteredInvoices.length)} of{" "}
                      {filteredInvoices.length}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() => setPage((p) => Math.max(1, p - 1))}
                        disabled={page === 1}
                      >
                        Previous
                      </Button>
                      <span className="text-[11px]">
                        Page {page} of {totalPages}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="h-7 px-2 text-xs"
                        onClick={() =>
                          setPage((p) => Math.min(totalPages, p + 1))
                        }
                        disabled={page === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}

