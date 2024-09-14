import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getVerificationRequests = async (adminRepostory, next) => {
    try {
        const result = await adminRepostory.getVerificationRequests();
        if (!result) {
            return next(new ErrorHandler(401, "requests not found"));
        }
        return result;
    }
    catch (error) {
    }
};
