import "better-auth/api";
import "dotenv/config";
import express from "express";
import { db } from "./db/dbconnect";
import { auth } from "./lib/auth";
import apiRouter from "./api/routes";
import { toNodeHandler } from "better-auth/node";

const startServer = async () => {
  try {
    const result = await db.$client`SELECT NOW()`;
    console.log("✅ Database connected successfully:", result[0].now);

    const app = express();
    const port = process.env.BACKEND_PORT || 9000;

    app.use(express.json());

    // force origin header for Postman/curl requests
    app.use(
      "/api/auth",
      (req, _, next) => {
        if (!req.headers.origin) {
          req.headers.origin = `http://localhost:${port}`;
        }
        next();
      },
      toNodeHandler(auth) // tonodeHandler to adapt better-auth for Express
    );

    app.use("/api", apiRouter);

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database:", error);
    process.exit(1);
  }
};

startServer();
