import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import { 
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt.js";

export const userRegisterService = async (data) => {
  const { name, email, phone, password } = data;

  const exists = await User.findOne({ email });
  if (exists) throw new Error("User already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    name,
    email,
    phone,
    password: hashedPassword,
  });

  return user;
};

export const userLoginService = async ({ email, password }) => {
  const user = await User.findOne({ email });
  if (!user) throw new Error("User not found");

  const match = await bcrypt.compare(password, user.password);
  if (!match) throw new Error("Incorrect password");

  const accessToken = generateAccessToken(user._id, "user");
  const refreshToken = generateRefreshToken(user._id, "user");

  return { user, accessToken, refreshToken };
};