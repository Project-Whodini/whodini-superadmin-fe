import { Sidebar } from "@/components/Sidebar";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

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
  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto max-h-screen">
        <div className="container mx-auto p-4 md:p-8 space-y-8 max-w-7xl">
          {/* Header & filters */}
          <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <h1 className="text-3xl font-display font-bold text-slate-900">Users &amp; Access</h1>
              <p className="text-muted-foreground mt-1 max-w-xl">
                Manage all platform users, staff roles, and access controls from a single view.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
              <div className="relative w-full sm:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search users or staff..."
                  className="pl-9 bg-white border border-input text-sm placeholder:text-muted-foreground"
                />
              </div>
              <Select defaultValue="all">
                <SelectTrigger className="w-full sm:w-[160px] bg-white border border-input text-sm">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All statuses</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="disabled">Disabled</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
              <Button className="whitespace-nowrap bg-orange-500 hover:bg-orange-600 text-sm">
                Invite new user
              </Button>
            </div>
          </header>

          {/* Platform users table */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-display font-semibold text-slate-900">
                Platform Users (All Users)
              </h2>
              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Section 3
              </span>
            </div>
            <Card className="shadow-sm border-none">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm text-muted-foreground">
                  All users across the platform. Filters and actions are illustrative only.
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Active</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {platformUsers.map((user) => (
                      <TableRow key={user.id} className="hover:bg-slate-50/60">
                        <TableCell className="font-mono text-xs text-muted-foreground">
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
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </section>

          {/* Roles & internal staff */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
            {/* Platform roles */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-display font-semibold text-slate-900">
                  Platform Roles
                </h2>
                <span className="text-xs uppercase tracking-wide text-muted-foreground">
                  Section 4
                </span>
              </div>
              <Card className="shadow-sm border-none h-full">
                <CardHeader className="pb-2">
                  <CardTitle className="text-sm text-muted-foreground">
                    RBAC templates for platform-level access. Data is static for this demo.
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Role Name</TableHead>
                        <TableHead>Description</TableHead>
                        <TableHead className="text-right">Users Count</TableHead>
                        <TableHead className="text-right">Last Updated</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {platformRoles.map((role) => (
                        <TableRow key={role.name} className="hover:bg-slate-50/60">
                          <TableCell className="font-medium">{role.name}</TableCell>
                          <TableCell className="text-slate-700 text-sm">
                            {role.description}
                          </TableCell>
                          <TableCell className="text-right">{role.usersCount}</TableCell>
                          <TableCell className="text-right text-slate-700 text-sm">
                            {role.lastUpdated}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </div>

            {/* Internal staff */}
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
          </section>
        </div>
      </main>
    </div>
  );
}

