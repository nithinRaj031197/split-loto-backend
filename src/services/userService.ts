import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppDataSource from "../data-source";
import { User } from "../entity/userSchema";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "your_access_token_secret";
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "your_refresh_token_secret";
const SALT_ROUNDS = 10;

export const createUser = async (name: string, email: string, password: string) => {
  try {
    if (!AppDataSource.isInitialized) {
      await AppDataSource.initialize();
    }

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const userRepository = AppDataSource.getRepository(User);

    const user = new User();
    user.name = name;
    user.email = email;
    user.password = hashedPassword;

    await userRepository.save(user);

    const accessToken = jwt.sign({ userId: user.id }, ACCESS_TOKEN_SECRET, { expiresIn: "1h" });
    const refreshToken = jwt.sign({ userId: user.id }, REFRESH_TOKEN_SECRET, { expiresIn: "7d" });

    return { userId: user.id, accessToken, refreshToken };
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error("Error creating user");
  }
};
