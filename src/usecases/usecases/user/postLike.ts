import { Next } from "../../../framework/types/serverPackageType.js";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const postLike = async (
  userId: string,
  postId: string,
  userRepository: IuserRepository,
  notificationRepository : InotificationRepository,
  next : Next
) => {
  try {
    const result = await userRepository.postLike(userId, postId);
    
    if (!result) {
      return next(new ErrorHandler(400, "User does not exist"));
    }
    await notificationRepository.removeNotification(result?.postUserId,"like")
    return result
  } catch (error) {
    return next(new ErrorHandler(400,"User is not found"))
  }
};
