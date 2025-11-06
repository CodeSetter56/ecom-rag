import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "../db/dbconnect";
import * as schema from "../db/schema/auth";

export const auth = betterAuth({
  // drizzle adapter setup
  database: drizzleAdapter(db, {
    provider: "pg",
    schema: {
      user: schema.user,
      session: schema.session,
      account: schema.account,
      verification: schema.verification,
    },
  }),

  secret: process.env.BETTER_AUTH_SECRET as string,
  baseURL: process.env.BETTER_AUTH_URL as string,

  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },

  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
  },

  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // 5 mins
    },
  },

  advanced: {
    debug: true, 
    cookiePrefix: "ecommerce_auth",
    allowNonBrowserClients: true,
    crossSubDomainCookies: { enabled: false },
  },

  // CORS settings
  trustedOrigins: [
    `http://localhost:${process.env.BACKEND_PORT || 9000}`,
    "postman://localhost",
  ],

  eventHooks: {
    onSignIn: async (user:any) => {
      console.log(`\n User signed in: ${user.email}\n`); 
    },
    onSignUp: async (user:any) => {
      console.log(`\n User registered: ${user.email}\n`);
    },
    onSessionCreate: async (session:any) => {
      console.log(`\n Session created: ${session.id}\n`);
    },
  },
  
});
