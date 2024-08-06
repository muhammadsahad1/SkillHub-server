import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const postLike = async (
  userId: string,
  postId: string,
  userRepository: IuserRepository,
  next : Next
) => {
  try {
    const result = await userRepository.postLike(userId, postId);
    if (!result) {
      return next(new ErrorHandler(400, "User does not exist"));
    }
    return result
  } catch (error) {
    return next(new ErrorHandler(400,"User is not found"))
  }
};
