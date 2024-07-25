import { IuserRepository } from "../../interface/repositoryInterface/userRepository"
import { Next } from "../../../framework/types/serverPackageType"
import { IS3Operations } from "../../../framework/service/s3Bucket"
import ErrorHandler from "../../middlewares/errorHandler";

export const getProfileImage = async (
  userId : string,
  userRepository : IuserRepository,
  s3 : IS3Operations,
  next : Next
):Promise<{success: boolean; imageUrl:string | void; message?: string} | void > => {
  try {
       const imageURL = await userRepository.fetchProfileImage(s3,userId)
       return {
        success : true ,
        imageUrl : imageURL,
        message : "fetch profile image successfully"
       }
      
  } catch (error) {
    return next(new ErrorHandler(400, "User is founded"));
  }
}