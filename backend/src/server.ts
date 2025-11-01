import express, { Request, Response } from "express";
import { db } from "./db/dbconnect"; 
import { usersTable } from "./db/schema";

const startServer = async () => {
  try {
    const result = await db.$client`SELECT NOW()`;
    console.log("✅ Database connected successfully! Time:", result[0].now);

    const app = express();
    const port = process.env.BACKEND_PORT || 9000;

    app.get("/", (req: Request, res: Response) => {
      res.send("Hello from server!");
    });

    // testing
    app.get("/test-db", async (req: Request, res: Response) => {
      try {
        const allUsers = await db.select().from(usersTable);
        res.json({
          message: "query successful!",
          users: allUsers,
        });
      } catch (error) {
        console.error("Error querying database:", error);
        res.status(500).json({ error: "Failed to query database" });
      }
    });

    app.listen(port, () => {
      console.log(`Server running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to the database: ",error);
    process.exit(1);
  }
};

startServer();
