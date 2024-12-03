import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  first_name: varchar({ length: 255 }),
  last_name: varchar({ length: 255 }),
  //age: integer().notNull(),
  //phone_number: varchar({ length: 255 }).unique(),
  email: varchar({ length: 255 }).unique().notNull(),
  password: varchar({ length: 255 }).notNull(),
  //score: integer().default(0),
  role: varchar({ length: 255 }).default("player").notNull(),
  avatar_url: varchar({ length: 255 }),
});
