import { 
  useDashboardStats, 
} from "@/hooks/use-dashboard";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { 
  Users, 
  Building2, 
  CreditCard, 
  Flag, 
  MapPinned,
  ShieldCheck,
  CalendarDays,
  Bell,
  Wallet,
  BarChart3
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import {
  Select as FilterSelect,
  SelectContent as FilterSelectContent,
  SelectItem as FilterSelectItem,
  SelectTrigger as FilterSelectTrigger,
  SelectValue as FilterSelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { format } from "date-fns";
import {
  ResponsiveContainer,
  LineChart,
  Line,
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend,
} from "recharts";

const entitiesTable = [
  {
    id: "ENT_001",
    name: "Northwind Studio",
    type: "Business",
    territory: "US-East",
    status: "Active",
    created: "2026-02-05",
    owner: "Maria Santos",
  },
  {
    id: "ENT_002",
    name: "Globex Europe",
    type: "Business",
    territory: "EU-West",
    status: "Trial",
    created: "2026-02-03",
    owner: "James Lee",
  },
  {
    id: "ENT_003",
    name: "Community Hub LA",
    type: "Community",
    territory: "US-West",
    status: "Active",
    created: "2026-02-01",
    owner: "Carla Gomez",
  },
];

const subscriptionsTable = [
  {
    id: "SUB_9001",
    entity: "Northwind Studio",
    plan: "Scale",
    status: "Active",
    renewalDate: "2026-03-05",
    amount: "$890",
    currency: "USD",
  },
  {
    id: "SUB_9002",
    entity: "Globex Europe",
    plan: "Trial",
    status: "Trial",
    renewalDate: "2026-02-20",
    amount: "$0",
    currency: "EUR",
  },
  {
    id: "SUB_9003",
    entity: "Community Hub LA",
    plan: "Launch",
    status: "Active",
    renewalDate: "2026-02-28",
    amount: "$290",
    currency: "USD",
  },
];

const staffTable = [
  {
    id: "ST_10",
    name: "Admin Root",
    role: "SuperAdmin",
    status: "Active",
    created: "2025-09-01",
    lastActive: "2026-02-11",
  },
  {
    id: "ST_11",
    name: "Karen Lim",
    role: "Support",
    status: "Active",
    created: "2025-10-10",
    lastActive: "2026-02-10",
  },
  {
    id: "ST_12",
    name: "Leo Tan",
    role: "Ops",
    status: "Active",
    created: "2025-12-01",
    lastActive: "2026-02-11",
  },
];

const territoriesTable = [
  {
    code: "US-EAST",
    name: "United States – East",
    currency: "USD",
    status: "Enabled",
    entities: 24,
    activeSubs: 18,
  },
  {
    code: "EU-WEST",
    name: "Europe – West",
    currency: "EUR",
    status: "Enabled",
    entities: 15,
    activeSubs: 11,
  },
  {
    code: "APAC",
    name: "Asia Pacific",
    currency: "USD",
    status: "Disabled",
    entities: 6,
    activeSubs: 0,
  },
];

const featureFlagsTable = [
  {
    key: "billing.v2-checkout",
    module: "Billing",
    defaultState: "On",
    environment: "Production",
    lastUpdated: "2026-02-09",
    updatedBy: "Admin Root",
  },
  {
    key: "entities.multi-territory",
    module: "Entities",
    defaultState: "Beta",
    environment: "Staging",
    lastUpdated: "2026-02-07",
    updatedBy: "Leo Tan",
  },
  {
    key: "staff.audit-log-v2",
    module: "Staff",
    defaultState: "Off",
    environment: "Production",
    lastUpdated: "2026-02-01",
    updatedBy: "Mark Evans",
  },
];

const billingSubscriptionsTable = [
  {
    id: "SUB_9101",
    entityName: "Northwind Studio",
    planName: "Business / Brand",
    status: "Active",
    renewalDate: "2026-02-18",
    amount: 890,
    currency: "USD",
    territory: "US-East",
    createdDate: "2026-02-10",
  },
  {
    id: "SUB_9102",
    entityName: "Globex Europe",
    planName: "Community / Organization",
    status: "Trial",
    renewalDate: "2026-02-19",
    amount: 0,
    currency: "EUR",
    territory: "EU-West",
    createdDate: "2026-02-08",
  },
  {
    id: "SUB_9103",
    entityName: "Community Hub LA",
    planName: "Personal",
    status: "Active",
    renewalDate: "2026-02-28",
    amount: 290,
    currency: "USD",
    territory: "US-West",
    createdDate: "2026-02-07",
  },
  {
    id: "SUB_9104",
    entityName: "Helios Labs",
    planName: "Event Organizer",
    status: "Canceled",
    renewalDate: "2026-02-14",
    amount: 0,
    currency: "USD",
    territory: "APAC",
    createdDate: "2026-01-24",
  },
  {
    id: "SUB_9105",
    entityName: "Atlas Retail",
    planName: "Agency",
    status: "Active",
    renewalDate: "2026-02-16",
    amount: 1600,
    currency: "USD",
    territory: "US-East",
    createdDate: "2026-02-11",
  },
  {
    id: "SUB_9106",
    entityName: "Zenith Medical",
    planName: "Business / Brand",
    status: "Active",
    renewalDate: "2026-03-04",
    amount: 740,
    currency: "USD",
    territory: "EU-West",
    createdDate: "2026-02-05",
  },
];

const billingRevenueByTerritoryTable = [
  {
    territory: "US-East",
    activeSubscriptions: 24,
    currentRevenue: 28400,
    previousRevenue: 26150,
    currency: "USD",
    status: "Enabled",
  },
  {
    territory: "EU-West",
    activeSubscriptions: 18,
    currentRevenue: 19600,
    previousRevenue: 18880,
    currency: "EUR",
    status: "Enabled",
  },
  {
    territory: "US-West",
    activeSubscriptions: 11,
    currentRevenue: 13250,
    previousRevenue: 12400,
    currency: "USD",
    status: "Enabled",
  },
  {
    territory: "APAC",
    activeSubscriptions: 7,
    currentRevenue: 7700,
    previousRevenue: 8050,
    currency: "USD",
    status: "Disabled",
  },
  {
    territory: "LATAM",
    activeSubscriptions: 5,
    currentRevenue: 5100,
    previousRevenue: 4720,
    currency: "USD",
    status: "Enabled",
  },
];

const billingRecentInvoicesTable = [
  {
    invoiceId: "INV-12011",
    entity: "Northwind Studio",
    amount: 890,
    currency: "USD",
    status: "Paid",
    issuedDate: "2026-02-08",
    dueDate: "2026-02-16",
    territory: "US-East",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12012",
    entity: "Globex Europe",
    amount: 720,
    currency: "EUR",
    status: "Pending",
    issuedDate: "2026-02-09",
    dueDate: "2026-02-18",
    territory: "EU-West",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12013",
    entity: "Community Hub LA",
    amount: 290,
    currency: "USD",
    status: "Overdue",
    issuedDate: "2026-01-30",
    dueDate: "2026-02-07",
    territory: "US-West",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12014",
    entity: "Atlas Retail",
    amount: 1600,
    currency: "USD",
    status: "Paid",
    issuedDate: "2026-02-10",
    dueDate: "2026-02-20",
    territory: "US-East",
    refundedAmount: 150,
  },
  {
    invoiceId: "INV-12015",
    entity: "Zenith Medical",
    amount: 740,
    currency: "USD",
    status: "Paid",
    issuedDate: "2026-02-11",
    dueDate: "2026-02-19",
    territory: "EU-West",
    refundedAmount: 0,
  },
  {
    invoiceId: "INV-12016",
    entity: "Helios Labs",
    amount: 420,
    currency: "USD",
    status: "Pending",
    issuedDate: "2026-02-06",
    dueDate: "2026-02-15",
    territory: "APAC",
    refundedAmount: 0,
  },
];

export default function Dashboard() {
  const { data: stats, isLoading: statsLoading } = useDashboardStats();
  const [chartRange, setChartRange] = useState("7d");
  const [territoryStatusFilter, setTerritoryStatusFilter] = useState("all");
  const [territoryCurrencyFilter, setTerritoryCurrencyFilter] = useState("all");
  const [billingSubscriptionStatusFilter, setBillingSubscriptionStatusFilter] = useState("all");
  const [billingSubscriptionPlanFilter, setBillingSubscriptionPlanFilter] = useState("all");
  const [billingSubscriptionTerritoryFilter, setBillingSubscriptionTerritoryFilter] = useState("all");
  const [billingRenewalRangeFilter, setBillingRenewalRangeFilter] = useState("all");
  const [billingRevenueStatusFilter, setBillingRevenueStatusFilter] = useState("all");
  const [billingRevenueMonthFilter, setBillingRevenueMonthFilter] = useState("current");
  const [billingInvoiceStatusFilter, setBillingInvoiceStatusFilter] = useState("all");
  const [billingInvoiceDateRangeFilter, setBillingInvoiceDateRangeFilter] = useState("all");
  const [billingInvoiceTerritoryFilter, setBillingInvoiceTerritoryFilter] = useState("all");

  // Assuming we get the latest day's stats for cards
  const todayStats = stats?.[0];
  const yesterdayStats = stats?.[1];

  // Helper to calculate trend
  const calculateTrend = (current: number, previous: number) => {
    if (!previous) return 0;
    return Math.abs(Math.round(((current - previous) / previous) * 100));
  };

  const enabledTerritories = territoriesTable.filter((territory) => territory.status === "Enabled").length;
  const totalTerritoryEntities = territoriesTable.reduce((sum, territory) => sum + territory.entities, 0);
  const filteredTerritories = territoriesTable.filter((territory) => {
    const matchesStatus =
      territoryStatusFilter === "all" ||
      territory.status.toLowerCase() === territoryStatusFilter;
    const matchesCurrency =
      territoryCurrencyFilter === "all" ||
      territory.currency.toLowerCase() === territoryCurrencyFilter;
    return matchesStatus && matchesCurrency;
  });

  const rangeDays = chartRange === "30d" ? 30 : chartRange === "14d" ? 14 : 7;
  const rangeStats = stats?.slice(0, rangeDays).reverse() || [];

  const growthChartData = rangeStats.map((stat) => ({
    name: format(new Date(stat.date), "MMM dd"),
    entities: stat.totalEntities,
    subscriptions: stat.activeSubscriptions,
  }));

  const mrrChartData = rangeStats.map((stat) => ({
    name: format(new Date(stat.date), "MMM dd"),
    mrr: Math.round(stat.mrr / 100),
  }));

  const userActivityChartData = rangeStats.map((stat) => ({
    name: format(new Date(stat.date), "MMM dd"),
    dailyActive: stat.activeUsersDaily,
    weeklyActive: stat.activeUsersWeekly,
  }));

  const ratioChartData = rangeStats.map((stat) => ({
    name: format(new Date(stat.date), "MMM dd"),
    subToEntityRate: stat.activeEntities
      ? Number(((stat.activeSubscriptions / stat.activeEntities) * 100).toFixed(1))
      : 0,
    entityActiveRate: stat.totalEntities
      ? Number(((stat.activeEntities / stat.totalEntities) * 100).toFixed(1))
      : 0,
  }));

  const parseAmount = (amount: string) =>
    Number(amount.replace(/[^0-9.]/g, ""));

  const serviceBillingPaymentsData = Object.values(
    subscriptionsTable.reduce(
      (acc, row) => {
        if (!acc[row.plan]) {
          acc[row.plan] = {
            plan: row.plan,
            billedAmount: 0,
            activePayments: 0,
            trialSubscriptions: 0,
            canceledSubscriptions: 0,
          };
        }

        if (row.status === "Active") {
          acc[row.plan].activePayments += 1;
          acc[row.plan].billedAmount += parseAmount(row.amount);
        } else if (row.status === "Trial") {
          acc[row.plan].trialSubscriptions += 1;
        } else {
          acc[row.plan].canceledSubscriptions += 1;
        }

        return acc;
      },
      {} as Record<
        string,
        {
          plan: string;
          billedAmount: number;
          activePayments: number;
          trialSubscriptions: number;
          canceledSubscriptions: number;
        }
      >
    )
  );

  const serviceBillingPaymentsByDateData = rangeStats.map((stat) => ({
    name: format(new Date(stat.date), "MMM dd"),
    billedAmount: Math.round(stat.mrr / 100),
    activePayments: stat.activeSubscriptions,
  }));

  const formatCurrencyAmount = (value: number, currency: string) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
      maximumFractionDigits: 0,
    }).format(value);

  const inLastDays = (dateText: string, days: number) => {
    const date = new Date(dateText);
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.floor((now.getTime() - date.getTime()) / msPerDay);
    return diffDays >= 0 && diffDays <= days;
  };

  const inNextDays = (dateText: string, days: number) => {
    const date = new Date(dateText);
    const now = new Date();
    const msPerDay = 1000 * 60 * 60 * 24;
    const diffDays = Math.ceil((date.getTime() - now.getTime()) / msPerDay);
    return diffDays >= 0 && diffDays <= days;
  };

  const filteredBillingSubscriptions = billingSubscriptionsTable.filter((row) => {
    const normalizedPlanName = row.planName
      .toLowerCase()
      .replace(/\s*\/\s*/g, "-")
      .replace(/\s+/g, "-");
    const matchesStatus =
      billingSubscriptionStatusFilter === "all" ||
      row.status.toLowerCase() === billingSubscriptionStatusFilter;
    const matchesPlan =
      billingSubscriptionPlanFilter === "all" ||
      normalizedPlanName === billingSubscriptionPlanFilter;
    const matchesTerritory =
      billingSubscriptionTerritoryFilter === "all" ||
      row.territory.toLowerCase() === billingSubscriptionTerritoryFilter;
    const matchesRenewalRange =
      billingRenewalRangeFilter === "all" ||
      (billingRenewalRangeFilter === "next7" && inNextDays(row.renewalDate, 7)) ||
      (billingRenewalRangeFilter === "next30" && inNextDays(row.renewalDate, 30));
    return matchesStatus && matchesPlan && matchesTerritory && matchesRenewalRange;
  });

  const filteredBillingRevenueByTerritory = billingRevenueByTerritoryTable.filter((row) => {
    if (billingRevenueStatusFilter === "all") return true;
    return row.status.toLowerCase() === billingRevenueStatusFilter;
  });

  const billingRevenueRows = filteredBillingRevenueByTerritory.map((row) => ({
    ...row,
    totalRevenue:
      billingRevenueMonthFilter === "previous" ? row.previousRevenue : row.currentRevenue,
  }));

  const billingRevenueTotal = billingRevenueRows.reduce(
    (sum, row) => sum + row.totalRevenue,
    0
  );
  const territoryRevenueLookup = billingRevenueRows.reduce(
    (acc, row) => {
      acc[row.territory.toLowerCase()] = row;
      return acc;
    },
    {} as Record<string, (typeof billingRevenueRows)[number]>
  );
  const mapTerritoryCodeToRevenueKey = (code: string) => {
    if (code === "US-EAST") return "us-east";
    if (code === "US-WEST") return "us-west";
    if (code === "EU-WEST") return "eu-west";
    return code.toLowerCase();
  };
  const combinedTerritoriesWithRevenue = filteredTerritories.map((row) => {
    const revenueRow = territoryRevenueLookup[mapTerritoryCodeToRevenueKey(row.code)];
    return {
      ...row,
      activeSubscriptions: revenueRow?.activeSubscriptions ?? row.activeSubs,
      totalRevenue: revenueRow?.totalRevenue ?? 0,
      revenueCurrency: revenueRow?.currency ?? row.currency,
    };
  });
  const combinedTerritoryRevenueTotal = combinedTerritoriesWithRevenue.reduce(
    (sum, row) => sum + row.totalRevenue,
    0
  );

  const filteredBillingInvoices = billingRecentInvoicesTable.filter((row) => {
    const matchesStatus =
      billingInvoiceStatusFilter === "all" ||
      row.status.toLowerCase() === billingInvoiceStatusFilter;
    const matchesTerritory =
      billingInvoiceTerritoryFilter === "all" ||
      row.territory.toLowerCase() === billingInvoiceTerritoryFilter;
    const matchesDateRange =
      billingInvoiceDateRangeFilter === "all" ||
      (billingInvoiceDateRangeFilter === "last30" && inLastDays(row.issuedDate, 30)) ||
      (billingInvoiceDateRangeFilter === "last90" && inLastDays(row.issuedDate, 90));
    return matchesStatus && matchesTerritory && matchesDateRange;
  });

  const totalActiveSubscriptions = billingSubscriptionsTable.filter(
    (row) => row.status === "Active"
  ).length;
  const totalTrialSubscriptions = billingSubscriptionsTable.filter(
    (row) => row.status === "Trial"
  ).length;
  const totalCanceledSubscriptions = billingSubscriptionsTable.filter(
    (row) => row.status === "Canceled"
  ).length;
  const newSubscriptionsLast7Days = billingSubscriptionsTable.filter((row) =>
    inLastDays(row.createdDate, 7)
  ).length;
  const upcomingRenewalsNext7Days = billingSubscriptionsTable.filter((row) =>
    inNextDays(row.renewalDate, 7)
  ).length;

  const currentMrr = billingSubscriptionsTable
    .filter((row) => row.status === "Active")
    .reduce((sum, row) => sum + row.amount, 0);
  const revenueThisMonth = billingRecentInvoicesTable
    .filter(
      (row) =>
        row.status === "Paid" &&
        new Date(row.issuedDate).getMonth() === new Date().getMonth() &&
        new Date(row.issuedDate).getFullYear() === new Date().getFullYear()
    )
    .reduce((sum, row) => sum + row.amount, 0);
  const averageRevenuePerEntity = totalActiveSubscriptions
    ? Math.round(currentMrr / totalActiveSubscriptions)
    : 0;

  const totalPaidInvoicesThisMonth = billingRecentInvoicesTable.filter(
    (row) =>
      row.status === "Paid" &&
      new Date(row.issuedDate).getMonth() === new Date().getMonth() &&
      new Date(row.issuedDate).getFullYear() === new Date().getFullYear()
  ).length;
  const totalPendingInvoices = billingRecentInvoicesTable.filter(
    (row) => row.status === "Pending"
  ).length;
  const totalOverdueInvoices = billingRecentInvoicesTable.filter(
    (row) => row.status === "Overdue"
  ).length;
  const totalAmountPaidThisMonth = billingRecentInvoicesTable
    .filter(
      (row) =>
        row.status === "Paid" &&
        new Date(row.issuedDate).getMonth() === new Date().getMonth() &&
        new Date(row.issuedDate).getFullYear() === new Date().getFullYear()
    )
    .reduce((sum, row) => sum + row.amount, 0);
  const pendingAmount = billingRecentInvoicesTable
    .filter(
      (row) => row.status === "Pending"
    )
    .reduce((sum, row) => sum + row.amount, 0);

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />
      
      <main className="flex-1 overflow-y-auto max-h-screen">
        <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
          
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gradient">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                High-level visibility into subscription activity, revenue distribution, and invoice/payment status across territories.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Select value={chartRange} onValueChange={setChartRange}>
                <SelectTrigger className="w-[140px] bg-white border-none shadow-sm">
                  <CalendarDays className="w-4 h-4 mr-2 text-muted-foreground" />
                  <SelectValue placeholder="Period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7d">Last 7 Days</SelectItem>
                  <SelectItem value="14d">Last 14 Days</SelectItem>
                  <SelectItem value="30d">Last 30 Days</SelectItem>
                </SelectContent>
              </Select>
              <Button size="icon" variant="ghost" className="rounded-full bg-white shadow-sm text-muted-foreground hover:text-primary">
                <Bell className="w-5 h-5" />
              </Button>
              <Avatar className="h-10 w-10 border-2 border-white shadow-sm cursor-pointer">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
            </div>
          </header>

          {/* Section A — Platform summary metrics (top cards) */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {statsLoading ? (
              Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
            ) : todayStats ? (
              <>
                <StatCard 
                  title="Total Registered Users" 
                  value={todayStats.totalUsers.toLocaleString()}
                  subValue={`${todayStats.activeUsersDaily} active today`}
                  trend={calculateTrend(todayStats.totalUsers, yesterdayStats?.totalUsers || 0)}
                  icon={<Users className="w-4 h-4" />}
                />
                <StatCard 
                  title="Total Active Entities" 
                  value={todayStats.activeEntities.toLocaleString()}
                  subValue={`${todayStats.totalEntities} total`}
                  trend={calculateTrend(todayStats.activeEntities, yesterdayStats?.activeEntities || 0)}
                  icon={<Building2 className="w-4 h-4" />}
                />
                <StatCard 
                  title="Active Subscriptions" 
                  value={todayStats.activeSubscriptions.toLocaleString()}
                  subValue="Entities with active paid plans"
                  trend={calculateTrend(todayStats.activeSubscriptions, yesterdayStats?.activeSubscriptions || 0)}
                  icon={<CreditCard className="w-4 h-4" />}
                />
                <StatCard 
                  title="Total Territories Enabled" 
                  value={territoriesTable.filter(t => t.status === "Enabled").length}
                  subValue="Enabled regions across the platform"
                  icon={<MapPinned className="w-4 h-4" />}
                />
                <StatCard 
                  title="Internal Staff Accounts" 
                  value={staffTable.length}
                  subValue="Whodini team members with platform access"
                  icon={<ShieldCheck className="w-4 h-4" />}
                />
                <StatCard 
                  title="Active Feature Flags" 
                  value={featureFlagsTable.length}
                  subValue="Enabled modules and experiments"
                  icon={<Flag className="w-4 h-4" />}
                />
              </>
            ) : null}
          </section>

          {/* Analytics charts */}
          {false && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-semibold text-slate-900">
                Analytics
              </h2>
              <Button
                size="sm"
                variant="ghost"
                className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
              >
                View all
              </Button>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <Card className="theme-panel border-none">
                <CardHeader>
                  <CardTitle className="text-base font-display">
                    Entity & Subscription Trend
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {chartRange === "30d"
                      ? "Last 30 days growth trend."
                      : chartRange === "14d"
                      ? "Last 14 days growth trend."
                      : "Last 7 days growth trend."}
                  </p>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {statsLoading ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={growthChartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} dy={8} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                        <RechartsTooltip contentStyle={{ borderRadius: "12px", borderColor: "#E5E7EB", fontSize: "12px" }} />
                        <Legend />
                        <Line type="monotone" dataKey="entities" name="Entities" stroke="#F97316" strokeWidth={2.5} dot={false} />
                        <Line type="monotone" dataKey="subscriptions" name="Subscriptions" stroke="#0EA5E9" strokeWidth={2.5} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="theme-panel border-none">
                <CardHeader>
                  <CardTitle className="text-base font-display">MRR Trend</CardTitle>
                  <p className="text-xs text-muted-foreground">Monthly recurring revenue over selected range.</p>
                </CardHeader>
                <CardContent className="h-[300px]">
                  {statsLoading ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={mrrChartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                        <defs>
                          <linearGradient id="mrrFill" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#F97316" stopOpacity={0.35} />
                            <stop offset="95%" stopColor="#F97316" stopOpacity={0.05} />
                          </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} dy={8} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                        <RechartsTooltip contentStyle={{ borderRadius: "12px", borderColor: "#E5E7EB", fontSize: "12px" }} />
                        <Area type="monotone" dataKey="mrr" name="MRR ($)" stroke="#F97316" fill="url(#mrrFill)" strokeWidth={2.5} />
                      </AreaChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
              <Card className="theme-panel border-none">
                <CardHeader>
                  <CardTitle className="text-base font-display">User Activity</CardTitle>
                  <p className="text-xs text-muted-foreground">Daily vs weekly active users.</p>
                </CardHeader>
                <CardContent className="h-[250px]">
                  {statsLoading ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={userActivityChartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} dy={8} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} />
                        <RechartsTooltip contentStyle={{ borderRadius: "12px", borderColor: "#E5E7EB", fontSize: "12px" }} />
                        <Line type="monotone" dataKey="dailyActive" name="Daily Active" stroke="#0EA5E9" strokeWidth={2.2} dot={false} />
                        <Line type="monotone" dataKey="weeklyActive" name="Weekly Active" stroke="#6366F1" strokeWidth={2.2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="theme-panel border-none">
                <CardHeader>
                  <CardTitle className="text-base font-display">Platform Ratios</CardTitle>
                  <p className="text-xs text-muted-foreground">Subscription and active-entity rates.</p>
                </CardHeader>
                <CardContent className="h-[250px]">
                  {statsLoading ? (
                    <Skeleton className="h-full w-full rounded-xl" />
                  ) : (
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={ratioChartData} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} dy={8} />
                        <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: "#6B7280" }} domain={[0, 100]} />
                        <RechartsTooltip contentStyle={{ borderRadius: "12px", borderColor: "#E5E7EB", fontSize: "12px" }} />
                        <Line type="monotone" dataKey="subToEntityRate" name="Subs / Active Entities %" stroke="#F97316" strokeWidth={2.2} dot={false} />
                        <Line type="monotone" dataKey="entityActiveRate" name="Active / Total Entities %" stroke="#8B5CF6" strokeWidth={2.2} dot={false} />
                      </LineChart>
                    </ResponsiveContainer>
                  )}
                </CardContent>
              </Card>

              <Card className="theme-panel border-none">
                <CardHeader>
                  <CardTitle className="text-base font-display">
                    Services, Billing & Payments
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Plan-level billing amount and payment/subscription mix.
                  </p>
                </CardHeader>
                <CardContent className="h-[250px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={serviceBillingPaymentsData}
                      margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis
                        dataKey="plan"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        dy={8}
                      />
                      <YAxis
                        yAxisId="amount"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                      />
                      <YAxis
                        yAxisId="count"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          borderRadius: "12px",
                          borderColor: "#E5E7EB",
                          fontSize: "12px",
                        }}
                      />
                      <Legend />
                      <Bar
                        yAxisId="amount"
                        dataKey="billedAmount"
                        name="Billed Amount ($)"
                        fill="#F97316"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        yAxisId="count"
                        dataKey="activePayments"
                        name="Active Payments"
                        fill="#0EA5E9"
                        radius={[4, 4, 0, 0]}
                      />
                      <Bar
                        yAxisId="count"
                        dataKey="trialSubscriptions"
                        name="Trials"
                        fill="#8B5CF6"
                        radius={[4, 4, 0, 0]}
                      />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            <Card className="theme-panel border-none">
              <CardHeader>
                <CardTitle className="text-base font-display">
                  Services, Billing & Payments (By Date)
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  Date trend for billed amount and active payment volume.
                </p>
              </CardHeader>
              <CardContent className="h-[280px]">
                {statsLoading ? (
                  <Skeleton className="h-full w-full rounded-xl" />
                ) : (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={serviceBillingPaymentsByDateData}
                      margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                      <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                        dy={8}
                      />
                      <YAxis
                        yAxisId="amount"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                      />
                      <YAxis
                        yAxisId="count"
                        orientation="right"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 12, fill: "#6B7280" }}
                      />
                      <RechartsTooltip
                        contentStyle={{
                          borderRadius: "12px",
                          borderColor: "#E5E7EB",
                          fontSize: "12px",
                        }}
                      />
                      <Legend />
                      <Line
                        yAxisId="amount"
                        type="monotone"
                        dataKey="billedAmount"
                        name="Billed Amount ($)"
                        stroke="#F97316"
                        strokeWidth={2.5}
                        dot={false}
                      />
                      <Line
                        yAxisId="count"
                        type="monotone"
                        dataKey="activePayments"
                        name="Active Payments"
                        stroke="#0EA5E9"
                        strokeWidth={2.5}
                        dot={false}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </CardContent>
            </Card>

          </section>
          )}

          <section className="space-y-6">

            <div className="space-y-3">
              <p className="text-sm font-semibold text-slate-900">Revenue Metrics</p>
              <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <StatCard title="Current MRR" value={formatCurrencyAmount(currentMrr, "USD")} icon={<Wallet className="w-4 h-4" />} />
                <StatCard title="Revenue This Month (MTD)" value={formatCurrencyAmount(revenueThisMonth, "USD")} icon={<BarChart3 className="w-4 h-4" />} />
              </section>
            </div>

            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">Recent Subscription Activity</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Billing overview table for subscriptions with renewal tracking.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FilterSelect value={billingSubscriptionStatusFilter} onValueChange={setBillingSubscriptionStatusFilter}>
                    <FilterSelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Status" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All status</FilterSelectItem>
                      <FilterSelectItem value="active">Active</FilterSelectItem>
                      <FilterSelectItem value="trial">Trial</FilterSelectItem>
                      <FilterSelectItem value="canceled">Canceled</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <FilterSelect value={billingSubscriptionPlanFilter} onValueChange={setBillingSubscriptionPlanFilter}>
                    <FilterSelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Plan" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All plans</FilterSelectItem>
                      <FilterSelectItem value="personal">Personal</FilterSelectItem>
                      <FilterSelectItem value="business-brand">Business / Brand</FilterSelectItem>
                      <FilterSelectItem value="community-organization">Community / Organization</FilterSelectItem>
                      <FilterSelectItem value="event-organizer">Event Organizer</FilterSelectItem>
                      <FilterSelectItem value="agency">Agency</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <FilterSelect value={billingSubscriptionTerritoryFilter} onValueChange={setBillingSubscriptionTerritoryFilter}>
                    <FilterSelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Territory" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All territories</FilterSelectItem>
                      <FilterSelectItem value="us-east">US-East</FilterSelectItem>
                      <FilterSelectItem value="us-west">US-West</FilterSelectItem>
                      <FilterSelectItem value="eu-west">EU-West</FilterSelectItem>
                      <FilterSelectItem value="apac">APAC</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <FilterSelect value={billingRenewalRangeFilter} onValueChange={setBillingRenewalRangeFilter}>
                    <FilterSelectTrigger className="h-8 w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Renewal Date Range" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All renewal dates</FilterSelectItem>
                      <FilterSelectItem value="next7">Next 7 days</FilterSelectItem>
                      <FilterSelectItem value="next30">Next 30 days</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Active Subscriptions</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalActiveSubscriptions}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Trial Subscriptions</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalTrialSubscriptions}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Canceled Subscriptions</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalCanceledSubscriptions}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">New Subscriptions</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{newSubscriptionsLast7Days}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Last 7 Days</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Upcoming Renewals</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-primary leading-none">{upcomingRenewalsNext7Days}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Next 7 Days</p>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Entity Name</TableHead>
                      <TableHead>Account Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Renewal Date</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Territory</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBillingSubscriptions.map((row) => (
                      <TableRow key={row.id} className="hover:bg-orange-50/70">
                        <TableCell className="font-mono text-xs text-muted-foreground">{row.id}</TableCell>
                        <TableCell className="font-medium">{row.entityName}</TableCell>
                        <TableCell>{row.planName}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              row.status === "Active"
                                ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                                : row.status === "Trial"
                                ? "border-sky-200 text-sky-700 bg-sky-50"
                                : "border-slate-200 text-slate-700 bg-slate-50"
                            }
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.renewalDate}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrencyAmount(row.amount, row.currency)}
                        </TableCell>
                        <TableCell>{row.currency}</TableCell>
                        <TableCell>{row.territory}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 flex-wrap">
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">View</Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Cancel</Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Invoice History</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <div className="border-t border-border px-4 py-3 flex justify-center">
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                  >
                    View all
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">Revenue by Territory</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Billing distribution and territory contribution.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FilterSelect value={billingRevenueMonthFilter} onValueChange={setBillingRevenueMonthFilter}>
                    <FilterSelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Month" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="current">Current Month</FilterSelectItem>
                      <FilterSelectItem value="previous">Previous Month</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <FilterSelect value={billingRevenueStatusFilter} onValueChange={setBillingRevenueStatusFilter}>
                    <FilterSelectTrigger className="h-8 w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Territory status" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All territory status</FilterSelectItem>
                      <FilterSelectItem value="enabled">Enabled</FilterSelectItem>
                      <FilterSelectItem value="disabled">Disabled</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border p-4">
                  <p className="text-sm font-semibold text-slate-900">Payment Metrics</p>
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Paid Invoices</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalPaidInvoicesThisMonth}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Current Month</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Pending Invoices</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalPendingInvoices}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Overdue Invoices</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalOverdueInvoices}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Total Amount Paid</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">
                        {formatCurrencyAmount(totalAmountPaidThisMonth, "USD")}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Current Month</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Pending Amount</p>
                      <p className="mt-2 text-4xl font-display font-bold text-primary leading-none">
                        {formatCurrencyAmount(pendingAmount, "USD")}
                      </p>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Territory</TableHead>
                      <TableHead className="text-right">Active Subscriptions</TableHead>
                      <TableHead className="text-right">Total Revenue</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead className="text-right">% of Total Revenue</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {billingRevenueRows.map((row) => {
                      const contribution = billingRevenueTotal
                        ? ((row.totalRevenue / billingRevenueTotal) * 100).toFixed(1)
                        : "0.0";
                      return (
                        <TableRow key={row.territory} className="hover:bg-orange-50/70">
                          <TableCell className="font-medium">{row.territory}</TableCell>
                          <TableCell className="text-right">{row.activeSubscriptions}</TableCell>
                          <TableCell className="text-right">
                            {formatCurrencyAmount(row.totalRevenue, row.currency)}
                          </TableCell>
                          <TableCell>{row.currency}</TableCell>
                          <TableCell className="text-right">{contribution}%</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">View Detail</Button>
                              <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Export CSV</Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card> */}

            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">Recent Invoices</CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Invoice snapshot for payment operations and follow-up.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FilterSelect value={billingInvoiceStatusFilter} onValueChange={setBillingInvoiceStatusFilter}>
                    <FilterSelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Status" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All status</FilterSelectItem>
                      <FilterSelectItem value="paid">Paid</FilterSelectItem>
                      <FilterSelectItem value="pending">Pending</FilterSelectItem>
                      <FilterSelectItem value="overdue">Overdue</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <FilterSelect value={billingInvoiceDateRangeFilter} onValueChange={setBillingInvoiceDateRangeFilter}>
                    <FilterSelectTrigger className="h-8 w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Issued date range" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All issue dates</FilterSelectItem>
                      <FilterSelectItem value="last30">Last 30 days</FilterSelectItem>
                      <FilterSelectItem value="last90">Last 90 days</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <FilterSelect value={billingInvoiceTerritoryFilter} onValueChange={setBillingInvoiceTerritoryFilter}>
                    <FilterSelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <FilterSelectValue placeholder="Territory" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All territories</FilterSelectItem>
                      <FilterSelectItem value="us-east">US-East</FilterSelectItem>
                      <FilterSelectItem value="us-west">US-West</FilterSelectItem>
                      <FilterSelectItem value="eu-west">EU-West</FilterSelectItem>
                      <FilterSelectItem value="apac">APAC</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border pb-4 px-4">
                  <div className="mt-3 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-5 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Paid Invoices</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalPaidInvoicesThisMonth}</p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Current Month</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Pending Invoices</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalPendingInvoices}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Overdue Invoices</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalOverdueInvoices}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Total Amount Paid</p>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">
                        {formatCurrencyAmount(totalAmountPaidThisMonth, "USD")}
                      </p>
                      <p className="mt-1 text-[11px] text-muted-foreground">Current Month</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Pending Amount</p>
                      <p className="mt-2 text-4xl font-display font-bold text-primary leading-none">
                        {formatCurrencyAmount(pendingAmount, "USD")}
                      </p>
                    </div>
                  </div>
                </div>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Invoice ID</TableHead>
                      <TableHead>Entity</TableHead>
                      <TableHead className="text-right">Amount</TableHead>
                      <TableHead>Currency</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Issued Date</TableHead>
                      <TableHead>Due Date</TableHead>
                      <TableHead>Territory</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredBillingInvoices.map((row) => (
                      <TableRow key={row.invoiceId} className="hover:bg-orange-50/70">
                        <TableCell className="font-mono text-xs text-muted-foreground">{row.invoiceId}</TableCell>
                        <TableCell className="font-medium">{row.entity}</TableCell>
                        <TableCell className="text-right">
                          {formatCurrencyAmount(row.amount, row.currency)}
                        </TableCell>
                        <TableCell>{row.currency}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              row.status === "Paid"
                                ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                                : row.status === "Pending"
                                ? "border-sky-200 text-sky-700 bg-sky-50"
                                : "border-rose-200 text-rose-700 bg-rose-50"
                            }
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{row.issuedDate}</TableCell>
                        <TableCell>{row.dueDate}</TableCell>
                        <TableCell>{row.territory}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1 flex-wrap">
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">View Invoice</Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Resend</Button>
                            <Button size="sm" variant="ghost" className="h-7 px-2 text-xs">Mark Paid</Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

            {/* Core dashboard tables (UI only, static data) */}
            <section className="space-y-10">
            {/* Recently created entities & subscriptions */}
            {/* <div className="space-y-6"> */}
              {/* Table 1 — Recently created entities */}
              {/* <Card className="theme-panel border-none">
                <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-display">
                      Recently Created Entities
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Simple overview of new entities coming onto the platform.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <FilterSelect defaultValue="all">
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Status" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All status</FilterSelectItem>
                        <FilterSelectItem value="active">Active</FilterSelectItem>
                        <FilterSelectItem value="trial">Trial</FilterSelectItem>
                        <FilterSelectItem value="suspended">Suspended</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                    <FilterSelect defaultValue="all">
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Territory" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All territories</FilterSelectItem>
                        <FilterSelectItem value="us">US</FilterSelectItem>
                        <FilterSelectItem value="eu">EU</FilterSelectItem>
                        <FilterSelectItem value="apac">APAC</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Entity ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Type</TableHead>
                        <TableHead>Territory</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Created Date</TableHead>
                        <TableHead>Owner</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {entitiesTable.map((row) => (
                        <TableRow key={row.id} className="hover:bg-orange-50/70">
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {row.id}
                          </TableCell>
                          <TableCell className="font-medium">{row.name}</TableCell>
                          <TableCell className="text-sm text-slate-700">{row.type}</TableCell>
                          <TableCell className="text-sm text-slate-700">{row.territory}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                row.status === "Active"
                                  ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                                  : "border-amber-200 text-amber-700 bg-amber-50"
                              }
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-slate-700">{row.created}</TableCell>
                          <TableCell className="text-sm text-slate-700">{row.owner}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card> */}

              {/* Table 2 — Subscription overview */}
              {/* <Card className="theme-panel border-none">
                <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-display">
                      Subscription Overview (Recent Activity)
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      High-level billing snapshot. No live billing actions are wired
                      in this demo.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <FilterSelect defaultValue="all">
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Status" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All status</FilterSelectItem>
                        <FilterSelectItem value="active">Active</FilterSelectItem>
                        <FilterSelectItem value="trial">Trial</FilterSelectItem>
                        <FilterSelectItem value="canceled">Canceled</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                    <FilterSelect defaultValue="all">
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Plan" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All plans</FilterSelectItem>
                        <FilterSelectItem value="trial">Trial</FilterSelectItem>
                        <FilterSelectItem value="launch">Launch</FilterSelectItem>
                        <FilterSelectItem value="scale">Scale</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                    >
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Subscription ID</TableHead>
                        <TableHead>Entity</TableHead>
                        <TableHead>Plan</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Renewal Date</TableHead>
                        <TableHead>Currency</TableHead>
                        <TableHead className="text-right">Amount</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {subscriptionsTable.map((row) => (
                        <TableRow key={row.id} className="hover:bg-orange-50/70">
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {row.id}
                          </TableCell>
                          <TableCell className="font-medium">{row.entity}</TableCell>
                          <TableCell className="text-sm text-slate-700">{row.plan}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                row.status === "Active"
                                  ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                                  : row.status === "Trial"
                                  ? "border-sky-200 text-sky-700 bg-sky-50"
                                  : "border-slate-200 text-slate-700 bg-slate-50"
                              }
                            >
                              {row.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-sm text-slate-700">
                            {row.renewalDate}
                          </TableCell>
                          <TableCell className="text-sm text-slate-700">
                            {row.currency}
                          </TableCell>
                          <TableCell className="text-right text-sm text-slate-900">
                            {row.amount}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card> */}
            {/* </div> */}

            {/* Staff & territories */}
            <div className="space-y-6">
            

              {/* Table 4 — Territories status */}
              <Card className="theme-panel border-none">
                <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-display">
                      Territories Status
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Territory health and subscription coverage by region.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <FilterSelect value={territoryStatusFilter} onValueChange={setTerritoryStatusFilter}>
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Status" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All status</FilterSelectItem>
                        <FilterSelectItem value="enabled">Enabled</FilterSelectItem>
                        <FilterSelectItem value="disabled">Disabled</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                    <FilterSelect value={territoryCurrencyFilter} onValueChange={setTerritoryCurrencyFilter}>
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Currency" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All currencies</FilterSelectItem>
                        <FilterSelectItem value="usd">USD</FilterSelectItem>
                        <FilterSelectItem value="eur">EUR</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                    <FilterSelect value={billingRevenueMonthFilter} onValueChange={setBillingRevenueMonthFilter}>
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Revenue month" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="current">Current Month</FilterSelectItem>
                        <FilterSelectItem value="previous">Previous Month</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                   
                  </div>
                </CardHeader>
                <CardContent className="pt-2 space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Enabled Territories</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{enabledTerritories}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Entities in Regions</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">{totalTerritoryEntities}</p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">Total Revenue</p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">
                        {formatCurrencyAmount(combinedTerritoryRevenueTotal, "USD")}
                      </p>
                      <p className="mt-2 text-[11px] text-muted-foreground">
                        {billingRevenueMonthFilter === "previous" ? "Previous month" : "Current month"}
                      </p>
                    </div>
                  </div>

                  <Card className="theme-surface border-none overflow-hidden">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Territory</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Currency</TableHead>
                            <TableHead className="text-right">Entities</TableHead>
                            <TableHead className="text-right">Active Subs</TableHead>
                            <TableHead className="text-right">Total Revenue</TableHead>
                            <TableHead className="text-right">% of Total Revenue</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {combinedTerritoriesWithRevenue.map((row) => {
                            const contribution = combinedTerritoryRevenueTotal
                              ? ((row.totalRevenue / combinedTerritoryRevenueTotal) * 100).toFixed(1)
                              : "0.0";
                            return (
                              <TableRow key={row.code} className="hover:bg-orange-50/70">
                                <TableCell>
                                  <p className="font-medium text-slate-900">{row.name}</p>
                                  <p className="text-xs text-muted-foreground font-mono">{row.code}</p>
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
                                <TableCell className="text-sm text-slate-700">{row.currency}</TableCell>
                                <TableCell className="text-right font-medium">{row.entities}</TableCell>
                                <TableCell className="text-right font-medium">{row.activeSubscriptions}</TableCell>
                                <TableCell className="text-right font-medium">
                                  {formatCurrencyAmount(row.totalRevenue, row.revenueCurrency)}
                                </TableCell>
                                <TableCell className="text-right font-medium">{contribution}%</TableCell>
                              </TableRow>
                            );
                          })}
                        </TableBody>
                      </Table>
                      <div className="border-t border-border px-4 py-3 flex justify-center">
                        <Button
                          size="sm"
                          variant="ghost"
                          className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                        >
                          View all
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>
            </div>

              {/* Table 3 — Recently added staff */}
              <Card className="theme-panel border-none">
                <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                  <div>
                    <CardTitle className="text-base font-display">
                      Recently Added Platform Staff
                    </CardTitle>
                    <p className="text-xs text-muted-foreground mt-1">
                      Platform staff accounts that manage teams and entities.
                    </p>
                  </div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <FilterSelect defaultValue="all">
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Role" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All roles</FilterSelectItem>
                        <FilterSelectItem value="superadmin">SuperAdmin</FilterSelectItem>
                        <FilterSelectItem value="support">Support</FilterSelectItem>
                        <FilterSelectItem value="ops">Ops</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                    <FilterSelect defaultValue="all">
                      <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                        <FilterSelectValue placeholder="Status" />
                      </FilterSelectTrigger>
                      <FilterSelectContent>
                        <FilterSelectItem value="all">All status</FilterSelectItem>
                        <FilterSelectItem value="active">Active</FilterSelectItem>
                        <FilterSelectItem value="inactive">Inactive</FilterSelectItem>
                      </FilterSelectContent>
                    </FilterSelect>
                    <Button
                      size="sm"
                      variant="ghost"
                      className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                    >
                      View all
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="pt-2">
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                    {staffTable.map((row) => (
                      <div
                        key={row.id}
                        className="theme-surface rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <p className="text-sm font-semibold text-slate-900">{row.name}</p>
                            <p className="text-xs text-muted-foreground font-mono mt-0.5">{row.id}</p>
                          </div>
                          <Badge
                            variant="outline"
                            className="border-emerald-200 text-emerald-700 bg-emerald-50"
                          >
                            {row.status}
                          </Badge>
                        </div>

                        <div className="mt-3 space-y-1.5 text-xs text-slate-700">
                          <p>
                            <span className="text-muted-foreground">Role:</span>{" "}
                            <span className="font-medium">{row.role}</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">Created:</span>{" "}
                            <span>{row.created}</span>
                          </p>
                          <p>
                            <span className="text-muted-foreground">Last active:</span>{" "}
                            <span>{row.lastActive}</span>
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

            {/* Table 5 — Feature flags summary */}
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Feature Flags Summary
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Snapshot of feature flags across modules. No toggles are live in
                    this view.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <FilterSelect defaultValue="all">
                    <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                      <FilterSelectValue placeholder="Module" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All modules</FilterSelectItem>
                      <FilterSelectItem value="billing">Billing</FilterSelectItem>
                      <FilterSelectItem value="entities">Entities</FilterSelectItem>
                      <FilterSelectItem value="staff">Staff</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <FilterSelect defaultValue="all">
                    <FilterSelectTrigger className="h-8 w-[170px] min-w-[170px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700 [&>span]:line-clamp-none">
                      <FilterSelectValue placeholder="State" />
                    </FilterSelectTrigger>
                    <FilterSelectContent>
                      <FilterSelectItem value="all">All states</FilterSelectItem>
                      <FilterSelectItem value="on">On</FilterSelectItem>
                      <FilterSelectItem value="off">Off</FilterSelectItem>
                      <FilterSelectItem value="beta">Beta</FilterSelectItem>
                    </FilterSelectContent>
                  </FilterSelect>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="h-8 text-xs text-primary hover:text-primary hover:bg-primary/10"
                  >
                    View all
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="pt-2 space-y-3">
                {featureFlagsTable.map((row) => (
                  <div
                    key={row.key}
                    className="theme-surface rounded-xl p-4 transition-all hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                      <div>
                        <p className="font-mono text-xs text-muted-foreground">{row.key}</p>
                        <p className="text-sm font-medium text-slate-900 mt-1">{row.module}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={
                            row.defaultState === "On"
                              ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                              : row.defaultState === "Beta"
                              ? "border-sky-200 text-sky-700 bg-sky-50"
                              : "border-slate-200 text-slate-700 bg-slate-50"
                          }
                        >
                          {row.defaultState}
                        </Badge>
                        <Badge variant="outline" className="border-orange-200 bg-orange-50/70 text-orange-700">
                          {row.environment}
                        </Badge>
                      </div>
                    </div>

                    <div className="mt-3 text-xs text-slate-700 flex flex-col sm:flex-row sm:items-center sm:gap-4">
                      <p>
                        <span className="text-muted-foreground">Last updated:</span>{" "}
                        {row.lastUpdated}
                      </p>
                      <p>
                        <span className="text-muted-foreground">By:</span>{" "}
                        {row.updatedBy}
                      </p>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>

          </section>

        </div>
      </main>
    </div>
  );
}
