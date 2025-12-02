import { NODE_ENV } from "../config.js";
import {
  verifyRefreshToken,
  generateAccessToken,
} from "../utils/jwt.js";

export const refreshAccessToken = async (req, res) => {
  try {
    const refreshToken = req.cookies.refreshToken;

    if (!refreshToken)
      return res.status(401).json({ message: "No refresh token" });

    const decoded = verifyRefreshToken(refreshToken);

    const newAccessToken = generateAccessToken(decoded.id, decoded.role);

    res.cookie("accessToken", newAccessToken, {
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: NODE_ENV === "production"?"none": "lax",
      maxAge: 15 * 60 * 1000,
    });

    return res.json({ message: "Access token refreshed" });

  } catch (err) {
    return res.status(401).json({ message: "Invalid refresh token" });
  }
};
