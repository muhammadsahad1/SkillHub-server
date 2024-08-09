import userModel from "../../../framework/database/mongoDB/model/userModel";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const othersFollowings = async (
  userId : string,
  currentUserId : string,
  userRepository : IuserRepository,
  s3 : IS3Operations,
  next : Next
) => {
  try {
console.log("useIDDDDDDDDDDDDDd ===>",userId);

  const result = await userRepository.othersFollowings(userId,currentUserId,s3)
  if(!result){
    return next(new ErrorHandler(401,"Getting other followings failed"))
    }
    return result
  } catch (error) {
    return next(new ErrorHandler(400,"Followings is not found"))
  }
}