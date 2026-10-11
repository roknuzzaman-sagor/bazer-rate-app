import { betterAuth } from "better-auth";
import { nextCookies } from "better-auth/next-js";
import { mongodbAdapter } from "@better-auth/mongo-adapter";
import { MongoClient } from "mongodb";

let _auth = null;

function getAuth() {
  if (_auth) return _auth;

  const uri = process.env.MONGODB_URI;
  const dbName = process.env.MONGODB_DB || "bazardor";

  if (!uri) throw new Error("MONGODB_URI is missing.");

  const client = new MongoClient(uri);
  const db = client.db(dbName);

  _auth = betterAuth({
    database: mongodbAdapter(db, { client }),
    baseURL: process.env.BETTER_AUTH_URL,
    secret: process.env.BETTER_AUTH_SECRET,

    emailAndPassword: {
      enabled: true,
      requireEmailVerification: false,
      minPasswordLength: 8,
    },

    socialProviders: {
      google: {
        clientId: process.env.GOOGLE_CLIENT_ID || "",
        clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      },
      github: {
        clientId: process.env.GITHUB_CLIENT_ID || "",
        clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
      },
    },

    account: {
      accountLinking: {
        enabled: true,
        trustedProviders: ["google", "github"],
        updateUserInfoOnLink: true,
        allowDifferentEmails: false,
      },
    },


    rateLimit: {
      window: 60,
      max: 100,
      customRules: {
        "/sign-in/social": {
          window: 60,
          max: 20,
        },
        "/sign-in/email": {
          window: 60,
          max: 10,
        },
      },
    },

    advanced: {
      database: { joins: true },
    },

    plugins: [nextCookies()],

    trustedOrigins: [
      "https://localbazar.zoogle.store",
      "http://localhost:3000",
    ],
  });

  return _auth;
}

export const auth = new Proxy(
  {},
  {
    get(_, prop) {
      return getAuth()[prop];
    },
  }
);