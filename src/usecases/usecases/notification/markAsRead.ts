import { Next } from "../../../framework/types/serverPackageType.js";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const markAsRead = async (
  notificationId: string,
  notificationRepository: InotificationRepository,
  next: Next
) => {
  try {
    await notificationRepository.markAsReadNotification(notificationId)
  } catch (error: any) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
