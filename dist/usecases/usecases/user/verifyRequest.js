import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const verifyRequest = async (userId, requestData, userRepository, next) => {
    try {
        const result = await userRepository.verifyRequest(userId, requestData);
        if (!result) {
            return next(new ErrorHandler(401, "failed to requesting"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
