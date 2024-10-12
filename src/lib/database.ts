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

export const ReferralTable = pgTable(
  "users",
  {
    id: integer().primaryKey().generatedAlwaysAsIdentity(),
    wallet: text("wallet").unique(),
    referral: text("referral").notNull(),
    name: text("referral"),
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

export const db = drizzle(sql);
