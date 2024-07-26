import { Iuser } from "../../../commonEntities/entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import ErrorHandler from "../../middlewares/errorHandler";

export const coverImageUpload = async (
  userId : string,
  file : Express.Multer.File,
  s3: IS3Operations,
  userRepository: IuserRepository,
  next: Next
) :Promise<Iuser | void >  => {
  try {
    const result = await userRepository.uploadeCoverImage(userId,file,s3)
    if(!result){
      return next(new ErrorHandler(400,"Cover image update failed"))
    }

    console.log("updaed User ==>",result)
    return result

    return result
  } catch (error) {
    
  }
};
