import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { ErrorHandler } from "../../middlewares/errorMiddleware";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IUserWithImages } from "../../../commonEntities/entities/user";

export const getMyFollowings = async (
  userId : string,
  userRepository : IuserRepository,
  s3 : IS3Operations,
  next : Next
): Promise<IUserWithImages[] | void> => {
  try {
    
    const myFollowings = await userRepository.getMyFollowing(userId,s3)

    if(!myFollowings){
      return next(new ErrorHandler(401,"This user don't have followings"))
    }
    return myFollowings
  } catch (error) {
    return next(new ErrorHandler(400, "User is founded"));
  }
}