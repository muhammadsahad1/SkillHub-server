import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const markAsRead = async (notificationId, notificationRepository, next) => {
    try {
        await notificationRepository.markAsReadNotification(notificationId);
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
