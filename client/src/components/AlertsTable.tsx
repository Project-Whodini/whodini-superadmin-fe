import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert } from "@shared/schema";
import { format } from "date-fns";
import { CheckCircle, AlertTriangle, XCircle, Loader2 } from "lucide-react";
import { useUpdateAlertStatus } from "@/hooks/use-dashboard";
import { cn } from "@/lib/utils";

interface AlertsTableProps {
  alerts: Alert[];
}

export function AlertsTable({ alerts }: AlertsTableProps) {
  const updateStatus = useUpdateAlertStatus();

  const formatAlertTime = (timestamp: unknown) => {
    if (!timestamp) return "—";
    const d = new Date(timestamp as any);
    if (Number.isNaN(d.getTime())) return "—";
    return format(d, "MMM dd, HH:mm:ss");
  };

  const handleResolve = (id: number) => {
    updateStatus.mutate({ id, status: "resolved" });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical": return "bg-red-100 text-red-700 border-red-200 hover:bg-red-100";
      case "high": return "bg-orange-100 text-orange-700 border-orange-200 hover:bg-orange-100";
      case "medium": return "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100";
      default: return "bg-slate-100 text-slate-700 border-slate-200 hover:bg-slate-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "resolved": return <CheckCircle className="w-4 h-4 text-green-500" />;
      case "investigating": return <Loader2 className="w-4 h-4 text-orange-500 animate-spin" />;
      default: return <AlertTriangle className="w-4 h-4 text-red-500" />;
    }
  };

  return (
    <Card className="shadow-sm border-none overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-display">Critical Alerts</CardTitle>
        <Badge variant="outline" className="font-normal">Last 24 hours</Badge>
      </CardHeader>
      <CardContent className="p-0">
        <Table>
          <TableHeader className="bg-slate-50/50">
            <TableRow>
              <TableHead className="w-[180px]">Time</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Severity</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {alerts.map((alert) => (
              <TableRow key={alert.id} className="hover:bg-slate-50/50 transition-colors">
                <TableCell className="font-mono text-xs text-muted-foreground">
                  {formatAlertTime(alert.timestamp as any)}
                </TableCell>
                <TableCell className="font-medium">{alert.type}</TableCell>
                <TableCell className="text-muted-foreground text-sm">{alert.affectedModule}</TableCell>
                <TableCell>
                  <Badge className={cn("capitalize shadow-none border", getSeverityColor(alert.severity))}>
                    {alert.severity}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    {getStatusIcon(alert.status)}
                    <span className="capitalize text-sm">{alert.status}</span>
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  {alert.status !== "resolved" && (
                    <Button 
                      size="sm" 
                      variant="ghost" 
                      className="h-8 text-xs font-medium text-primary hover:text-primary hover:bg-primary/5"
                      onClick={() => handleResolve(alert.id)}
                      disabled={updateStatus.isPending}
                    >
                      Mark Resolved
                    </Button>
                  )}
                </TableCell>
              </TableRow>
            ))}
            {alerts.length === 0 && (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No active alerts. System is healthy.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
