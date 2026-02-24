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
import { Search, MapPinned, Bell } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  territoriesTable,
  billingRevenueByTerritoryTable,
  type TerritoryRow,
} from "@/data/territories";

function formatCurrencyAmount(value: number, currency: string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export default function Territories() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Enabled" | "Disabled">("all");
  const [currencyFilter, setCurrencyFilter] = useState<"all" | "USD" | "EUR">(
    "all",
  );
  const [monthFilter, setMonthFilter] = useState<"current" | "previous">(
    "current",
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const enabledTerritories = territoriesTable.filter(
    (territory) => territory.status === "Enabled",
  ).length;
  const totalTerritoryEntities = territoriesTable.reduce(
    (sum, territory) => sum + territory.entities,
    0,
  );

  const territoryRevenueLookup = billingRevenueByTerritoryTable.reduce(
    (acc, row) => {
      acc[row.territory.toLowerCase()] = row;
      return acc;
    },
    {} as Record<string, (typeof billingRevenueByTerritoryTable)[number]>,
  );

  const mapTerritoryCodeToRevenueKey = (code: string) => {
    if (code === "US-EAST") return "us-east";
    if (code === "US-WEST") return "us-west";
    if (code === "EU-WEST") return "eu-west";
    return code.toLowerCase();
  };

  const combinedTerritoriesWithRevenue = territoriesTable.map((row) => {
    const revenueRow =
      territoryRevenueLookup[mapTerritoryCodeToRevenueKey(row.code)];
    const totalRevenue =
      monthFilter === "previous"
        ? revenueRow?.previousRevenue ?? 0
        : revenueRow?.currentRevenue ?? 0;

    return {
      ...row,
      activeSubscriptions: revenueRow?.activeSubscriptions ?? row.activeSubs,
      totalRevenue,
      revenueCurrency: revenueRow?.currency ?? row.currency,
    };
  });

  const combinedTerritoryRevenueTotal = combinedTerritoriesWithRevenue.reduce(
    (sum, row) => sum + row.totalRevenue,
    0,
  );

  const filteredTerritories = useMemo(() => {
    return combinedTerritoriesWithRevenue.filter((territory) => {
      const matchesSearch =
        search.trim().length === 0 ||
        territory.name.toLowerCase().includes(search.toLowerCase()) ||
        territory.code.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || territory.status === statusFilter;

      const matchesCurrency =
        currencyFilter === "all" || territory.currency === currencyFilter;

      return matchesSearch && matchesStatus && matchesCurrency;
    });
  }, [
    combinedTerritoriesWithRevenue,
    search,
    statusFilter,
    currencyFilter,
  ]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, currencyFilter, monthFilter]);

  const totalPages = Math.max(
    1,
    Math.ceil(filteredTerritories.length / pageSize),
  );
  const paginatedTerritories = filteredTerritories.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto max-h-screen">
        <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">
                Territories
              </h1>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                Region-level view of entities, active subscriptions, and
                revenue contribution.
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
              title="Enabled territories"
              value={enabledTerritories}
              subValue="Regions currently live"
              icon={<MapPinned className="w-4 h-4" />}
            />
            <StatCard
              title="Entities in regions"
              value={totalTerritoryEntities}
              subValue="Accounts mapped to territories"
              icon={<MapPinned className="w-4 h-4" />}
            />
            <StatCard
              title="Total revenue"
              value={formatCurrencyAmount(
                combinedTerritoryRevenueTotal,
                "USD",
              )}
              subValue={
                monthFilter === "previous" ? "Previous month" : "Current month"
              }
              icon={<MapPinned className="w-4 h-4" />}
            />
          </section>

          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Territories status
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Territory health and subscription coverage by region.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or code..."
                      className="pl-9 bg-white border border-input text-sm placeholder:text-muted-foreground"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value: "all" | "Enabled" | "Disabled") =>
                      setStatusFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="Enabled">Enabled</SelectItem>
                      <SelectItem value="Disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={currencyFilter}
                    onValueChange={(value: "all" | "USD" | "EUR") =>
                      setCurrencyFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Currency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All currencies</SelectItem>
                      <SelectItem value="USD">USD</SelectItem>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={monthFilter}
                    onValueChange={(value: "current" | "previous") =>
                      setMonthFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Revenue month" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="current">Current month</SelectItem>
                      <SelectItem value="previous">Previous month</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border p-2" />
                <Table className="[&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead>Territory</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead className="text-right">Entities</TableHead>
                      <TableHead className="text-right">Active Subs</TableHead>
                      <TableHead className="text-right">Total Revenue</TableHead>
                      <TableHead className="text-right">
                        % of Total Revenue
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedTerritories.map((row: any) => {
                      const contribution = combinedTerritoryRevenueTotal
                        ? (
                            (row.totalRevenue / combinedTerritoryRevenueTotal) *
                            100
                          ).toFixed(1)
                        : "0.0";
                      return (
                        <TableRow
                          key={row.code}
                          className="hover:bg-orange-50/70 transition-colors"
                        >
                          <TableCell>
                            <p className="font-medium text-slate-900">
                              {row.name}
                            </p>
                            <p className="text-xs text-muted-foreground font-mono">
                              {row.code}
                            </p>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                row.status === "Enabled"
                                  ? "border-orange-200 text-orange-700 bg-orange-50"
                                  : "border-slate-200 text-slate-700 bg-slate-50"
                              }
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-slate-700">
                            {row.currency}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {row.entities}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {row.activeSubscriptions}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {formatCurrencyAmount(
                              row.totalRevenue,
                              row.revenueCurrency,
                            )}
                          </TableCell>
                          <TableCell className="text-right font-medium">
                            {contribution}%
                          </TableCell>
                        </TableRow>
                      );
                    })}
                    {filteredTerritories.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No territories match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {filteredTerritories.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
                    <span>
                      Showing{" "}
                      {(page - 1) * pageSize + 1}-
                      {Math.min(page * pageSize, filteredTerritories.length)} of{" "}
                      {filteredTerritories.length}
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

