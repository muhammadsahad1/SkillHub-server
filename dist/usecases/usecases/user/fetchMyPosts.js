import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const fetchMyPosts = async (userId, userRepository, s3, next) => {
    try {
        const result = await userRepository.fetchMyPosts(userId, s3);
        if (!result) {
            return next(new ErrorHandler(400, "fetching your posts failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(400, "follow update failed"));
    }
};
