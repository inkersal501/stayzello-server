import { Router } from "express";
import hostelRoutes from "./hostel.route.js";
import ownerRoutes from "./owner.route.js";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";

const router = Router();

router.use("/owner", ownerRoutes);
router.use("/user", userRoutes);

router.use(authMiddleware);
router.use("/auth", authRoutes);
router.use("/hostels", hostelRoutes);

export default router;