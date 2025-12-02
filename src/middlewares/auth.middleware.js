import { verifyAccessToken } from "../utils/jwt.js";

export const authMiddleware = (role) => {
  return (req, res, next) => {
    try {
      const token = req.cookies.accessToken;

      if (!token)
        return res.status(401).json({ message: "Not authenticated" });

      const decoded = verifyAccessToken(token);

      if (role && decoded.role !== role)
        return res.status(403).json({ message: "Access denied" });

      req.user = decoded;
      next();

    } catch (err) {
      return res.status(401).json({ message: "Expired or invalid token" });
    }
  };
};
