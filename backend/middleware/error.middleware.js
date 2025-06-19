const errorMiddleware = (err, req, res, next) => {
  try {
    //Make a copy of the error object and attach a message
    if (res.headersSent) return next(err);

    let error = { ...err };
    error.message = err.message;

    console.error("Error: ", err);

    // Figure out the type of error

    // Mongo Cast Error (Invalid ObectId)
    if (err.name === "CastError") {
      const message = "Resource not found";

      error = new Error(message);
      error.statusCode = 404;
    }

    //Unique field value is already used (e.g., same email during signup)
    if (err.code === 1100) {
      const message = "Duplicate field value entered";

      error = new Error(message);
      error.statusCode = 400;
    }

    if (err.name === "ValidationError") {
      const message = Object.values(err.errors).map((val) => val.message);
      error = new Error(message.join(", "));
      error.statusCode = 400;
    }

    // JWT Auth Errors
    if (err.name == "JsonWebTokenError") {
      error = new Error("Invalid token. Please try again.");
      error.statusCode = 401;
    }

    if (err.name === "TokenExpiredError") {
      error = new Error("Token has expired. Please log in again.");
      error.statusCode = 401;
    }

    // File Upload Error (Multer)
    if (err.code === "LIMIT_FILE_SIZE") {
      error = new Error("File size too large");
      error.statusCode = 400;
    }

    res
      .status(error.statusCode || 500)
      .json({ success: false, error: error.message || "Server Error" });
  } catch (error) {
    next(error);
  }
};

export default errorMiddleware;
