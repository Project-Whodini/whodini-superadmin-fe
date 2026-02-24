import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import UsersAccess from "@/pages/UsersAccess";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/users" component={UsersAccess} />
      <Route path="/entities" component={Dashboard} />
      <Route path="/invoices" component={Dashboard} />
      <Route path="/territories" component={Dashboard} />
      <Route path="/teams" component={Dashboard} />
      <Route path="/services" component={Dashboard} />
      <Route path="/settings" component={Dashboard} />

      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  const base =
    import.meta.env.BASE_URL === "/"
      ? ""
      : import.meta.env.BASE_URL.replace(/\/$/, "");

  return (
    <WouterRouter base={base}>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <AppRoutes />
        </TooltipProvider>
      </QueryClientProvider>
    </WouterRouter>
  );
}

export default App;
