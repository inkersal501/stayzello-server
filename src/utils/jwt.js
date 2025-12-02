import jwt from "jsonwebtoken";
import {
  JWT_ACCESS_SECRET,
  JWT_ACCESS_EXPIRATION_MINUTES,
  JWT_REFRESH_SECRET,
  JWT_REFRESH_EXPIRATION_MINUTES,
} from "../config.js";

export const generateAccessToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_ACCESS_SECRET, {
    expiresIn: JWT_ACCESS_EXPIRATION_MINUTES,
  });
};

export const generateRefreshToken = (id, role) => {
  return jwt.sign({ id, role }, JWT_REFRESH_SECRET, {
    expiresIn: JWT_REFRESH_EXPIRATION_MINUTES,
  });
};

export const verifyAccessToken = (token) => {
  return jwt.verify(token, JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token) => {
  return jwt.verify(token, JWT_REFRESH_SECRET);
};
