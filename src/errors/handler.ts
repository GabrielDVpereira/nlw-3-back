import { ErrorRequestHandler } from "express";
import { ValidationError } from "yup";

interface ValidationErrors {
  [key: string]: string[];
}

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  console.log(err);

  if (err instanceof ValidationError) {
    let errors: ValidationErrors = {};

    err.inner.forEach((error) => {
      errors[error.path] = error.errors;
    });

    return res.status(400).json({ message: "Validation fails", errors });
  }
  return res.status(500).json({ message: "Internal server error" });
};

export default errorHandler;
