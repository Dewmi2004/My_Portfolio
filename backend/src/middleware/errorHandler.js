export function notFound(req, res) {
  res.status(404).json({ error: `Route not found: ${req.method} ${req.originalUrl}` });
}

export function errorHandler(err, req, res, next) { // eslint-disable-line no-unused-vars
  console.error("[error]", err);
  const status = err.status || 500;
  res.status(status).json({
    error: status === 500 ? "Something went wrong on our end." : err.message,
  });
}
