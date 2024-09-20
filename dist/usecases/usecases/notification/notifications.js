import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const notifications = async (userId, notificationRepository, next) => {
    try {
        const notifications = await notificationRepository.notifications(userId);
        if (!notifications) {
            return next(new ErrorHandler(401, "Their is no notification failed"));
        }
        return notifications;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
