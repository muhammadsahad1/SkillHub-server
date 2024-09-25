import { Next } from "../../framework/types/serverPackageType";

export const catchError = (error: unknown, next: Next) => {
  let message: string;
  if (error instanceof Error) {
    message = error.message;
  } else if (error && typeof error === "object" && "message" in error) {
    message = String(error.message);
  } else if (typeof error === "string") {
    message = error;
  } else {
    message = "unknown error";
  }

  return next(error)
};
