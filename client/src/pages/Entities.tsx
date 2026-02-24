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
import { Search, CheckCircle2, XCircle, Clock, Bell } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Link } from "wouter";

export type EntityStatus = "pending" | "approved" | "rejected";

export type EntityRow = {
  id: string;
  name: string;
  type: "Business" | "Community" | "Personal";
  owner: string;
  ownerEmail: string;
  territory: string;
  created: string;
  status: EntityStatus;
};

export const ENTITIES: EntityRow[] = [
  {
    id: "ENT_001",
    name: "Northwind Studio",
    type: "Business",
    owner: "Maria Santos",
    ownerEmail: "maria@northwind.co",
    territory: "US-East",
    created: "2026-02-05",
    status: "approved",
  },
  {
    id: "ENT_002",
    name: "Globex Europe",
    type: "Business",
    owner: "James Lee",
    ownerEmail: "james@globex.eu",
    territory: "EU-West",
    created: "2026-02-03",
    status: "pending",
  },
  {
    id: "ENT_003",
    name: "Community Hub LA",
    type: "Community",
    owner: "Carla Gomez",
    ownerEmail: "carla@communityla.org",
    territory: "US-West",
    created: "2026-02-01",
    status: "approved",
  },
  {
    id: "ENT_004",
    name: "Helios Labs",
    type: "Business",
    owner: "Mark Evans",
    ownerEmail: "mark@helioslabs.ai",
    territory: "APAC",
    created: "2026-01-29",
    status: "pending",
  },
  {
    id: "ENT_005",
    name: "Atlas Retail",
    type: "Business",
    owner: "Nina Cruz",
    ownerEmail: "nina@atlasretail.com",
    territory: "US-East",
    created: "2026-01-25",
    status: "rejected",
  },
];

function statusBadgeVariant(status: EntityStatus) {
  if (status === "approved") {
    return "border-emerald-200 text-emerald-700 bg-emerald-50";
  }
  if (status === "rejected") {
    return "border-rose-200 text-rose-700 bg-rose-50";
  }
  return "border-amber-200 text-amber-700 bg-amber-50";
}

export default function Entities() {
  const [entities, setEntities] = useState<EntityRow[]>(ENTITIES);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | EntityStatus>("all");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "Business" | "Community" | "Personal"
  >("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const summary = useMemo(() => {
    const pending = entities.filter((e) => e.status === "pending").length;
    const approved = entities.filter((e) => e.status === "approved").length;
    const rejected = entities.filter((e) => e.status === "rejected").length;
    return { pending, approved, rejected };
  }, [entities]);

  const filteredEntities = useMemo(() => {
    return entities.filter((entity) => {
      const matchesSearch =
        search.trim().length === 0 ||
        entity.name.toLowerCase().includes(search.toLowerCase()) ||
        entity.owner.toLowerCase().includes(search.toLowerCase()) ||
        entity.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" || entity.status === statusFilter;

      const matchesType =
        typeFilter === "all" || entity.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [entities, search, statusFilter, typeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredEntities.length / pageSize));
  const paginatedEntities = filteredEntities.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function updateStatus(id: string, status: EntityStatus) {
    setEntities((current) =>
      current.map((entity) =>
        entity.id === id ? { ...entity, status } : entity,
      ),
    );
  }

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto max-h-screen">
        <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">
                Entities
              </h1>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                Central place to review new entities, manage risk, and approve
                or reject access to the Whodini platform.
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
              title="Pending approvals"
              value={summary.pending}
              subValue="Entities waiting for manual review"
              icon={<Clock className="w-4 h-4" />}
            />
            <StatCard
              title="Approved entities"
              value={summary.approved}
              subValue="Live entities with platform access"
              icon={<CheckCircle2 className="w-4 h-4" />}
            />
            <StatCard
              title="Rejected / blocked"
              value={summary.rejected}
              subValue="Declined or blocked from activation"
              icon={<XCircle className="w-4 h-4" />}
            />
          </section>

          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                  Entities management
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Approval queue and status overview for entities across
                    territories.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, owner, or ID..."
                      className="pl-9 bg-white border border-input text-sm placeholder:text-muted-foreground"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value: "all" | EntityStatus) =>
                      setStatusFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="approved">Approved</SelectItem>
                      <SelectItem value="rejected">Rejected</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={typeFilter}
                    onValueChange={(
                      value: "all" | "Business" | "Community" | "Personal",
                    ) => setTypeFilter(value)}
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Entity type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                      <SelectItem value="Community">Community</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border p-2">
                  {/* <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-3">
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                          Total Entities
                        </p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">
                        {entities.length}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                          Pending Approvals
                        </p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">
                        {summary.pending}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                          Approved
                        </p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">
                        {summary.approved}
                      </p>
                    </div>
                    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-3 shadow-sm">
                      <div>
                        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400">
                          Rejected / Blocked
                        </p>
                      </div>
                      <p className="mt-2 text-4xl font-display font-bold text-slate-900 leading-none">
                        {summary.rejected}
                      </p>
                    </div>
                  </div> */}
                </div>
                <Table className="[&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Entity ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Owner</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Account</TableHead>
                      <TableHead className="text-right pr-6">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedEntities.map((entity) => (
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
                          {entity.type}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={statusBadgeVariant(entity.status)}
                          >
                            {entity.status === "pending"
                              ? "Pending review"
                              : entity.status === "approved"
                              ? "Approved"
                              : "Rejected"}
                          </Badge>
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
                        <TableCell className="text-right pr-6">
                          <div className="flex justify-end gap-2">
                            <Button
                              size="sm"
                              variant="outline"
                              className="h-8 px-3 text-xs"
                              onClick={() => updateStatus(entity.id, "rejected")}
                              disabled={entity.status === "rejected"}
                            >
                              <XCircle className="w-3 h-3 mr-1" />
                              Reject
                            </Button>
                            <Button
                              size="sm"
                              className="h-8 px-3 text-xs bg-emerald-500 hover:bg-emerald-600"
                              onClick={() => updateStatus(entity.id, "approved")}
                              disabled={entity.status === "approved"}
                            >
                              <CheckCircle2 className="w-3 h-3 mr-1" />
                              Approve
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredEntities.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={8}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No entities match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {filteredEntities.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
                    <span>
                      Showing{" "}
                      {(page - 1) * pageSize + 1}-
                      {Math.min(page * pageSize, filteredEntities.length)} of{" "}
                      {filteredEntities.length}
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

