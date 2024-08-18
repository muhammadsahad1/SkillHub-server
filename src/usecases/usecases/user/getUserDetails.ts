import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";


export const getUserDetails = async (
  userId :string,
  s3 : IS3Operations,
  userRepository : IuserRepository,
  next : Next
) => {
  try {
    const user = await userRepository.getUserDetails(userId)
    const profileImageUrl = await s3.getObjectUrl({
      bucket : process.env.C3_BUCKET_NAME,
      key : user.profileImage
    })
    if(!user){
      return next(new ErrorHandler(400,"User is not found"))
    }
    const userWithImage = {
      ...user,
      profileImageUrl : profileImageUrl
    }
    return userWithImage
  } catch (error) {
    return next(new ErrorHandler(400, "User is founded"));
  }
}