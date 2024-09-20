import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const postLike = async (userId, postId, userRepository, notificationRepository, next) => {
    try {
        const result = await userRepository.postLike(userId, postId);
        if (!result) {
            return next(new ErrorHandler(400, "User does not exist"));
        }
        await notificationRepository.removeNotification(result?.postUserId, "like");
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(400, "User is not found"));
    }
};
