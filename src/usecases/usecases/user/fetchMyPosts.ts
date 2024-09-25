import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const fetchMyPosts = async (
  userId: string,
  userRepository: IuserRepository,
  s3: IS3Operations,
  next: Next
) => {
  try {
    const result = await userRepository.fetchMyPosts(userId, s3);
    if (!result) {
      return next(new ErrorHandler(400, "fetching your posts failed"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(400, "follow update failed"));
  }
};
