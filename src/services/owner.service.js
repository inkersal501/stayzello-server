import Owner from "../models/owner.model.js";
import bcrypt from "bcryptjs";
import { 
  generateAccessToken,
  generateRefreshToken
} from "../utils/jwt.js";

export const ownerRegisterService = async (data) => {
  const { name, email, phone, password } = data;

  const exists = await Owner.findOne({ email });
  if (exists) throw new Error("Owner already exists");

  const hashedPassword = await bcrypt.hash(password, 10);

  const owner = await Owner.create({
    name,
    email,
    phone,
    password: hashedPassword,
  }); 

  return owner;
};

export const ownerLoginService = async ({ email, password }) => {
  const owner = await Owner.findOne({ email });
  if (!owner) throw new Error("Owner not found");

  const match = await bcrypt.compare(password, owner.password);
  if (!match) throw new Error("Incorrect password");

  const accessToken = generateAccessToken(owner._id, "owner");
  const refreshToken = generateRefreshToken(owner._id, "owner");

  return { owner, accessToken, refreshToken };
};