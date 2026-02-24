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
import { Search, Flag, Bell } from "lucide-react";
import { StatCard } from "@/components/StatCard";
import {
  featureFlagsTable,
  type FeatureFlagRow,
  type FeatureFlagState,
} from "@/data/featureFlags";

export default function Services() {
  const [search, setSearch] = useState("");
  const [stateFilter, setStateFilter] = useState<"all" | FeatureFlagState>(
    "all",
  );
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [flags, setFlags] = useState<FeatureFlagRow[]>(featureFlagsTable);
  const [editingKey, setEditingKey] = useState<string | null>(null);
  const [editingDraft, setEditingDraft] = useState<FeatureFlagRow | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newFlag, setNewFlag] = useState<FeatureFlagRow>({
    key: "",
    module: "Billing",
    defaultState: "On",
    environment: "Production",
    lastUpdated: new Date().toISOString().slice(0, 10),
    updatedBy: "Demo user",
  });

  const totalFlags = flags.length;
  const enabledFlags = flags.filter(
    (f) => f.defaultState === "On",
  ).length;
  const betaFlags = flags.filter(
    (f) => f.defaultState === "Beta",
  ).length;

  const filteredFlags = useMemo(() => {
    return flags.filter((row) => {
      const matchesSearch =
        search.trim().length === 0 ||
        row.key.toLowerCase().includes(search.toLowerCase()) ||
        row.module.toLowerCase().includes(search.toLowerCase());

      const matchesState =
        stateFilter === "all" || row.defaultState === stateFilter;

      return matchesSearch && matchesState;
    });
  }, [flags, search, stateFilter]);

  useEffect(() => {
    setPage(1);
  }, [search, stateFilter]);

  const totalPages = Math.max(1, Math.ceil(filteredFlags.length / pageSize));
  const paginatedFlags = filteredFlags.slice(
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
                Services &amp; Feature Flags
              </h1>
              <p className="text-muted-foreground mt-1 max-w-2xl">
                Configuration of core services and feature flags across modules.
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
              title="Total feature flags"
              value={totalFlags}
              subValue="Service toggles across modules"
              icon={<Flag className="w-4 h-4" />}
            />
            <StatCard
              title="Enabled flags"
              value={enabledFlags}
              subValue="Live in production"
              icon={<Flag className="w-4 h-4" />}
            />
            <StatCard
              title="Beta experiments"
              value={betaFlags}
              subValue="Flags in beta rollout"
              icon={<Flag className="w-4 h-4" />}
            />
          </section>

          <section className="space-y-3">
            <Card className="theme-panel border-none">
              <CardHeader className="pb-2 flex flex-row items-center justify-between gap-4">
                <div>
                  <CardTitle className="text-base font-display">
                    Services and feature flags
                  </CardTitle>
                  <p className="text-xs text-muted-foreground mt-1">
                    Snapshot of feature flags across modules. No toggles are
                    live in this view.
                  </p>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <div className="relative w-full sm:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search by flag key or module..."
                      className="h-8 pl-9 rounded-lg bg-white border border-slate-200 text-sm placeholder:text-muted-foreground"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </div>
                  <Select
                    value={stateFilter}
                    onValueChange={(value: "all" | FeatureFlagState) =>
                      setStateFilter(value)
                    }
                  >
                    <SelectTrigger className="h-8 w-[170px] rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700">
                      <SelectValue placeholder="State" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All states</SelectItem>
                      <SelectItem value="On">On</SelectItem>
                      <SelectItem value="Off">Off</SelectItem>
                      <SelectItem value="Beta">Beta</SelectItem>
                    </SelectContent>
                  </Select>
                  <Dialog open={isCreating} onOpenChange={setIsCreating}>
                  <DialogTrigger asChild>
                    <Button size="sm" className="h-8 px-3 text-xs">
                      New feature flag
                    </Button>
                  </DialogTrigger>
                    <DialogContent className="sm:max-w-xl">
                      <DialogHeader>
                        <DialogTitle className="font-display">
                          New feature flag
                        </DialogTitle>
                        <DialogDescription>
                          Define a new feature toggle for this workspace.
                          Changes take effect immediately for the selected module and environment.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="space-y-5 pt-1">
                        <div className="grid grid-cols-1 gap-4">
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="flag-key"
                              className="text-xs font-medium text-slate-700"
                            >
                              Flag key
                            </Label>
                            <Input
                              id="flag-key"
                              autoFocus
                              placeholder="e.g. billing.v2-checkout"
                              className="h-9 text-xs font-mono placeholder:text-slate-400"
                              value={newFlag.key}
                              onChange={(e) =>
                                setNewFlag((current) => ({
                                  ...current,
                                  key: e.target.value,
                                }))
                              }
                            />
                            <p className="text-[11px] text-muted-foreground">
                              Use a namespaced, lowercase key.
                            </p>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-700">
                              Module
                            </Label>
                            <Select
                              value={newFlag.module}
                              onValueChange={(
                                value: "Billing" | "Entities" | "Staff",
                              ) =>
                                setNewFlag((current) => ({
                                  ...current,
                                  module: value,
                                }))
                              }
                            >
                              <SelectTrigger className="h-9 text-xs rounded-lg border border-slate-200 bg-white">
                                <SelectValue placeholder="Select module" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Billing">Billing</SelectItem>
                                <SelectItem value="Entities">Entities</SelectItem>
                                <SelectItem value="Staff">Staff</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label className="text-xs font-medium text-slate-700">
                              Default state
                            </Label>
                            <Select
                              value={newFlag.defaultState}
                              onValueChange={(value: FeatureFlagState) =>
                                setNewFlag((current) => ({
                                  ...current,
                                  defaultState: value,
                                }))
                              }
                            >
                              <SelectTrigger className="h-9 text-xs rounded-lg border border-slate-200 bg-white">
                                <SelectValue placeholder="Select state" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="On">On</SelectItem>
                                <SelectItem value="Off">Off</SelectItem>
                                <SelectItem value="Beta">Beta</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="flag-environment"
                              className="text-xs font-medium text-slate-700"
                            >
                              Environment
                            </Label>
                            <Input
                              id="flag-environment"
                              placeholder="e.g. Production"
                              className="h-9 text-xs"
                              value={newFlag.environment}
                              onChange={(e) =>
                                setNewFlag((current) => ({
                                  ...current,
                                  environment: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="flag-updated-by"
                              className="text-xs font-medium text-slate-700"
                            >
                              Updated by
                            </Label>
                            <Input
                              id="flag-updated-by"
                              placeholder="e.g. Demo user"
                              className="h-9 text-xs"
                              value={newFlag.updatedBy}
                              onChange={(e) =>
                                setNewFlag((current) => ({
                                  ...current,
                                  updatedBy: e.target.value,
                                }))
                              }
                            />
                          </div>
                          <div className="space-y-1.5">
                            <Label
                              htmlFor="flag-last-updated"
                              className="text-xs font-medium text-slate-700"
                            >
                              Last updated
                            </Label>
                            <Input
                              id="flag-last-updated"
                              type="date"
                              className="h-9 text-xs"
                              value={newFlag.lastUpdated}
                              onChange={(e) =>
                                setNewFlag((current) => ({
                                  ...current,
                                  lastUpdated: e.target.value,
                                }))
                              }
                            />
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
                            setNewFlag({
                              key: "",
                              module: "Billing",
                              defaultState: "On",
                              environment: "Production",
                              lastUpdated: new Date().toISOString().slice(0, 10),
                              updatedBy: "Demo user",
                            });
                          }}
                        >
                          Cancel
                        </Button>
                        <Button
                          size="sm"
                          className="h-8 px-3 text-xs"
                          onClick={() => {
                            if (!newFlag.key.trim()) {
                              return;
                            }
                            setFlags((current) => [
                              ...current,
                              {
                                ...newFlag,
                                key: newFlag.key.trim(),
                              },
                            ]);
                            setIsCreating(false);
                            setNewFlag({
                              key: "",
                              module: "Billing",
                              defaultState: "On",
                              environment: "Production",
                              lastUpdated: new Date().toISOString().slice(0, 10),
                              updatedBy: "Demo user",
                            });
                          }}
                        >
                          Save feature flag
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
                      <TableHead>Flag key</TableHead>
                      <TableHead>Module</TableHead>
                      <TableHead>State</TableHead>
                      <TableHead>Environment</TableHead>
                      <TableHead>Last updated</TableHead>
                      <TableHead>Updated by</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {paginatedFlags.map((row: FeatureFlagRow) => (
                      <TableRow
                        key={row.key}
                        className="hover:bg-orange-50/70 transition-colors"
                      >
                        <TableCell>
                          <p className="font-mono text-xs text-muted-foreground">
                            {row.key}
                          </p>
                        </TableCell>
                        <TableCell className="text-sm font-medium text-slate-900">
                          {editingKey === row.key && editingDraft ? (
                            <Select
                              value={editingDraft.module}
                              onValueChange={(
                                value: "Billing" | "Entities" | "Staff",
                              ) =>
                                setEditingDraft((current) =>
                                  current
                                    ? { ...current, module: value }
                                    : current,
                                )
                              }
                            >
                              <SelectTrigger className="h-8 w-[150px] rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="Billing">Billing</SelectItem>
                                <SelectItem value="Entities">
                                  Entities
                                </SelectItem>
                                <SelectItem value="Staff">Staff</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
                            row.module
                          )}
                        </TableCell>
                        <TableCell>
                          {editingKey === row.key && editingDraft ? (
                            <Select
                              value={editingDraft.defaultState}
                              onValueChange={(value: FeatureFlagState) =>
                                setEditingDraft((current) =>
                                  current
                                    ? { ...current, defaultState: value }
                                    : current,
                                )
                              }
                            >
                              <SelectTrigger className="h-8 w-[130px] rounded-lg border border-slate-200 bg-white text-xs font-medium text-slate-700">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="On">On</SelectItem>
                                <SelectItem value="Off">Off</SelectItem>
                                <SelectItem value="Beta">Beta</SelectItem>
                              </SelectContent>
                            </Select>
                          ) : (
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
                          )}
                        </TableCell>
                        <TableCell>
                          {editingKey === row.key && editingDraft ? (
                            <Input
                              value={editingDraft.environment}
                              onChange={(e) =>
                                setEditingDraft((current) =>
                                  current
                                    ? {
                                        ...current,
                                        environment: e.target.value,
                                      }
                                    : current,
                                )
                              }
                              className="h-8 w-[140px] rounded-lg bg-white border border-slate-200 text-xs"
                            />
                          ) : (
                            <Badge
                              variant="outline"
                              className="border-orange-200 bg-orange-50/70 text-orange-700"
                            >
                              {row.environment}
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {row.lastUpdated}
                        </TableCell>
                        <TableCell className="text-sm text-slate-700">
                          {row.updatedBy}
                        </TableCell>
                        <TableCell className="text-right">
                          {editingKey === row.key && editingDraft ? (
                            <div className="flex justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => {
                                  setEditingKey(null);
                                  setEditingDraft(null);
                                }}
                              >
                                Cancel
                              </Button>
                              <Button
                                size="sm"
                                className="h-7 px-3 text-xs"
                                onClick={() => {
                                  if (!editingDraft) return;
                                  const now = new Date();
                                  const today = now.toISOString().slice(0, 10);
                                  setFlags((current) =>
                                    current.map((flag) =>
                                      flag.key === editingDraft.key
                                        ? {
                                            ...editingDraft,
                                            lastUpdated: today,
                                            updatedBy: "Demo user",
                                          }
                                        : flag,
                                    ),
                                  );
                                  setEditingKey(null);
                                  setEditingDraft(null);
                                }}
                              >
                                Save
                              </Button>
                            </div>
                          ) : (
                            <div className="flex justify-end gap-1">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                              >
                                View
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs"
                                onClick={() => {
                                  setEditingKey(row.key);
                                  setEditingDraft(row);
                                }}
                              >
                                Edit
                              </Button>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                    {filteredFlags.length === 0 && (
                      <TableRow>
                        <TableCell
                          colSpan={7}
                          className="py-8 text-center text-sm text-muted-foreground"
                        >
                          No feature flags match the current filters.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
                {filteredFlags.length > 0 && (
                  <div className="flex items-center justify-between px-4 py-3 border-t border-border text-xs text-muted-foreground">
                    <span>
                      Showing{" "}
                      {(page - 1) * pageSize + 1}-
                      {Math.min(page * pageSize, filteredFlags.length)} of{" "}
                      {filteredFlags.length}
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

