import { db, isDatabaseConfigured } from "./db";
import {
  daily_stats,
  top_entities,
  alerts,
  audit_logs,
  type DailyStat,
  type TopEntity,
  type Alert,
  type AuditLog
} from "@shared/schema";
import { eq, desc } from "drizzle-orm";

export interface IStorage {
  getDailyStats(): Promise<DailyStat[]>;
  getTopEntities(): Promise<TopEntity[]>;
  getAlerts(): Promise<Alert[]>;
  getAuditLogs(): Promise<AuditLog[]>;
  updateAlertStatus(id: number, status: string, assignee?: string): Promise<Alert | undefined>;
  
  // Seeding methods
  seedDailyStats(stats: typeof daily_stats.$inferInsert[]): Promise<void>;
  seedTopEntities(entities: typeof top_entities.$inferInsert[]): Promise<void>;
  seedAlerts(alertsData: typeof alerts.$inferInsert[]): Promise<void>;
  seedAuditLogs(logs: typeof audit_logs.$inferInsert[]): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getDailyStats(): Promise<DailyStat[]> {
    return await db.select().from(daily_stats).orderBy(desc(daily_stats.date)).limit(30);
  }

  async getTopEntities(): Promise<TopEntity[]> {
    return await db.select().from(top_entities).orderBy(desc(top_entities.activityScore));
  }

  async getAlerts(): Promise<Alert[]> {
    return await db.select().from(alerts).orderBy(desc(alerts.timestamp)).limit(50);
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return await db.select().from(audit_logs).orderBy(desc(audit_logs.timestamp)).limit(50);
  }

  async updateAlertStatus(id: number, status: string, assignee?: string): Promise<Alert | undefined> {
    const [updated] = await db.update(alerts)
      .set({ status, assignee })
      .where(eq(alerts.id, id))
      .returning();
    return updated;
  }

  async seedDailyStats(stats: typeof daily_stats.$inferInsert[]): Promise<void> {
    await db.insert(daily_stats).values(stats);
  }

  async seedTopEntities(entities: typeof top_entities.$inferInsert[]): Promise<void> {
    await db.insert(top_entities).values(entities);
  }

  async seedAlerts(alertsData: typeof alerts.$inferInsert[]): Promise<void> {
    await db.insert(alerts).values(alertsData);
  }

  async seedAuditLogs(logs: typeof audit_logs.$inferInsert[]): Promise<void> {
    await db.insert(audit_logs).values(logs);
  }
}

class InMemoryStorage implements IStorage {
  private dailyStats: DailyStat[] = [];
  private topEntities: TopEntity[] = [];
  private alertsData: Alert[] = [];
  private auditLogsData: AuditLog[] = [];

  async getDailyStats(): Promise<DailyStat[]> {
    return this.dailyStats;
  }

  async getTopEntities(): Promise<TopEntity[]> {
    return this.topEntities;
  }

  async getAlerts(): Promise<Alert[]> {
    return this.alertsData;
  }

  async getAuditLogs(): Promise<AuditLog[]> {
    return this.auditLogsData;
  }

  async updateAlertStatus(
    id: number,
    status: string,
    assignee?: string,
  ): Promise<Alert | undefined> {
    const alert = this.alertsData.find((a) => a.id === id);
    if (!alert) return undefined;

    alert.status = status;
    if (assignee !== undefined) {
      alert.assignee = assignee;
    }

    return alert;
  }

  async seedDailyStats(stats: typeof daily_stats.$inferInsert[]): Promise<void> {
    this.dailyStats = stats.map((s, index) => ({
      id: index + 1,
      ...s,
    })) as DailyStat[];
  }

  async seedTopEntities(
    entities: typeof top_entities.$inferInsert[],
  ): Promise<void> {
    this.topEntities = entities.map((e, index) => ({
      id: index + 1,
      ...e,
    })) as TopEntity[];
  }

  async seedAlerts(alertsData: typeof alerts.$inferInsert[]): Promise<void> {
    this.alertsData = alertsData.map((a, index) => ({
      id: index + 1,
      // spread original fields then ensure timestamp is a valid Date
      ...a,
      timestamp: a.timestamp ?? new Date(),
    })) as Alert[];
  }

  async seedAuditLogs(logs: typeof audit_logs.$inferInsert[]): Promise<void> {
    this.auditLogsData = logs.map((l, index) => ({
      id: index + 1,
      // spread first, then ensure we always have
      // a valid timestamp for UI formatting
      ...l,
      timestamp: l.timestamp ?? new Date(),
    })) as AuditLog[];
  }
}

const shouldUseInMemory =
  process.env.USE_IN_MEMORY_DB === "true" || !isDatabaseConfigured;

export const storage: IStorage = shouldUseInMemory
  ? new InMemoryStorage()
  : new DatabaseStorage();
