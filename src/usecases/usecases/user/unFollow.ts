import { Next } from "../../../framework/types/serverPackageType.js";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const unFollow = async (
  toUnfollowId: string,
  fromFollowerId: string,
  userRepository: IuserRepository,
  notification: InotificationRepository,
  next: Next
) => {
  try {
    console.log("ethiiiiiyeee");
    
    await userRepository.unFollow(toUnfollowId, fromFollowerId);
    await notification.removeNotification(toUnfollowId, "follow");

    return { success: true, message: "unFollowed successfull" };
  } catch (error) {
    return next(new ErrorHandler(400, "follow update failed"));
  }
};
