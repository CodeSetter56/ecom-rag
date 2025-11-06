import {
  timestamp,
  pgTable,
  text,
  boolean,
  uuid,
  pgEnum,
} from "drizzle-orm/pg-core";

// role based access
export const userRoleEnum = pgEnum("user_role", ["ADMIN", "USER"]);

// Tables:

export const user = pgTable("user", {
  id: text("id").primaryKey(), 

  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("emailVerified").notNull().default(false),
  image: text("image"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  role: userRoleEnum("role").default("USER").notNull(),
  phno: text("phno").unique(),
  // password is handled in account table 
});

// session table to check logged in users
export const session = pgTable("session", {
  id: text("id").primaryKey(),
    
  token: text("token").notNull().unique(),
  ipAddress: text("ipAddress"),
  userAgent: text("userAgent"), // browser details

  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),

  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
});

// accounts table for OAuth
export const account = pgTable("account", {
  id: text("id").primaryKey(),

  accountId: text("accountId").notNull(),
  providerId: text("providerId").notNull(),

  userId: text("userId")
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),

  password: text("password"), // For email/password auth
  accessToken: text("accessToken"), // OAuth access token
  refreshToken: text("refreshToken"), // OAuth refresh token
  idToken: text("idToken"), // JWT token
  scope: text("scope"), // read/write permissions

  accessTokenExpiresAt: timestamp("accessTokenExpiresAt"),
  refreshTokenExpiresAt: timestamp("refreshTokenExpiresAt"),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});

// email verification token table 
export const verification = pgTable("verification", {
  id: text("id").primaryKey(),

  identifier: text("identifier").notNull(),
  value: text("value").notNull(),

  expiresAt: timestamp("expiresAt").notNull(),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow(),
});
