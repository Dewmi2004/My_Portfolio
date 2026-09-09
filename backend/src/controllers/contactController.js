import ContactMessage from "../models/ContactMessage.js";
import { isDbConnected } from "../config/db.js";
import { notifyNewContactMessage } from "../utils/sendMail.js";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function validateContactPayload({ name, email, message }) {
  const errors = [];

  if (!name || typeof name !== "string" || !name.trim()) {
    errors.push("Name is required.");
  } else if (name.trim().length > 120) {
    errors.push("Name is too long.");
  }

  if (!email || typeof email !== "string" || !EMAIL_RE.test(email.trim())) {
    errors.push("A valid email is required.");
  }

  if (!message || typeof message !== "string" || !message.trim()) {
    errors.push("Message is required.");
  } else if (message.trim().length > 5000) {
    errors.push("Message is too long.");
  }

  return errors;
}

export async function createContactMessage(req, res, next) {
  try {
    const { name, email, message } = req.body ?? {};

    const errors = validateContactPayload({ name, email, message });
    if (errors.length) {
      return res.status(400).json({ error: errors[0], errors });
    }

    if (!isDbConnected()) {
      const err = new Error("The database is temporarily unavailable. Please try again shortly.");
      err.status = 503;
      throw err;
    }

    const saved = await ContactMessage.create({
      name: name.trim(),
      email: email.trim(),
      message: message.trim(),
      ip: req.ip,
    });

    // Fire-and-forget — a failed notification email should never fail the request.
    notifyNewContactMessage({ name: saved.name, email: saved.email, message: saved.message });

    res.status(201).json({
      success: true,
      message: "Thanks — your message has been received. I'll reply soon!",
      id: saved._id,
    });
  } catch (err) {
    next(err);
  }
}

export async function listContactMessages(req, res, next) {
  try {
    if (!isDbConnected()) {
      const err = new Error("The database is temporarily unavailable.");
      err.status = 503;
      throw err;
    }

    const page = Math.max(1, Number(req.query.page) || 1);
    const limit = Math.min(50, Number(req.query.limit) || 20);

    const [messages, total] = await Promise.all([
      ContactMessage.find()
        .sort({ createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit),
      ContactMessage.countDocuments(),
    ]);

    res.json({ page, limit, total, messages });
  } catch (err) {
    next(err);
  }
}
