import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { HeaderUserActions } from "@/components/HeaderUserActions";

type PageHeaderProps = {
  className?: string;
  rightSlot?: ReactNode;
};

export function PageHeader({ className, rightSlot }: PageHeaderProps) {
  return (
    <div className="sticky top-0 z-30 w-full border-b border-border/40 bg-slate-50/50 backdrop-blur-xl">
      <div
        className={cn(
          "flex items-center justify-end pr-4 md:pr-8 py-3",
          className,
        )}
      >
        {rightSlot ?? <HeaderUserActions />}
      </div>
    </div>
  );
}


