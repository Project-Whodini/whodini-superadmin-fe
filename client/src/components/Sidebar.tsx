import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";
import appHeaderLogo from "@/assets/app-header-logo.png";
import { 
  LayoutDashboard, 
  UserCog,
  Building2, 
  ReceiptText,
  Map,
  Briefcase,
  Settings, 
  Bell, 
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const NAV_ITEMS = [
  { label: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { label: "Entities", icon: Building2, href: "/entities" },
  { label: "Invoices", icon: ReceiptText, href: "/invoices" },
  { label: "Territories", icon: Map, href: "/territories" },
  { label: "Teams/Staff", icon: UserCog, href: "/teams" },
  { label: "Services", icon: Briefcase, href: "/services" },
  // { label: "Settings", icon: Settings, href: "/settings" },
];

export function Sidebar() {
  const [location, navigate] = useLocation();

  const NavContent = () => (
    <div className="flex flex-col h-full bg-slate-50/50">
      <div className="p-4 border-b border-border/40">
        <div className="flex items-center gap-3">
          <img
            src={appHeaderLogo}
            alt="App logo"
            className="w-8 h-8 rounded-lg object-cover shadow-md shadow-orange-500/20"
          />
          <span className="font-display font-bold text-xl tracking-tight">Whodini Admin</span>
        </div>
      </div>

      <div className="flex-1 py-6 px-4 space-y-1">
        {NAV_ITEMS.map((item) => {
          const isActive = location === item.href;
          return (
            <Link key={item.href} href={item.href} className={cn(
              "flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group",
              isActive 
                ? "bg-white text-primary shadow-sm ring-1 ring-border" 
                : "text-muted-foreground hover:bg-white/60 hover:text-foreground"
            )}>
              <item.icon className={cn("w-5 h-5", isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground")} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>

      <div className="p-4 border-t border-border/40">
        <div className="bg-gradient-to-br from-orange-100 to-orange-50 p-4 rounded-xl border border-orange-200/50">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-white rounded-lg shadow-sm">
              <Bell className="w-4 h-4 text-orange-600" />
            </div>
            <div>
              <h4 className="font-semibold text-sm text-orange-950">New Alerts</h4>
              <p className="text-xs text-orange-700/80 mt-1">
                You have 3 unread system alerts to review.
              </p>
            </div>
          </div>
        </div>
        <button
          className="flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-red-600 transition-colors mt-6 w-full px-2"
          onClick={() => navigate("/login")}
        >
          <LogOut className="w-4 h-4" />
          <span>Sign Out</span>
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:block w-72 border-r border-border h-screen sticky top-0 bg-slate-50/30 backdrop-blur-xl z-30">
        <NavContent />
      </aside>

      {/* Mobile Sidebar */}
      <Sheet>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon" className="lg:hidden absolute left-4 top-4 z-40">
            <Menu className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="p-0 w-72">
          <NavContent />
        </SheetContent>
      </Sheet>
    </>
  );
}
