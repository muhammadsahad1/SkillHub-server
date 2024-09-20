import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const reportPost = async (postId, reason, userId, userRepository, next) => {
    try {
        const result = await userRepository.reportPost(postId, reason, userId);
        if (!result) {
            return next(new ErrorHandler(401, "failed "));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "internal server error "));
    }
};
