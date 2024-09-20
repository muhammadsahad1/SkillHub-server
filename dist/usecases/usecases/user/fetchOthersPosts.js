import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const fetchOthersPosts = async (userId, userRepository, s3, next) => {
    try {
        const result = await userRepository.fetchOthersPosts(userId, s3);
        if (!result) {
            return next(new ErrorHandler(404, "post not founded"));
        }
        return { success: true, posts: result };
    }
    catch (error) {
        next(new ErrorHandler(500, "Internal Server Error"));
        return { success: false, message: "Failed to follow back" };
    }
};
