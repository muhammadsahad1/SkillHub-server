import { INotification } from "../../../framework/database/mongoDB/model/notification";
import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

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
