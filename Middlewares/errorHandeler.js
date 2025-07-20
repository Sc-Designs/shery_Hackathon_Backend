const errorHandeler = (err, req, res, next) => {
  console.error("❌ Error:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    status: err.status || "error",
    message,
    timestamp: err.timestamp || new Date().toISOString(),
    stack: process.env.NODE_ENV === "development" ? err.stack : undefined,
  });
};

export default errorHandeler;