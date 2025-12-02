import express from "express";

import {
  createHostelController,
  getAllHostelsController,
  getHostelByIdController,
  updateHostelController,
  deleteHostelController,
} from "../controllers/hostel.controller.js";

const router = express.Router();

// Create hostel
router.post("/", createHostelController);

// Get all hostels
router.get("/", getAllHostelsController);

// Get one hostel by ID
router.get("/:id", getHostelByIdController);

// Update hostel
router.put("/:id", updateHostelController);

// Delete hostel
router.delete("/:id", deleteHostelController);

export default router;
