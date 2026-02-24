import { pgTable, text, serial, integer, boolean, timestamp, jsonb, varchar } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";
import { sql } from "drizzle-orm";

// === TABLE DEFINITIONS ===

// Daily stats for widgets/charts
export const daily_stats = pgTable("daily_stats", {
  id: serial("id").primaryKey(),
  date: timestamp("date").notNull(),
  totalUsers: integer("total_users").notNull(),
  activeUsersDaily: integer("active_users_daily").notNull(),
  activeUsersWeekly: integer("active_users_weekly").notNull(),
  totalEntities: integer("total_entities").notNull(),
  activeEntities: integer("active_entities").notNull(),
  activeSubscriptions: integer("active_subscriptions").notNull(),
  mrr: integer("mrr").notNull(), // In cents
  messageVolumeSent: integer("message_volume_sent").notNull(),
  messageVolumeDelivered: integer("message_volume_delivered").notNull(),
  messageVolumeFailed: integer("message_volume_failed").notNull(),
});

// Top entities list
export const top_entities = pgTable("top_entities", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  activityScore: integer("activity_score").notNull(),
  avatar: text("avatar"), // Optional avatar URL
});

// Critical alerts table
export const alerts = pgTable("alerts", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  type: text("type").notNull(), // e.g., "Server Error", "Payment Failed"
  severity: text("severity").notNull(), // "critical", "high", "medium", "low"
  affectedModule: text("affected_module").notNull(),
  status: text("status").notNull(), // "open", "resolved", "investigating"
  assignee: text("assignee"),
});

// Admin actions audit log
export const audit_logs = pgTable("audit_logs", {
  id: serial("id").primaryKey(),
  timestamp: timestamp("timestamp").defaultNow().notNull(),
  actor: text("actor").notNull(), // Admin name
  action: text("action").notNull(), // e.g., "Updated Settings"
  target: text("target").notNull(), // e.g., "User #123"
  result: text("result").notNull(), // "Success", "Failed"
});

// Users table (platform-wide)
export const platform_users = pgTable("platform_users", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  type: text("type").notNull(), // "personal", "business"
  status: text("status").notNull(), // "active", "disabled"
  created: timestamp("created").defaultNow().notNull(),
  lastActive: timestamp("last_active").defaultNow().notNull(),
  linkedEntitiesCount: integer("linked_entities_count").default(0).notNull(),
  mfaEnabled: boolean("mfa_enabled").default(false).notNull(),
  adminNotes: text("admin_notes"),
});

// User Memberships
export const memberships = pgTable("memberships", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => platform_users.id),
  entityName: text("entity_name").notNull(),
  role: text("role").notNull(),
});

// User Sessions
export const user_sessions = pgTable("user_sessions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").references(() => platform_users.id),
  device: text("device").notNull(),
  lastLogin: timestamp("last_login").defaultNow().notNull(),
  status: text("status").notNull(),
});

// Roles
export const platform_roles = pgTable("platform_roles", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  usersCount: integer("users_count").default(0).notNull(),
  lastUpdated: timestamp("last_updated").defaultNow().notNull(),
});

// Permissions
export const permissions = pgTable("permissions", {
  id: serial("id").primaryKey(),
  key: text("key").notNull().unique(),
  category: text("category").notNull(), // "Billing", "Users", etc.
  description: text("description").notNull(),
});

// Internal Staff
export const internal_staff = pgTable("internal_staff", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  role: text("role").notNull(),
  status: text("status").notNull(),
  lastActive: timestamp("last_active").defaultNow().notNull(),
  twoFactorEnabled: boolean("two_factor_enabled").default(false).notNull(),
  created: timestamp("created").defaultNow().notNull(),
});

// === SCHEMAS ===
export const insertAlertSchema = createInsertSchema(alerts).omit({ id: true, timestamp: true });
export const insertAuditLogSchema = createInsertSchema(audit_logs).omit({ id: true, timestamp: true });
export const insertUserSchema = createInsertSchema(platform_users).omit({ id: true, created: true, lastActive: true });

// === TYPES ===
export type DailyStat = typeof daily_stats.$inferSelect;
export type TopEntity = typeof top_entities.$inferSelect;
export type Alert = typeof alerts.$inferSelect;
export type AuditLog = typeof audit_logs.$inferSelect;
export type PlatformUser = typeof platform_users.$inferSelect;
export type Membership = typeof memberships.$inferSelect;
export type UserSession = typeof user_sessions.$inferSelect;
export type PlatformRole = typeof platform_roles.$inferSelect;
export type Permission = typeof permissions.$inferSelect;
export type InternalStaff = typeof internal_staff.$inferSelect;
