import express, { Request, Response } from "express";
import { createUser } from "../services/userService";

const router = express.Router();

router.post("/create", async (req: Request, res: Response) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).send("Name, email, and password are required");
  }

  try {
    const { userId, accessToken, refreshToken } = await createUser(name, email, password);
    res.status(201).json({ userId, accessToken, refreshToken });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).send("Error creating user");
  }
});

export default router;
