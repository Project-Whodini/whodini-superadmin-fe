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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Search, Users, Bell } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import { staffTable, type StaffRow } from "@/data/staff";

export default function Teams() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState<
    "all" | "SuperAdmin" | "Support" | "Ops" | "Finance"
  >("all");
  const [statusFilter, setStatusFilter] = useState<"all" | "Active" | "Inactive">(
    "all",
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [staff, setStaff] = useState<StaffRow[]>(staffTable);
  const [isCreating, setIsCreating] = useState(false);
  const [newStaff, setNewStaff] = useState<Pick<StaffRow, "name" | "role" | "status">>({
    name: "",
    role: "SuperAdmin",
    status: "Active",
  });

  const totalStaff = staff.length;
  const activeStaff = staff.filter((s) => s.status === "Active").length;

  const filteredStaff = useMemo(() => {
    return staff.filter((row) => {
      const matchesSearch =
        search.trim().length === 0 ||
        row.name.toLowerCase().includes(search.toLowerCase()) ||
        row.id.toLowerCase().includes(search.toLowerCase());

      const matchesRole =
        roleFilter === "all" || row.role === roleFilter;

      const matchesStatus =
        statusFilter === "all" || row.status === statusFilter;

      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [staff, search, roleFilter, statusFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, roleFilter, statusFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredStaff.length / pageSize));
  const paginatedStaff = filteredStaff.slice(
    (page - 1) * pageSize,
    page * pageSize,
  );

  function toggleStatus(id: string) {
    setStaff((current) =>
      current.map((row) =>
        row.id === id
          ? {
              ...row,
              status: row.status === "Active" ? "Inactive" : "Active",
            }
          : row,
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
                Teams &amp; Staff
              </h1>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                Internal staff accounts responsible for managing entities,
                territories, and billing.
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
              title="Internal staff accounts"
              value={totalStaff}
              subValue="Whodini team members with access"
              icon={<Users className="w-4 h-4" />}
            />
            <StatCard
              title="Active staff"
              value={activeStaff}
              subValue="Currently active team members"
              icon={<Users className="w-4 h-4" />}
            />
          </section>

          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Staff directory
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Internal operators with roles, status, and recent activity.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by name or ID..."
                      className="h-8 pl-9 rounded-lg bg-white border border-slate-200 text-sm placeholder:text-muted-foreground"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={roleFilter}
                    onValueChange={(
                      value: "all" | "SuperAdmin" | "Support" | "Ops" | "Finance",
                    ) => setRoleFilter(value)}
                  >
                    <SelectTrigger className="h-8 w-[170px] rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All roles</SelectItem>
                      <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                      <SelectItem value="Support">Support</SelectItem>
                      <SelectItem value="Ops">Ops</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select
                    value={statusFilter}
                    onValueChange={(value: "all" | "Active" | "Inactive") =>
                      setStatusFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[150px] rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All status</SelectItem>
                      <SelectItem value="Active">Active</SelectItem>
                      <SelectItem value="Inactive">Inactive</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isCreating} onOpenChange={setIsCreating}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 px-3 text-xs">
                      New staff member
                    </Button>
                  </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                      <DialogHeader>
                        <DialogTitle className="font-display">
                          New staff member
                        </DialogTitle>
                        <DialogDescription>
                          Add an internal team member with the appropriate role and status.
                          Changes take effect immediately for this workspace.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-5 pt-1">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="staff-name"
                              className="text-xs font-medium text-slate-700"
                            >
                              Full name
                            </Label>
                            <Input
                              id="staff-name"
                              autoFocus
                              placeholder="e.g. Alex Doe"
                              className="h-9 text-xs"
                              value={newStaff.name}
                              onChange={(e) =>
                                setNewStaff((current) => ({
                                  ...current,
                                  name: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-700">
                              Role
                            </Label>
                            <Select
                              value={newStaff.role}
                              onValueChange={(
                                value: "SuperAdmin" | "Support" | "Ops" | "Finance",
                              ) =>
                                setNewStaff((current) => ({
                                  ...current,
                                  role: value,
                                }))
                              }
                            >
                              <SelectTrigger className="h-9 text-xs rounded-lg border border-slate-200 bg-white">
                                <SelectValue placeholder="Select role" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="SuperAdmin">SuperAdmin</SelectItem>
                                <SelectItem value="Support">Support</SelectItem>
                                <SelectItem value="Ops">Ops</SelectItem>
                                <SelectItem value="Finance">Finance</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-700">
                              Status
                            </Label>
                            <Select
                              value={newStaff.status}
                              onValueChange={(value: StaffStatus) =>
                                setNewStaff((current) => ({
                                  ...current,
                                  status: value,
                                }))
                              }
                            >
                              <SelectTrigger className="h-9 text-xs rounded-lg border border-slate-200 bg-white">
                                <SelectValue placeholder="Select status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Active">Active</SelectItem>
                                <SelectItem value="Inactive">Inactive</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </div>
                      <DialogFooter>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-8 px-3 text-xs"
                          onClick={() => {
                            setIsCreating(false);
                            setNewStaff({
                              name: "",
                              role: "SuperAdmin",
                              status: "Active",
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-3 text-xs"
                          onClick={() => {
                            if (!newStaff.name.trim()) {
                              return;
                            }
                            const nextIdNumber =
                              staff.reduce((max, row) => {
                                const numeric = parseInt(
                                  row.id.replace("ST_", ""),
                                  10,
                                );
                                return Number.isNaN(numeric)
                                  ? max
                                  : Math.max(max, numeric);
                              }, 0) + 1;
                            const nextId = `ST_${String(nextIdNumber).padStart(
                              2,
                              "0",
                            )}`;
                            const today = new Date()
                              .toISOString()
                              .slice(0, 10);
                            setStaff((current) => [
                              ...current,
                              {
                                id: nextId,
                                name: newStaff.name.trim(),
                                role: newStaff.role,
                                status: newStaff.status,
                                created: today,
                                lastActive: today,
                              },
                            ]);
                            setIsCreating(false);
                            setNewStaff({
                              name: "",
                              role: "SuperAdmin",
                              status: "Active",
                            });
                          }}
                        >
                          Save staff member
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="border-b border-border p-2" />
                <Table className="[&_tr]:border-slate-200">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="pl-6">Staff ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Created</TableHead>
                      <TableHead>Last Active</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedStaff.map((row: StaffRow) => (
                      <TableRow
                        key={row.id}
                        className="hover:bg-orange-50/70 transition-colors"
                      >
                        <TableCell className="font-mono text-xs text-muted-foreground pl-6">
                          {row.id}
                        </TableCell>
                        <TableCell className="font-medium">{row.name}</TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {row.role}
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className="border-emerald-200 text-emerald-700 bg-emerald-50"
                          >
                            {row.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {row.created}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {row.lastActive}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            size="sm"
                            variant="ghost"
                            className="h-7 px-2 text-xs"
                            onClick={() => toggleStatus(row.id)}
                          >
                            {row.status === "Active" ? "Deactivate" : "Activate"}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredStaff.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No staff match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {filteredStaff.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
                    <span>
                      Showing{" "}
                      {(page - 1) * pageSize + 1}-
                      {Math.min(page * pageSize, filteredStaff.length)} of{" "}
                      {filteredStaff.length}
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

