import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const getPosts = async (
  userSKill: string,
  s3: IS3Operations,
  userRepository: IuserRepository,
  next: Next
) => {
  try {
    const result = await userRepository.fetchPosts(userSKill, s3);
    console.log("rseult of fetched usererr =>",result)
    if (!result) {
      return next(new ErrorHandler(400, "Feed users post failed"));
    }

    return result;
  } catch (error) {
    return next(new ErrorHandler(400, "User is founded"));
  }
};
