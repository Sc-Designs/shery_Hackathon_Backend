const tryCatch = (controller) => {
  return async (req, res, next) => {
    try {
      await controller(req, res, next);
    } catch (error) {
      console.error("❌ Caught Error:", error);

      res.status(error.statusCode || 500).json({
        success: false,
        message: error.message || "Internal Server Error",
        stack: process.env.NODE_ENV === "development" ? error.stack : undefined,
      });
    }
  };
};

export default tryCatch;
