import { Next } from "../../../framework/types/serverPackageType.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const reportPost = async (
  postId: string,
  reason: string,
  userId: string,
  userRepository : IuserRepository,
  next : Next
) => {
  try {
    const result = await userRepository.reportPost(postId,reason,userId)
    if(!result){
      return next(new ErrorHandler(401,"failed "))
    }
    return result
  } catch (error) {
    return next(new ErrorHandler(500,"internal server error "))
  }
};
