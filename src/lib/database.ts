import { drizzle } from "drizzle-orm/vercel-postgres";
import { sql } from "@vercel/postgres";
import {
  pgTable,
  text,
  integer,
  varchar,
  uniqueIndex,
} from "drizzle-orm/pg-core";
import { InferInsertModel, InferSelectModel } from "drizzle-orm";
import { timestamp } from "drizzle-orm/pg-core";

export const ReferralTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    wallet: text("wallet").unique(),
    referral: text("referral").notNull(),
    is_approved: integer("is_approved").default(0),
    name: text("name"),
    email: varchar({ length: 255 }).unique(),
  },
  (users) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(users.wallet),
    };
  }
);

export type User = InferSelectModel<typeof ReferralTable>;
export type NewUser = InferInsertModel<typeof ReferralTable>;

export const PurchaseTable = pgTable(
  "purchases",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    user_wallet: text("user_wallet"),
    user_name: text("user_name"),
    pait_tokens: integer("pait_tokens").notNull(),
    usdc_amount: integer("usdc_amount").notNull(),
    referral: text("referral"),
    created_at: timestamp("created_at").defaultNow(),
  },
  (purchases) => {
    return {
      uniqueIdx: uniqueIndex("unique_idx").on(purchases.user_wallet), // Assuming the unique index is on user_wallet
    };
  }
);

export const db = drizzle(sql);
