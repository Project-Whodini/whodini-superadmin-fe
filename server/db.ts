import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

const hasDatabaseUrl = Boolean(process.env.DATABASE_URL);

export const pool = hasDatabaseUrl
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null;

export const db = pool ? drizzle(pool, { schema }) : (null as any);
export const isDatabaseConfigured = hasDatabaseUrl;
