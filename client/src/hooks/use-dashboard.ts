import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { z } from "zod";

// Helper to handle API responses strictly
async function fetchAndValidate<T>(url: string, schema: z.ZodSchema<T>): Promise<T> {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.statusText}`);
  const data = await res.json();
  return schema.parse(data);
}

// === QUERIES ===

export function useDashboardStats() {
  return useQuery({
    queryKey: [api.dashboard.getStats.path],
    queryFn: () => fetchAndValidate(
      api.dashboard.getStats.path,
      api.dashboard.getStats.responses[200]
    ),
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
