import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

type DashboardStats = z.infer<(typeof api.dashboard.getStats.responses)[200]>;

// Helper to handle API responses strictly
async function fetchAndValidate<T>(url: string, schema: z.ZodSchema<T>): Promise<T> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const data = await res.json();
  return schema.parse(data);
}

function buildMockDashboardStats(): DashboardStats {
  const today = new Date();

  const days = 30;
  const stats: any[] = [];

  for (let i = 0; i < days; i++) {
    const d = new Date(today);
    d.setDate(d.getDate() - i);

    // For the most recent two days, lock values so the
    // GitHub Pages demo matches the local dashboard snapshot.
    if (i === 0) {
      // "Today" – matches your local dashboard screenshot
      stats.push({
        date: d.toISOString().slice(0, 10),
        totalUsers: 1050,
        activeUsersDaily: 469,
        activeUsersWeekly: 0, // not shown anywhere
        totalEntities: 49,
        activeEntities: 49, // treat all entities as active for the top card
        activeSubscriptions: 105,
        mrr: 500000, // arbitrary but stable
      });
      continue;
    }

    if (i === 1) {
      // "Yesterday / last period" – chosen so % trends match:
      // users 1050 vs 1000 -> ~5%
      // entities 49 vs 46 -> ~7%
      // subscriptions 105 vs 100 -> ~5%
      stats.push({
        date: d.toISOString().slice(0, 10),
        totalUsers: 1000,
        activeUsersDaily: 447,
        activeUsersWeekly: 0,
        totalEntities: 46,
        activeEntities: 46,
        activeSubscriptions: 100,
        mrr: 476000,
      });
      continue;
    }

    // Older history: simple, smooth backfill that looks reasonable
    const totalUsers = 900 + i * 4;
    const activeDaily = 350 + i * 2;
    const activeWeekly = 700 + i * 3;
    const totalEntities = 30 + Math.floor(i / 2);
    const activeEntities = 25 + Math.floor(i / 2);
    const activeSubscriptions = 80 + i;
    const mrr = 400000 + i * 4000;

    stats.push({
      date: d.toISOString().slice(0, 10),
      totalUsers,
      activeUsersDaily: activeDaily,
      activeUsersWeekly: activeWeekly,
      totalEntities,
      activeEntities,
      activeSubscriptions,
      mrr,
    });
  }

  return stats as DashboardStats;
}

// === QUERIES ===

export function useDashboardStats() {
  return useQuery({
    queryKey: [api.dashboard.getStats.path],
    queryFn: async () => {
      const useMock =
        import.meta.env.VITE_USE_MOCK_DASHBOARD === "1" ||
        (import.meta.env.PROD && !window.location.origin.includes("localhost"));

      if (useMock) {
        return buildMockDashboardStats();
      }

      try {
        return await fetchAndValidate(
          api.dashboard.getStats.path,
          api.dashboard.getStats.responses[200],
        );
      } catch (err) {
        if (import.meta.env.DEV) {
          throw err;
        }
        // On static deployments where the API is unavailable, fall back to mock data
        return buildMockDashboardStats();
      }
    },
  });
}

export function useTopEntities() {
  return useQuery({
    queryKey: [api.dashboard.getTopEntities.path],
    queryFn: () => fetchAndValidate(
      api.dashboard.getTopEntities.path,
      api.dashboard.getTopEntities.responses[200]
    ),
  });
}

export function useAlerts() {
  return useQuery({
    queryKey: [api.dashboard.getAlerts.path],
    queryFn: () => fetchAndValidate(
      api.dashboard.getAlerts.path,
      api.dashboard.getAlerts.responses[200]
    ),
  });
}

export function useAuditLogs() {
  return useQuery({
    queryKey: [api.dashboard.getAuditLogs.path],
    queryFn: () => fetchAndValidate(
      api.dashboard.getAuditLogs.path,
      api.dashboard.getAuditLogs.responses[200]
    ),
  });
}

// === MUTATIONS ===

export function useUpdateAlertStatus() {
  const queryClient = useQueryClient();
  const mutationSchema = api.alerts.updateStatus.input;

  return useMutation({
    mutationFn: async ({ id, status, assignee }: { id: number; status: "open" | "resolved" | "investigating"; assignee?: string }) => {
      const validatedBody = mutationSchema.parse({ status, assignee });
      const url = buildUrl(api.alerts.updateStatus.path, { id });
      
      const res = await fetch(url, {
        method: api.alerts.updateStatus.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(validatedBody),
        credentials: "include",
      });

      if (!res.ok) {
        if (res.status === 404) throw new Error("Alert not found");
        throw new Error("Failed to update alert status");
      }

      return api.alerts.updateStatus.responses[200].parse(await res.json());
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [api.dashboard.getAlerts.path] });
    },
  });
}
