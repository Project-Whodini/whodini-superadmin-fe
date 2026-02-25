import { 
  useDashboardStats, 
} from "@/hooks/use-dashboard";
import { Sidebar } from "@/components/Sidebar";
import { StatCard } from "@/components/StatCard";
import { PageHeader } from "@/components/PageHeader";
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
  BarChart3,
  Search,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
import {
  territoriesTable,
  billingRevenueByTerritoryTable,
} from "@/data/territories";
import { billingRecentInvoicesTable } from "@/data/invoices";
import { ENTITIES } from "@/pages/Entities";
import { Link } from "wouter";

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

const eventOrganizersTable = [
  {
    id: "EORG_001",
    name: "Bright Lights Festival Co.",
    owner: "Hannah Lee",
    ownerEmail: "hannah@brightlightsfest.com",
    created: "2026-02-06",
  },
  {
    id: "EORG_002",
    name: "Summit City Events",
    owner: "Marcus Green",
    ownerEmail: "marcus@summitcityevents.io",
    created: "2026-02-05",
  },
  {
    id: "EORG_003",
    name: "Harborline Conferences",
    owner: "Amelia Ross",
    ownerEmail: "amelia@harborlineconf.com",
    created: "2026-02-04",
  },
  {
    id: "EORG_004",
    name: "Aurora Live Productions",
    owner: "Noah Patel",
    ownerEmail: "noah@auroralive.pro",
    created: "2026-02-03",
  },
  {
    id: "EORG_005",
    name: "Neighborhood Block Party Co.",
    owner: "Grace Miller",
    ownerEmail: "grace@blockpartyco.org",
    created: "2026-02-02",
  },
];

const communitiesTable = [
  {
    id: "COMM_001",
    name: "Neighborhood Makers Collective",
    owner: "Jasmine Cole",
    ownerEmail: "jasmine@makerscollective.org",
    created: "2026-02-06",
  },
  {
    id: "COMM_002",
    name: "Urban Garden Network",
    owner: "Leo Martinez",
    ownerEmail: "leo@urbangarden.network",
    created: "2026-02-04",
  },
  {
    id: "COMM_003",
    name: "Global Youth Alliance",
    owner: "Sofia Petrova",
    ownerEmail: "sofia@gyalliance.org",
    created: "2026-02-02",
  },
  {
    id: "COMM_004",
    name: "Harbor Arts Council",
    owner: "Ethan Walsh",
    ownerEmail: "ethan@harborarts.org",
    created: "2026-01-31",
  },
  {
    id: "COMM_005",
    name: "Community Hub LA",
    owner: "Carla Gomez",
    ownerEmail: "carla@communityla.org",
    created: "2026-02-01",
  },
];

const agenciesTable = [
  {
    id: "AGCY_001",
    name: "Atlas Retail Agency",
    owner: "Nina Cruz",
    ownerEmail: "nina@atlasretail.com",
    created: "2026-02-06",
  },
  {
    id: "AGCY_002",
    name: "Helios Creative Agency",
    owner: "Mark Evans",
    ownerEmail: "mark@helioscreative.agency",
    created: "2026-02-04",
  },
  {
    id: "AGCY_003",
    name: "Northwind Brand Partners",
    owner: "Maria Santos",
    ownerEmail: "maria@northwindpartners.co",
    created: "2026-02-03",
  },
  {
    id: "AGCY_004",
    name: "Summit City Media Group",
    owner: "Daniel Kim",
    ownerEmail: "daniel@summitmediagroup.io",
    created: "2026-02-02",
  },
  {
    id: "AGCY_005",
    name: "Harborline Talent Agency",
    owner: "Amelia Ross",
    ownerEmail: "amelia@harborlinetalent.com",
    created: "2026-02-01",
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

import { staffTable } from "@/data/staff";
import { featureFlagsTable } from "@/data/featureFlags";

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
  const [activeBusinessSearch, setActiveBusinessSearch] = useState("");
  const [eventOrganizerSearch, setEventOrganizerSearch] = useState("");
  const [communitySearch, setCommunitySearch] = useState("");
  const [agencySearch, setAgencySearch] = useState("");

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

  const activeBusinessSubscriptions = billingSubscriptionsTable.filter(
    (row) => row.status === "Active" && row.planName === "Business / Brand"
  );
  const totalActiveBusinesses = activeBusinessSubscriptions.length;
  const activeBusinessRevenue = activeBusinessSubscriptions.reduce(
    (sum, row) => sum + row.amount,
    0
  );
  const newActiveBusinessesLast30Days = activeBusinessSubscriptions.filter((row) =>
    inLastDays(row.createdDate, 30)
  ).length;

  const registeredBusinessBrands = billingSubscriptionsTable.filter(
    (row) => row.planName === "Business / Brand"
  ).length;
  const registeredCommunitiesOrganizations = billingSubscriptionsTable.filter(
    (row) => row.planName === "Community / Organization"
  ).length;
  const registeredEventOrganizers = billingSubscriptionsTable.filter(
    (row) => row.planName === "Event Organizer"
  ).length;
  const registeredAgencies = billingSubscriptionsTable.filter(
    (row) => row.planName === "Agency"
  ).length;

  // Static, high-level mock counts for summary cards
  const mockUserCount = 12840;
  const mockBusinessCount = 3420;
  const mockCommunityCount = 1980;
  const mockEventOrganizerCount = 960;
  const mockAgencyCount = 1740;

  const activeBusinessEntities = ENTITIES.filter(
    (entity) => entity.type === "Business" && entity.status === "approved"
  ).sort(
    (a, b) =>
      new Date(b.created).getTime() - new Date(a.created).getTime()
  );

  const filteredActiveBusinesses = activeBusinessEntities.filter((entity) => {
    const matchesSearch =
      activeBusinessSearch.trim().length === 0 ||
      entity.name.toLowerCase().includes(activeBusinessSearch.toLowerCase()) ||
      entity.owner.toLowerCase().includes(activeBusinessSearch.toLowerCase()) ||
      entity.id.toLowerCase().includes(activeBusinessSearch.toLowerCase());
    return matchesSearch;
  });

  const filteredEventOrganizers = [...eventOrganizersTable]
    .sort(
      (a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .filter((entity) => {
      const matchesSearch =
        eventOrganizerSearch.trim().length === 0 ||
        entity.name.toLowerCase().includes(eventOrganizerSearch.toLowerCase()) ||
        entity.owner.toLowerCase().includes(eventOrganizerSearch.toLowerCase()) ||
        entity.id.toLowerCase().includes(eventOrganizerSearch.toLowerCase());
      return matchesSearch;
    });

  const filteredCommunities = [...communitiesTable]
    .sort(
      (a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .filter((entity) => {
      const matchesSearch =
        communitySearch.trim().length === 0 ||
        entity.name.toLowerCase().includes(communitySearch.toLowerCase()) ||
        entity.owner.toLowerCase().includes(communitySearch.toLowerCase()) ||
        entity.id.toLowerCase().includes(communitySearch.toLowerCase());
      return matchesSearch;
    });

  const filteredAgencies = [...agenciesTable]
    .sort(
      (a, b) =>
        new Date(b.created).getTime() - new Date(a.created).getTime()
    )
    .filter((entity) => {
      const matchesSearch =
        agencySearch.trim().length === 0 ||
        entity.name.toLowerCase().includes(agencySearch.toLowerCase()) ||
        entity.owner.toLowerCase().includes(agencySearch.toLowerCase()) ||
        entity.id.toLowerCase().includes(agencySearch.toLowerCase());
      return matchesSearch;
    });

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
        <PageHeader />
        <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-7xl">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-gradient">
                Dashboard
              </h1>
              <p className="text-muted-foreground mt-1">
                High-level visibility into subscription activity, revenue
                distribution, and invoice/payment status across territories.
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
            </div>
          </div>

          {/* Section A — Platform summary metrics (top cards) */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {statsLoading ? (
              Array(6).fill(0).map((_, i) => <Skeleton key={i} className="h-32 w-full rounded-xl" />)
            ) : todayStats ? (
              <>
                <StatCard 
                  title="Users" 
                  value={mockUserCount.toLocaleString()}
                  subValue={`${todayStats.activeUsersDaily} active today`}
                  trend={calculateTrend(mockUserCount, yesterdayStats?.totalUsers || 0)}
                  icon={<Users className="w-4 h-4" />}
                />
                <StatCard 
                  title="Businesses / Brands" 
                  value={mockBusinessCount.toLocaleString()}
                  subValue="Registered business & brand accounts"
                  icon={<Building2 className="w-4 h-4" />}
                />
                <StatCard 
                  title="Communities / Organizations" 
                  value={mockCommunityCount.toLocaleString()}
                  subValue="Registered community & organization accounts"
                  icon={<Users className="w-4 h-4" />}
                />
                <StatCard 
                  title="Event Organizers" 
                  value={mockEventOrganizerCount.toLocaleString()}
                  subValue="Registered event organizer accounts"
                  icon={<CalendarDays className="w-4 h-4" />}
                />
                <StatCard 
                  title="Agencies" 
                  value={mockAgencyCount.toLocaleString()}
                  subValue="Registered agency accounts"
                  icon={<Building2 className="w-4 h-4" />}
                />
              </>
            ) : null}
          </section>

          {/* Active businesses table */}
          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Active Businesses
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    List of all approved business entities.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, owner, or ID..."
                      className="h-8 pl-9 rounded-lg bg-white border border-slate-200 text-sm placeholder:text-muted-foreground"
                      value={activeBusinessSearch}
                      onChange={(e) => setActiveBusinessSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <Table className="border-t border-border [&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredActiveBusinesses.map((entity) => (
                      <TableRow
                        key={entity.id}
                        className="hover:bg-orange-50/70 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground pl-6">
                          {entity.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {entity.name}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          <div className="flex flex-col">
                            <span>{entity.owner}</span>
                            <a
                              href={`mailto:${entity.ownerEmail}`}
                              className="text-xs text-muted-foreground underline underline-offset-2 decoration-slate-300"
                            >
                              {entity.ownerEmail}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {entity.created}
                        </TableCell>
                        <TableCell>
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                          >
                            <Link href={`/entities/${entity.id}`}>
                              View account
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredActiveBusinesses.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No active businesses match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

              {/* Communities / organizations table */}
              <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Communities / Organizations
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    List of all community and organization entities.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, owner, or ID..."
                      className="h-8 pl-9 rounded-lg bg-white border border-slate-200 text-sm placeholder:text-muted-foreground"
                      value={communitySearch}
                      onChange={(e) => setCommunitySearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <Table className="border-t border-border [&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCommunities.map((entity) => (
                      <TableRow
                        key={entity.id}
                        className="hover:bg-orange-50/70 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground pl-6">
                          {entity.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {entity.name}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          <div className="flex flex-col">
                            <span>{entity.owner}</span>
                            <a
                              href={`mailto:${entity.ownerEmail}`}
                              className="text-xs text-muted-foreground underline underline-offset-2 decoration-slate-300"
                            >
                              {entity.ownerEmail}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {entity.created}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                          >
                            View account
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredCommunities.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No communities or organizations match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Event organizers table */}
          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Event Organizers
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    List of all event organizer entities.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, owner, or ID..."
                      className="h-8 pl-9 rounded-lg bg-white border border-slate-200 text-sm placeholder:text-muted-foreground"
                      value={eventOrganizerSearch}
                      onChange={(e) => setEventOrganizerSearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <Table className="border-t border-border [&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEventOrganizers.map((entity) => (
                      <TableRow
                        key={entity.id}
                        className="hover:bg-orange-50/70 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground pl-6">
                          {entity.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {entity.name}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          <div className="flex flex-col">
                            <span>{entity.owner}</span>
                            <a
                              href={`mailto:${entity.ownerEmail}`}
                              className="text-xs text-muted-foreground underline underline-offset-2 decoration-slate-300"
                            >
                              {entity.ownerEmail}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {entity.created}
                        </TableCell>
                        <TableCell>
                          <Button
                            asChild
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                          >
                            <Link href={`/entities/${entity.id}`}>
                              View account
                            </Link>
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredEventOrganizers.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No event organizers match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

      

          {/* Agencies table */}
          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Agencies
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    List of all agency entities.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, owner, or ID..."
                      className="h-8 pl-9 rounded-lg bg-white border border-slate-200 text-sm placeholder:text-muted-foreground"
                      value={agencySearch}
                      onChange={(e) => setAgencySearch(e.target.value)}
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0 pt-2">
                <Table className="border-t border-border [&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredAgencies.map((entity) => (
                      <TableRow
                        key={entity.id}
                        className="hover:bg-orange-50/70 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground pl-6">
                          {entity.id}
                        </TableCell>
                        <TableCell className="font-medium">
                          {entity.name}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          <div className="flex flex-col">
                            <span>{entity.owner}</span>
                            <a
                              href={`mailto:${entity.ownerEmail}`}
                              className="text-xs text-muted-foreground underline underline-offset-2 decoration-slate-300"
                            >
                              {entity.ownerEmail}
                            </a>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {entity.created}
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                          >
                            View account
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredAgencies.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={5}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No agencies match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>
        </div>
      </main>
    </div>
  );
}
