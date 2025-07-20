import AppError from "./AppError.js";
class BadRequestError extends AppError {
  constructor(message = "Bad Request") {
    super(message, 400);
  }
}

class UnauthorizedError extends AppError {
  constructor(message = "Unauthorized") {
    super(message, 401);
  }
}

class ForbiddenError extends AppError {
  constructor(message = "Forbidden") {
    super(message, 403);
  }
}

class NotFoundError extends AppError {
  constructor(message = "Resource Not Found") {
    super(message, 404);
  }
}

class ConflictError extends AppError {
  constructor(message = "Conflict") {
    super(message, 409);
  }
}

class InternalServerError extends AppError {
  constructor(message = "Internal Server Error") {
    super(message, 500);
  }
}

export {
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  NotFoundError,
  ConflictError,
  InternalServerError,
};
