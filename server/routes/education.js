import express from "express";
import {
  createEducation,
  getEducations,
  getEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/education.controller.js";

import requireAuth, { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Public read
router.get("/", getEducations);
router.get("/:id", getEducation);

// Admin write
router.post("/", requireAuth, requireAdmin, createEducation);
router.put("/:id", requireAuth, requireAdmin, updateEducation);
router.delete("/:id", requireAuth, requireAdmin, deleteEducation);

export default router;

