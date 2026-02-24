import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { subDays } from "date-fns";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // === API ROUTES ===

  app.get(api.dashboard.getStats.path, async (_req, res) => {
    const stats = await storage.getDailyStats();
    res.json(stats);
  });

  app.get(api.dashboard.getTopEntities.path, async (_req, res) => {
    const entities = await storage.getTopEntities();
    res.json(entities);
  });

  app.get(api.dashboard.getAlerts.path, async (_req, res) => {
    const alerts = await storage.getAlerts();
    res.json(alerts);
  });

  app.get(api.dashboard.getAuditLogs.path, async (_req, res) => {
    const logs = await storage.getAuditLogs();
    res.json(logs);
  });

  app.patch(api.alerts.updateStatus.path, async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      const { status, assignee } = api.alerts.updateStatus.input.parse(req.body);
      const updated = await storage.updateAlertStatus(id, status, assignee);
      
      if (!updated) {
        return res.status(404).json({ message: "Alert not found" });
      }
      
      res.json(updated);
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json(e.errors);
      }
      throw e;
    }
  });

  // === SEED DATA ON STARTUP ===
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingStats = await storage.getDailyStats();
  if (existingStats.length > 0) return; // Already seeded

  console.log("Seeding database...");

  // Seed Daily Stats (Last 30 days)
  const stats = [];
  for (let i = 29; i >= 0; i--) {
    const date = subDays(new Date(), i);
    // Generate some realistic looking random data with a trend
    const baseUsers = 1000 + (30 - i) * 50; // Growing
    const activeDaily = Math.floor(baseUsers * 0.4) + Math.floor(Math.random() * 50);
    
    stats.push({
      date,
      totalUsers: baseUsers,
      activeUsersDaily: activeDaily,
      activeUsersWeekly: Math.floor(baseUsers * 0.7),
      totalEntities: 50 + (30 - i),
      activeEntities: 45 + Math.floor(Math.random() * 5),
      activeSubscriptions: Math.floor(baseUsers * 0.1),
      mrr: Math.floor(baseUsers * 0.1) * 2900, // $29.00 avg revenue, in cents
      messageVolumeSent: 5000 + Math.floor(Math.random() * 1000),
      messageVolumeDelivered: 4900 + Math.floor(Math.random() * 1000),
      messageVolumeFailed: Math.floor(Math.random() * 100),
    });
  }
  await storage.seedDailyStats(stats);

  // Seed Top Entities
  await storage.seedTopEntities([
    { name: "Acme Corp", activityScore: 98, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=AC" },
    { name: "Globex Inc", activityScore: 85, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=GI" },
    { name: "Soylent Corp", activityScore: 76, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=SC" },
    { name: "Initech", activityScore: 72, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=IN" },
    { name: "Umbrella Corp", activityScore: 65, avatar: "https://api.dicebear.com/7.x/initials/svg?seed=UC" },
  ]);

  // Seed Alerts
  await storage.seedAlerts([
    { type: "Database High CPU", severity: "critical", affectedModule: "Database Cluster", status: "open", assignee: "Admin" },
    { type: "Payment Gateway Timeout", severity: "high", affectedModule: "Billing", status: "investigating", assignee: "Sarah" },
    { type: "API Rate Limit Warning", severity: "medium", affectedModule: "Public API", status: "resolved", assignee: "System" },
    { type: "New User Spike", severity: "info", affectedModule: "Auth Service", status: "resolved", assignee: "System" },
    { type: "Storage 90% Full", severity: "high", affectedModule: "File Storage", status: "open" },
  ]);

  // Seed Audit Logs
  await storage.seedAuditLogs([
    { actor: "Admin User", action: "Updated System Settings", target: "Global Config", result: "Success" },
    { actor: "Sarah J.", action: "Refunded Transaction", target: "Tx #998877", result: "Success" },
    { actor: "System", action: "Auto-scaled Group", target: "Worker Group A", result: "Success" },
    { actor: "Admin User", action: "Deleted User", target: "User #5544", result: "Failed" },
    { actor: "Mike T.", action: "Updated Role", target: "User #1122", result: "Success" },
  ]);

  console.log("Database seeded successfully!");
}
