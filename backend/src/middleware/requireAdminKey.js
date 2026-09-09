/**
 * Simple shared-secret guard for the message-listing endpoint, so
 * contact submissions aren't publicly readable by anyone who finds
 * the API URL. Not a full auth system — good enough for a personal
 * portfolio's single admin (you) checking messages.
 */
export function requireAdminKey(req, res, next) {
  const expected = process.env.ADMIN_API_KEY;

  if (!expected) {
    const err = new Error("Admin access is not configured on the server.");
    err.status = 501;
    return next(err);
  }

  const provided = req.get("x-admin-key");
  if (provided !== expected) {
    const err = new Error("Unauthorized.");
    err.status = 401;
    return next(err);
  }

  next();
}
