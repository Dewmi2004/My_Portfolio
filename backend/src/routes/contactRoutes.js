import { Router } from "express";
import { createContactMessage, listContactMessages } from "../controllers/contactController.js";
import { contactLimiter } from "../middleware/rateLimiter.js";
import { requireAdminKey } from "../middleware/requireAdminKey.js";

const router = Router();

// Public — used by the portfolio's contact form
router.post("/", contactLimiter, createContactMessage);

// Protected — for you to check submissions (send header: x-admin-key: <ADMIN_API_KEY>)
router.get("/", requireAdminKey, listContactMessages);

export default router;
