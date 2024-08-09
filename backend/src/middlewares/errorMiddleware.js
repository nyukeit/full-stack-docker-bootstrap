module.exports = (error, req, res, next) => {
  const origin = error.origin || null;
  const status = error.status || 500;
  const message = error.message || "Internal Server Error";
  const data = error.data;

  console.error("errorMiddleware");
  const errorData =
    "Error | " +
    (origin ? `origin: ${origin}` : "") +
    (status ? ` status: ${status}` : "") +
    " - message: " +
    message;

  console.error(errorData);
  // console.error(error.data);

  res.status(status).json({ error: message, data });
};
