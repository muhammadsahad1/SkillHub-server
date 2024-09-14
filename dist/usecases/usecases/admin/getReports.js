import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getReports = async (next, adminRepository, s3Operations) => {
    try {
        const result = await adminRepository.getReports(s3Operations);
        if (!result) {
            return next(new ErrorHandler(401, "get Reports failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error"));
    }
};
