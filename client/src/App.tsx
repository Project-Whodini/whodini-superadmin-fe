import { Switch, Route, Router as WouterRouter } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import UsersAccess from "@/pages/UsersAccess";
import Entities from "@/pages/Entities";
import EntityDetails from "@/pages/EntityDetails";
import Invoices from "@/pages/Invoices";
import InvoiceDetails from "@/pages/InvoiceDetails";
import Territories from "@/pages/Territories";
import Teams from "@/pages/Teams";
import Services from "@/pages/Services";
import Login from "@/pages/Login";

function AppRoutes() {
  return (
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/users" component={UsersAccess} />
      <Route path="/entities" component={Entities} />
      <Route path="/entities/:id" component={EntityDetails} />
      <Route path="/invoices" component={Invoices} />
      <Route path="/invoices/:id" component={InvoiceDetails} />
      <Route path="/territories" component={Territories} />
      <Route path="/teams" component={Teams} />
      <Route path="/services" component={Services} />
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
