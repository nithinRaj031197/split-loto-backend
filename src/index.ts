import express from "express";
import { connection } from "./db";
import userRoutes from "./routes/userRoutes";

const app = express();

app.use(express.json());

app.use("/api/users", userRoutes);

const startServer = async () => {
  try {
    await new Promise<void>((resolve, reject) => {
      connection.connect((err) => {
        if (err) {
          console.error("Error connecting to MySQL:", err);
          reject(err);
        } else {
          console.log("Connected to MySQL");
          resolve();
        }
      });
    });

    app.listen(5001, () => {
      console.log("Server running on port 5001");
    });
  } catch (error) {
    console.error("Failed to start the server:", error);
  }
};

startServer();
