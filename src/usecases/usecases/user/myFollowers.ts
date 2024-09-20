import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";


export const myFollowers = async (
  userId: string,
  s3 : IS3Operations,
  userRepository: IuserRepository,
  next : Next
) => {
  try {
    const followers = await userRepository.myFollowers(userId,s3)
    
    if(!followers){
      return next(new ErrorHandler(400,"User is not found"))
    }
    return followers
  } catch (error) {
    return next(new ErrorHandler(400,"User is not found"))
  }
};
