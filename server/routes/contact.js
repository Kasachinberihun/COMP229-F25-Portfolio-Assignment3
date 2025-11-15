import express from "express";
import {
  createContact,
  getContacts,
  getContact,
  updateContact,
  deleteContact,
} from "../controllers/contact.controller.js";

import requireAuth, { requireAdmin } from "../middlewares/auth.js";

const router = express.Router();

// Public can submit
router.post("/", createContact);

// Admin can list/read/update/delete
router.get("/", requireAuth, requireAdmin, getContacts);
router.get("/:id", requireAuth, requireAdmin, getContact);
router.put("/:id", requireAuth, requireAdmin, updateContact);
router.delete("/:id", requireAuth, requireAdmin, deleteContact);

export default router;

