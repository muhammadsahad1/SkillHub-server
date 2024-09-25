import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const fetchOthersPosts = async (
  userId: string,
  userRepository: IuserRepository,
  s3: IS3Operations,
  next: Next
) => {
  try {
    const result = await userRepository.fetchOthersPosts(userId, s3);

    if (!result) {
      return next(new ErrorHandler(404, "post not founded"));
    }
    return { success: true, posts: result };
  } catch (error) {
    next(new ErrorHandler(500, "Internal Server Error"));
    return { success: false, message: "Failed to follow back"};
  }
};
