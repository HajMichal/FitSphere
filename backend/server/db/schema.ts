import { sqliteTable, integer, real, text } from "drizzle-orm/sqlite-core";
import { InferSelectModel, relations, sql } from "drizzle-orm";

type Role = "gymmer" | "trainer" | "admin";

export type User = InferSelectModel<typeof users>;
export type UserWithRelations = User & {
  trainings: TrainingsWithRelations[];
  // friends: User[];
  // session: Sessions | null;
};

export const users = sqliteTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").unique(),
  password: text("password").notNull(),
  role: text("role").$type<Role>().notNull().default("gymmer"),
  country: text("country"),
  city: text("city"),
  gymName: text("gym_name"),
  age: integer("age").notNull(),
  height: real("height"),
  weight: real("weight"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
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
export const friendships = sqliteTable("friendships", {
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  friendId: text("friend_id")
    .notNull()
    .references(() => users.id),
});

export type Trainings = InferSelectModel<typeof trainings>;
export type TrainingsWithRelations = Trainings & {
  trainingDay: TrainingDay[];
};
export const trainings = sqliteTable("trainings", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  weeklyFrequency: integer("weekly_frequency"),
  declaredWeekDays: text("week_days"), // Store as JSON string
  period: integer("period").notNull(),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
  userId: text("user_id")
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
export const trainingDay = sqliteTable("trainingDay", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
  trainingNumber: integer("training_number").notNull().default(0),
  trainingId: text("training_id")
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
export const exercises = sqliteTable("exercises", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  series: integer("series").notNull(),
  reps: text("reps").notNull(), // Store as JSON string
  kilograms: real("kilograms"),
  rpe: real("rpe"),
  createdAt: text("created_at")
    .notNull()
    .default(sql`(unixepoch())`),
  updatedAt: text("updated_at")
    .notNull()
    .default(sql`(unixepoch())`),
  trainingDayId: text("training_id")
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
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  token: text("token").notNull(),
  expiresAt: text("expiresAt").notNull(),
  userId: text("user_id")
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
export const twoFactorAuth = sqliteTable("twoFactorAuth", {
  email: text("email").notNull().primaryKey(),
  code: text("code").notNull(),
  expiresAt: text("expiresAt").notNull(),
});

export type PendingUsers = InferSelectModel<typeof pendingUsers>;
export const pendingUsers = sqliteTable("pendingUsers", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  surname: text("surname").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone").unique(),
  password: text("password").notNull(),
  country: text("country"),
  city: text("city"),
  gymName: text("gym_name"),
  age: integer("age").notNull(),
});
