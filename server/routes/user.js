import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  // loginUser, // ❌ not needed if using /api/auth/signin
} from "../controllers/user.js";

import requireAuth, { requireRole } from "../middlewares/auth.js";

const router = express.Router();

// Admin-only list & get one user
router.get("/", requireAuth, requireRole("admin"), getAllUsers);
router.get("/:id", requireAuth, requireRole("admin"), getUserById);

// Admin-only create user (optional – you can also just use /api/auth/signup)
router.post("/", requireAuth, requireRole("admin"), createUser);

// Admin-only update/delete
router.put("/:id", requireAuth, requireRole("admin"), updateUser);
router.delete("/:id", requireAuth, requireRole("admin"), deleteUser);

// ❌ Remove legacy login; use /api/auth/signin instead
// router.post("/login", loginUser);

export default router;

