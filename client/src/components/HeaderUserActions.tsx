import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { Bell } from "lucide-react";

type HeaderUserActionsProps = {
  className?: string;
};

export function HeaderUserActions({ className }: HeaderUserActionsProps) {
  return (
    <div className={cn("flex items-center gap-3", className)}>
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
  );
}

