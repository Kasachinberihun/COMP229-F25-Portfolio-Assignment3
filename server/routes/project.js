
import express from "express";
import {
  getAllProjects,
  getProjectById,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/project.js";

import requireAuth /* , { requireAdmin } */ from "../middlewares/auth.js";

const router = express.Router();

// ================================
// Public read routes
// ================================
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// ================================
// Authenticated write routes
// (Relaxed: any logged-in user can create/update/delete)
// ================================
router.post("/", requireAuth, createProject);
router.put("/:id", requireAuth, updateProject);
router.delete("/:id", requireAuth, deleteProject);

export default router;

