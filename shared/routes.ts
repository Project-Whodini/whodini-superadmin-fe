import { z } from 'zod';
import { alerts, audit_logs, daily_stats, top_entities, platform_users, platform_roles, permissions, internal_staff } from './schema';

// ============================================
// API CONTRACT
// ============================================
export const api = {
  dashboard: {
    getStats: {
      method: 'GET' as const,
      path: '/api/dashboard/stats' as const,
      responses: {
        200: z.array(z.custom<typeof daily_stats.$inferSelect>()),
      },
    },
    getTopEntities: {
      method: 'GET' as const,
      path: '/api/dashboard/top-entities' as const,
      responses: {
        200: z.array(z.custom<typeof top_entities.$inferSelect>()),
      },
    },
    getAlerts: {
      method: 'GET' as const,
      path: '/api/dashboard/alerts' as const,
      responses: {
        200: z.array(z.custom<typeof alerts.$inferSelect>()),
      },
    },
    getAuditLogs: {
      method: 'GET' as const,
      path: '/api/dashboard/audit-logs' as const,
      responses: {
        200: z.array(z.custom<typeof audit_logs.$inferSelect>()),
      },
    },
  },
  users: {
    list: {
      method: 'GET' as const,
      path: '/api/users' as const,
      responses: {
        200: z.array(z.custom<typeof platform_users.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/users/:id' as const,
      responses: {
        200: z.object({
          user: z.custom<typeof platform_users.$inferSelect>(),
          memberships: z.array(z.any()),
          sessions: z.array(z.any()),
        }),
      },
    },
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/users/:id/status' as const,
      input: z.object({ status: z.string() }),
      responses: {
        200: z.custom<typeof platform_users.$inferSelect>(),
      },
    },
  },
  roles: {
    list: {
      method: 'GET' as const,
      path: '/api/roles' as const,
      responses: {
        200: z.array(z.custom<typeof platform_roles.$inferSelect>()),
      },
    },
  },
  permissions: {
    list: {
      method: 'GET' as const,
      path: '/api/permissions' as const,
      responses: {
        200: z.array(z.custom<typeof permissions.$inferSelect>()),
      },
    },
  },
  staff: {
    list: {
      method: 'GET' as const,
      path: '/api/staff' as const,
      responses: {
        200: z.array(z.custom<typeof internal_staff.$inferSelect>()),
      },
    },
  },
  alerts: {
    updateStatus: {
      method: 'PATCH' as const,
      path: '/api/alerts/:id/status' as const,
      input: z.object({
        status: z.enum(['open', 'resolved', 'investigating']),
        assignee: z.string().optional(),
      }),
      responses: {
        200: z.custom<typeof alerts.$inferSelect>(),
        404: z.object({ message: z.string() }),
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
