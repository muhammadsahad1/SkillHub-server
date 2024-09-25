import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const othersFollowers = async (
  userId: string,
  currentUserId : string,
  userRepository: IuserRepository,
  s3 : IS3Operations,
  next: Next
) => {
  try {
    const result = await userRepository.othersFollowers(userId,currentUserId,s3)
    if(!result){
      return next(new ErrorHandler(401,"Getting other followers failed"))
    }
    console.log("res ===============>",result)
    return result
  } catch (error) {
    return next(new ErrorHandler(400,"User is not found"))
  }
};
