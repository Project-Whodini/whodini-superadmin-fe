import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: number; // percentage, positive is good
  trendLabel?: string;
  icon: React.ReactNode;
  className?: string;
  subValue?: string;
}

export function StatCard({ title, value, trend, trendLabel = "vs last week", icon, className, subValue }: StatCardProps) {
  const isPositive = trend && trend > 0;
  const isNeutral = trend === 0;

  return (
    <Card
      className={cn(
        "theme-panel overflow-hidden transition-all duration-300 hover:-translate-y-0.5 hover:shadow-md",
        className
      )}
    >
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-600 font-sans">
          {title}
        </CardTitle>
        <div className="h-9 w-9 rounded-xl border border-primary/20 bg-primary/10 flex items-center justify-center text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1">
          <div className="text-2xl font-bold font-display tracking-tight text-foreground">
            {value}
          </div>
          
          {subValue && (
            <p className="text-xs text-slate-500">{subValue}</p>
          )}

          {trend !== undefined && (
            <div className="flex items-center text-xs mt-1">
              <span
                className={cn(
                  "flex items-center font-medium",
                  isPositive ? "text-emerald-600" : isNeutral ? "text-muted-foreground" : "text-rose-600"
                )}
              >
                {isPositive ? <ArrowUpRight className="h-3 w-3 mr-1" /> : isNeutral ? <Minus className="h-3 w-3 mr-1" /> : <ArrowDownRight className="h-3 w-3 mr-1" />}
                {Math.abs(trend)}%
              </span>
              <span className="text-muted-foreground ml-2 truncate">
                {trendLabel}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
