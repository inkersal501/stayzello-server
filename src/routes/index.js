import { Router } from "express";
import hostelRoutes from "./hostel.route.js";
import ownerRoutes from "./owner.route.js";
import userRoutes from "./user.route.js";
import authRoutes from "./auth.route.js";

const router = Router();

router.use("/hostels", hostelRoutes);
router.use("/owner", ownerRoutes);
router.use("/user", userRoutes);
router.use("/auth", authRoutes);

export default router;