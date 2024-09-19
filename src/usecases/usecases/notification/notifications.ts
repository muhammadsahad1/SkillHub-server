import { INotification } from "../../../framework/database/mongoDB/model/notification.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const notifications = async (
  userId: string,
  notificationRepository: InotificationRepository,
  next: Next
): Promise<INotification[] | undefined | void> => {
  try {
    const notifications = await notificationRepository.notifications(userId);
    if (!notifications) {
      return next(new ErrorHandler(401, "Their is no notification failed"));
    }
    return notifications;
  } catch (error: any) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
