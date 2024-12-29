import {
  pgTable,
  pgEnum,
  integer,
  decimal,
  date,
  text,
  uuid,
  varchar,
  boolean,
  jsonb,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";

export const rolesEnum = pgEnum("roles", ["gymmer", "trainer", "admin"]);

export const roleEnum = pgEnum("role", ["gymmer", "trainer", "admin"]);

export type User = InferSelectModel<typeof users>;
export type UserWithRelations = User & {
  trainings: TrainingsWithRelations[];
  // friends: User[];
  // session: Sessions | null;
};
export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  surname: varchar("surname", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull().unique(),
  isEmailVerified: boolean().notNull().default(false),
  phone: varchar("phone", { length: 9 }).unique(),
  password: varchar("password", { length: 255 }).notNull(),
  role: roleEnum("role").notNull().default("gymmer"),
  country: varchar("country", { length: 255 }),
  city: varchar("city", { length: 255 }),
  gymName: varchar("gym_name", { length: 255 }),
  age: integer("age").notNull(),
  height: decimal("height", { precision: 5, scale: 2 }),
  weight: decimal("weight", { precision: 5, scale: 2 }),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
});

export const usersRelations = relations(users, ({ many, one }) => ({
  trainings: many(trainings),
  friends: many(users, {
    relationName: "friendships",
  }),
  session: one(sessions, {
    fields: [users.id],
    references: [sessions.userId],
  }),
}));

export type Friendships = InferSelectModel<typeof friendships>;
export const friendships = pgTable("friendships", {
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
  friendId: uuid("friend_id")
    .notNull()
    .references(() => users.id),
});

export type Trainings = InferSelectModel<typeof trainings>;
export type TrainingsWithRelations = Trainings & {
  trainingDay: TrainingDay[];
};
export const trainings = pgTable("trainings", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  weeklyFrequency: integer("weekly_frequency").notNull(),
  period: integer("period").notNull(),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});
export const trainingsRelations = relations(trainings, ({ many, one }) => ({
  trainingDay: many(trainingDay),
  user: one(users, {
    fields: [trainings.userId],
    references: [users.id],
  }),
}));

export type TrainingDay = InferSelectModel<typeof trainingDay>;
export const trainingDay = pgTable("trainingDay", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
  trainingNumber: integer("training_number").notNull().default(0),
  trainingId: uuid("training_id")
    .notNull()
    .references(() => trainings.id),
});
export const trainingDayRelations = relations(trainingDay, ({ many, one }) => ({
  exercises: many(exercises),
  training: one(trainings, {
    fields: [trainingDay.trainingId],
    references: [trainings.id],
  }),
}));

export type Exercises = InferSelectModel<typeof exercises>;
export const exercises = pgTable("exercises", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  description: text("description"),
  series: integer("series").notNull(),
  reps: jsonb("reps").$type<string[]>().notNull(), // Storing as JSON string
  kilograms: decimal("kilograms", { precision: 5, scale: 2 }),
  rpe: decimal("rpe", { precision: 3, scale: 1 }),
  createdAt: date("created_at").notNull().defaultNow(),
  updatedAt: date("updated_at").notNull().defaultNow(),
  trainingDayId: uuid("training_id")
    .notNull()
    .references(() => trainingDay.id),
});
export const exercisesRelations = relations(exercises, ({ one }) => ({
  trainingDay: one(trainingDay, {
    fields: [exercises.trainingDayId],
    references: [trainingDay.id],
  }),
}));

export type Sessions = InferSelectModel<typeof sessions>;
export const sessions = pgTable("sessions", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: varchar("name", { length: 255 }).notNull(),
  token: varchar("token", { length: 255 }).notNull(),
  expiresAt: date("expiresAt").notNull(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id),
});
export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, {
    fields: [sessions.userId],
    references: [users.id],
  }),
}));

export type TwoFactorAuth = InferSelectModel<typeof twoFactorAuth>;
export const twoFactorAuth = pgTable("twoFactorAuth", {
  email: varchar("email", { length: 255 }).notNull().primaryKey(),
  code: varchar("code", { length: 6 }).notNull(),
  expiresAt: date("expiresAt").notNull(),
});
