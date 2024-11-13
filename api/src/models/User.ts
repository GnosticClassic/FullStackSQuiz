import { integer, pgTable, varchar } from "drizzle-orm/pg-core";

export const User = pgTable("users", {
  id: integer().primaryKey().generatedAlwaysAsIdentity(),
  name: varchar({ length: 255 }).notNull(),
  age: integer().notNull(),
  email: varchar({ length: 255 }).notNull().unique(),
    password: varchar({ length: 255 }).notNull(),
  score:integer().default(0),
});
