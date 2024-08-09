export const catchError = (error, next) => {
    let message;
    if (error instanceof Error) {
        message = error.message;
    }
    else if (error && typeof error === "object" && "message" in error) {
        message = String(error.message);
    }
    else if (typeof error === "string") {
        message = error;
    }
    else {
        message = "unknown error";
    }
    return next(error);
};
