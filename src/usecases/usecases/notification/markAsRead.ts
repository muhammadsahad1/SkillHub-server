import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

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
