import { Sidebar } from "@/components/Sidebar";
import { PageHeader } from "@/components/PageHeader";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ENTITIES, type EntityRow, type EntityStatus } from "@/pages/Entities";
import { Link, useRoute } from "wouter";
import { ArrowLeft, CheckCircle2, XCircle, FileText } from "lucide-react";

function statusBadgeVariant(status: EntityStatus) {
  if (status === "approved") {
    return "border-emerald-200 text-emerald-700 bg-emerald-50";
  }
  if (status === "rejected") {
    return "border-rose-200 text-rose-700 bg-rose-50";
  }
  return "border-amber-200 text-amber-700 bg-amber-50";
}

function getEntityFromRoute(): EntityRow | undefined {
  const [, params] = useRoute("/entities/:id");
  if (!params?.id) return undefined;
  return ENTITIES.find((e) => e.id === params.id);
}

export default function EntityDetails() {
  const entity = getEntityFromRoute();

  return (
    <div className="flex min-h-screen bg-[#F8FAFC]">
      <Sidebar />

      <main className="flex-1 overflow-y-auto max-h-screen">
        <PageHeader />
        <div className="container mx-auto p-4 md:p-8 space-y-6 max-w-4xl">
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="px-0 text-xs text-muted-foreground hover:text-primary"
            onClick={() => {
              if (window.history.length > 1) {
                window.history.back();
              }
            }}
          >
            <Link href="/entities">
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back to entities
            </Link>
          </Button>

          {entity ? (
            <Card className="theme-panel border-none">
              <CardHeader className="flex flex-row items-center justify-between gap-4">
                <div className="space-y-1">
                  <CardTitle className="text-2xl font-display">
                    {entity.name}
                  </CardTitle>
                  <p className="text-muted-foreground mt-1">
                    Account details and verification information.
                  </p>
                  {entity.status === "pending" && (
                    <div className="flex flex-wrap gap-2 pt-2">
                      <Button
                        size="sm"
                        variant="outline"
                        className="h-8 px-3 text-xs"
                      >
                        <XCircle className="w-3 h-3 mr-1" />
                        Reject
                      </Button>
                      <Button
                        size="sm"
                        className="h-8 px-3 text-xs bg-emerald-500 hover:bg-emerald-600"
                      >
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        Approve
                      </Button>
                    </div>
                  )}
                </div>
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
              </CardHeader>
              <CardContent className="space-y-8">
                {/* Account Logo */}
                <section className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-sm font-display font-semibold text-slate-900">
                        Account Logo
                      </h2>
                      <p className="text-xs text-muted-foreground mt-1">
                        Logo currently used to represent this account in the
                        platform.
                      </p>
                    </div>
                  </div>
                  <div className="inline-flex rounded-xl border border-dashed border-slate-200 bg-white px-4 py-4 items-center">
                    <div className="h-16 w-16 rounded-lg border border-slate-200 bg-slate-50 flex items-center justify-center text-lg font-display font-semibold text-slate-700">
                      {entity.name.charAt(0).toUpperCase()}
                    </div>
                  </div>
                </section>

                {/* Basic Information */}
                <section className="space-y-4">
                  <div>
                    <h2 className="text-sm font-display font-semibold text-slate-900">
                      Basic Information
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Core profile information for this account.
                    </p>
                  </div>
                  <div className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-700">
                        Account Name
                      </Label>
                      <Input
                        value={entity.name}
                        disabled
                        className="bg-slate-50 border-slate-200 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-700">
                        Account Description
                      </Label>
                      <Textarea
                        placeholder="Briefly describe this account..."
                        value={`${entity.name} operates as a ${entity.type.toLowerCase()} account in ${entity.territory}.`}
                        disabled
                        className="bg-slate-50 border-slate-200 text-sm min-h-[96px]"
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-700">
                          Category
                        </Label>
                        <Input
                          value="Technology"
                          disabled
                          className="bg-slate-50 border-slate-200 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-700">
                          Website
                        </Label>
                        <Input
                          value="https://example.com"
                          disabled
                          className="bg-slate-50 border-slate-200 text-sm"
                        />
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-700">
                          Country of Operation
                        </Label>
                        <Input
                          value={
                            entity.territory === "EU-West"
                              ? "European Union"
                              : entity.territory === "APAC"
                              ? "APAC"
                              : "United States"
                          }
                          disabled
                          className="bg-slate-50 border-slate-200 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-700">
                          Territory
                        </Label>
                        <Input
                          value={entity.territory}
                          disabled
                          className="bg-slate-50 border-slate-200 text-sm"
                        />
                      </div>
                      <div className="space-y-1.5">
                        <Label className="text-xs text-slate-700">
                          Account Type
                        </Label>
                        <Input
                          value={entity.type}
                          disabled
                          className="bg-slate-50 border-slate-200 text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </section>

                {/* Owner / contact (read-only) */}
                <section className="space-y-4">
                  <div>
                    <h2 className="text-sm font-display font-semibold text-slate-900">
                      Contact Information
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Primary contact information for this account.
                    </p>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-700">
                        Full Name
                      </Label>
                      <Input
                        value={entity.owner}
                        disabled
                        className="bg-slate-50 border-slate-200 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-700">Email</Label>
                      <Input
                        value={entity.ownerEmail}
                        disabled
                        className="bg-slate-50 border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-700">
                        Phone Number
                      </Label>
                      <Input
                        value="+1 (555) 123-4567"
                        disabled
                        className="bg-slate-50 border-slate-200 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-700">
                        Role
                      </Label>
                      <Input
                        value="Owner / Admin"
                        disabled
                        className="bg-slate-50 border-slate-200 text-sm"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-slate-700">
                        Created
                      </Label>
                      <Input
                        value={entity.created}
                        disabled
                        className="bg-slate-50 border-slate-200 text-sm"
                      />
                    </div>
                  </div>
                </section>

                {/* Uploaded documents (read-only) */}
                <section className="space-y-4">
                  <div>
                    <h2 className="text-sm font-display font-semibold text-slate-900">
                      Uploaded Documents
                    </h2>
                    <p className="text-xs text-muted-foreground mt-1">
                      Documents on file for this account.
                    </p>
                  </div>
                  <Card className="theme-surface border-none overflow-hidden">
                    <CardContent className="p-0">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Document</TableHead>
                            <TableHead>Uploaded</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          <TableRow className="hover:bg-orange-50/70">
                            <TableCell className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-md bg-slate-100 flex items-center justify-center">
                                <FileText className="w-3 h-3 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  valid_ids.pdf
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-700">
                              2026-02-10
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                              >
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-orange-50/70">
                            <TableCell className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-md bg-slate-100 flex items-center justify-center">
                                <FileText className="w-3 h-3 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  registration_doc.pdf
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-700">
                              2026-02-08
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                              >
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                          <TableRow className="hover:bg-orange-50/70">
                            <TableCell className="flex items-center gap-2">
                              <div className="h-7 w-7 rounded-md bg-slate-100 flex items-center justify-center">
                                <FileText className="w-3 h-3 text-slate-600" />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-slate-900">
                                  supporting_doc.pdf
                                </p>
                              </div>
                            </TableCell>
                            <TableCell className="text-sm text-slate-700">
                              2026-02-11
                            </TableCell>
                            <TableCell className="text-right">
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-7 px-2 text-xs text-primary hover:text-primary hover:bg-primary/5"
                              >
                                Download
                              </Button>
                            </TableCell>
                          </TableRow>
                        </TableBody>
                      </Table>
                    </CardContent>
                  </Card>
                </section>
              </CardContent>
            </Card>
          ) : (
            <Card className="theme-panel border-none">
              <CardHeader>
                <CardTitle className="text-base font-display">
                  Entity not found
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  We couldn&apos;t find this entity. It may have been removed or
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

