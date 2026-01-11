import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

// ==========================================
// Better Auth Tables
// ==========================================

export const user = sqliteTable("user", {
  id: text("id").primaryKey(),
  email: text("email").notNull().unique(),
  name: text("name"),
  location: text("location"), // Ciudad/Provincia del usuario
  emailVerified: integer("email_verified", { mode: "boolean" })
    .notNull()
    .default(false),
  image: text("image"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const session = sqliteTable("session", {
  id: text("id").primaryKey(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  token: text("token").notNull().unique(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

export const account = sqliteTable("account", {
  id: text("id").primaryKey(),
  accountId: text("account_id").notNull(),
  providerId: text("provider_id").notNull(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  accessToken: text("access_token"),
  refreshToken: text("refresh_token"),
  idToken: text("id_token"),
  accessTokenExpiresAt: integer("access_token_expires_at", {
    mode: "timestamp",
  }),
  refreshTokenExpiresAt: integer("refresh_token_expires_at", {
    mode: "timestamp",
  }),
  scope: text("scope"),
  password: text("password"),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const verification = sqliteTable("verification", {
  id: text("id").primaryKey(),
  identifier: text("identifier").notNull(),
  value: text("value").notNull(),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

// ==========================================
// Domain Tables - Findmi
// ==========================================

export const instrument = sqliteTable("instrument", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  category: text("category").notNull(),
});

export const seniorityRange = sqliteTable("seniority_range", {
  id: text("id").primaryKey(),
  label: text("label").notNull().unique(),
  minYears: integer("min_years").notNull(),
  maxYears: integer("max_years"),
  weight: integer("weight").notNull().default(1),
});

export const musicianProfile = sqliteTable("musician_profile", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  instrumentId: text("instrument_id")
    .notNull()
    .references(() => instrument.id),
  seniorityRangeId: text("seniority_range_id")
    .notNull()
    .references(() => seniorityRange.id),
  calculatedSeniority: integer("calculated_seniority").notNull().default(0),
  bio: text("bio"),
  isActive: integer("is_active", { mode: "boolean" }).notNull().default(true),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const experience = sqliteTable("experience", {
  id: text("id").primaryKey(),
  profileId: text("profile_id")
    .notNull()
    .references(() => musicianProfile.id, { onDelete: "cascade" }),
  venueName: text("venue_name").notNull(),
  description: text("description"),
  date: integer("date", { mode: "timestamp" }),
  impactScore: integer("impact_score").notNull().default(1),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});

export const profileImage = sqliteTable("profile_image", {
  id: text("id").primaryKey(),
  profileId: text("profile_id")
    .notNull()
    .references(() => musicianProfile.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  order: integer("order").notNull().default(0),
  isPrimary: integer("is_primary", { mode: "boolean" })
    .notNull()
    .default(false),
});

export const contactPlatform = sqliteTable("contact_platform", {
  id: text("id").primaryKey(),
  name: text("name").notNull().unique(),
  icon: text("icon"),
  urlTemplate: text("url_template"),
});

export const contact = sqliteTable("contact", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  platformId: text("platform_id")
    .notNull()
    .references(() => contactPlatform.id),
  value: text("value").notNull(),
  isPublic: integer("is_public", { mode: "boolean" }).notNull().default(true),
});
