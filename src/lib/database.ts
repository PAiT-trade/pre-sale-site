import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import { pgTable, text } from "drizzle-orm/pg-core";

// Use this object to send drizzle queries to your DB
export const db = drizzle(sql);

export const ReferralTable = pgTable("users", {
  wallet: text("wallet").primaryKey(),
  referral: text("referral").notNull(),
});
