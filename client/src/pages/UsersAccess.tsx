import { useEffect, useMemo, useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search, Bell } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const platformUsers = [
  {
    id: "U_1001",
    name: "Maria Santos",
    email: "maria@email.com",
    type: "Personal",
    status: "Active",
    created: "2025-11-02",
    lastActive: "2026-02-10",
  },
  {
    id: "U_1002",
    name: "James Lee",
    email: "james@brandco.com",
    type: "Business",
    status: "Active",
    created: "2025-12-10",
    lastActive: "2026-02-11",
  },
  {
    id: "U_1003",
    name: "Carla Gomez",
    email: "carla@email.com",
    type: "Personal",
    status: "Suspended",
    created: "2025-10-14",
    lastActive: "2026-01-30",
  },
  {
    id: "U_1004",
    name: "Ethan Wong",
    email: "ethan@agencypro.com",
    type: "Business",
    status: "Active",
    created: "2025-09-01",
    lastActive: "2026-02-09",
  },
  {
    id: "U_1005",
    name: "Sofia Kim",
    email: "sofia@email.com",
    type: "Personal",
    status: "Active",
    created: "2026-01-05",
    lastActive: "2026-02-11",
  },
];

const platformRoles = [
  {
    name: "SuperAdmin",
    description: "Full platform control",
    usersCount: 2,
    lastUpdated: "2026-01-20",
  },
  {
    name: "Support",
    description: "Manage users & entities",
    usersCount: 4,
    lastUpdated: "2026-01-15",
  },
  {
    name: "Finance",
    description: "Billing & refunds only",
    usersCount: 2,
    lastUpdated: "2026-01-10",
  },
  {
    name: "Ops",
    description: "Feature flags & system tools",
    usersCount: 3,
    lastUpdated: "2026-01-18",
  },
  {
    name: "ReadOnly",
    description: "View access only",
    usersCount: 1,
    lastUpdated: "2026-01-05",
  },
];

const internalStaff = [
  {
    id: "ST_01",
    name: "Admin Root",
    email: "admin@whodini.com",
    role: "SuperAdmin",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "2026-02-11",
  },
  {
    id: "ST_02",
    name: "Karen Lim",
    email: "support@whodini.com",
    role: "Support",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "2026-02-10",
  },
  {
    id: "ST_03",
    name: "Mark Evans",
    email: "finance@whodini.com",
    role: "Finance",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "2026-02-10",
  },
  {
    id: "ST_04",
    name: "Leo Tan",
    email: "ops@whodini.com",
    role: "Ops",
    status: "Active",
    twoFA: "Enabled",
    lastActive: "2026-02-11",
  },
  {
    id: "ST_05",
    name: "Nina Cruz",
    email: "readonly@whodini.com",
    role: "ReadOnly",
    status: "Active",
    twoFA: "Disabled",
    lastActive: "2026-02-08",
  },
];

export default function UsersAccess() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Suspended" | "Disabled">("all");
  const [typeFilter, setTypeFilter] = useState<"all" | "Personal" | "Business">("all");
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const totalUsers = platformUsers.length;
  const activeUsers = platformUsers.filter((u) => u.status === "Active").length;
  const suspendedUsers = platformUsers.filter((u) => u.status === "Suspended").length;

  const filteredUsers = useMemo(() => {
    return platformUsers.filter((user) => {
      const matchesSearch =
        search.trim().length === 0 ||
        user.name.toLowerCase().includes(search.toLowerCase()) ||
        user.email.toLowerCase().includes(search.toLowerCase()) ||
        user.id.toLowerCase().includes(search.toLowerCase());

      const matchesStatus =
        statusFilter === "all" ||
        user.status.toLowerCase() === statusFilter.toLowerCase();

      const matchesType =
        typeFilter === "all" || user.type === typeFilter;

      return matchesSearch && matchesStatus && matchesType;
    });
  }, [search, statusFilter, typeFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, statusFilter, typeFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredUsers.length / pageSize));
  const paginatedUsers = filteredUsers.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto max-h-screen">
        <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
          {/* Header */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">Users &amp; Access</h1>
              <p className="text-muted-foreground mt-1 max-w-xl">
                Manage all platform users, staff roles, and access controls from a single view.
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

          {/* Summary metrics */}
          <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            <StatCard
              title="Total platform users"
              value={totalUsers}
              subValue="All users with accounts"
              icon={<Search className="w-4 h-4" />}
            />
            <StatCard
              title="Active users"
              value={activeUsers}
              subValue="Currently active accounts"
              icon={<Search className="w-4 h-4" />}
            />
            <StatCard
              title="Suspended users"
              value={suspendedUsers}
              subValue="Accounts with restricted access"
              icon={<Search className="w-4 h-4" />}
            />
          </section>

          {/* Platform users table */}
          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Users management
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    All platform users with filters for status and account type.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name, email, or ID..."
                      className="pl-9 bg-white border border-input text-sm placeholder:text-muted-foreground"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={statusFilter}
                    onValueChange={(value: "all" | "Active" | "Suspended" | "Disabled") =>
                      setStatusFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Suspended">Suspended</SelectItem>
                      <SelectItem value="Disabled">Disabled</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={typeFilter}
                    onValueChange={(value: "all" | "Personal" | "Business") =>
                      setTypeFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-orange-200/80 bg-white/75 text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Account type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All types</SelectItem>
                      <SelectItem value="Personal">Personal</SelectItem>
                      <SelectItem value="Business">Business</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border p-2" />
                <Table className="[&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">User ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-orange-50/70 transition-colors">
                        <TableCell className="font-mono text-xs text-muted-foreground pl-6">
                          {user.id}
                        </TableCell>
                        <TableCell className="font-medium">{user.name}</TableCell>
                        <TableCell className="text-slate-700">
                          <a
                            href={`mailto:${user.email}`}
                            className="underline underline-offset-2 decoration-slate-300 hover:text-slate-900"
                          >
                            {user.email}
                          </a>
                        </TableCell>
                        <TableCell>{user.type}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={
                              user.status === "Active"
                                ? "border-emerald-200 text-emerald-700 bg-emerald-50"
                                : "border-amber-200 text-amber-700 bg-amber-50"
                            }
                          >
                            {user.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-slate-700 text-sm">{user.created}</TableCell>
                        <TableCell className="text-slate-700 text-sm">{user.lastActive}</TableCell>
                      </TableRow>
                    ))}
                    {filteredUsers.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No users match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {filteredUsers.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
                    <span>
                      Showing{" "}
                      {(page - 1) * pageSize + 1}-
                      {Math.min(page * pageSize, filteredUsers.length)} of{" "}
                      {filteredUsers.length}
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

          {/* Internal staff */}
          {/* <section className="space-y-3">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-semibold text-slate-900">
                  Internal Staff (Whodini Team)
                </h2>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Section 5
                </span>
              </div>
              <Card className="shadow-sm border-none h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    Internal operators with access to admin tools. This table is read-only in the demo.
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Staff ID</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>2FA</TableHead>
                        <TableHead>Last Active</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {internalStaff.map((staff) => (
                        <TableRow key={staff.id} className="hover:bg-slate-50/60">
                          <TableCell className="font-mono text-xs text-muted-foreground">
                            {staff.id}
                          </TableCell>
                          <TableCell className="font-medium">{staff.name}</TableCell>
                          <TableCell className="text-slate-700">
                            <a
                              href={`mailto:${staff.email}`}
                              className="underline underline-offset-2 decoration-slate-300 hover:text-slate-900"
                            >
                              {staff.email}
                            </a>
                          </TableCell>
                          <TableCell>{staff.role}</TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className="border-emerald-500/40 text-emerald-300 bg-emerald-500/10"
                            >
                              {staff.status}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge
                              variant="outline"
                              className={
                                staff.twoFA === "Enabled"
                                  ? "border-sky-200 text-sky-700 bg-sky-50"
                                  : "border-amber-200 text-amber-700 bg-amber-50"
                              }
                            >
                              {staff.twoFA}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-slate-700 text-sm">{staff.lastActive}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>
          </section> */}
        </div>
      </main>
    </div>
  );
}

