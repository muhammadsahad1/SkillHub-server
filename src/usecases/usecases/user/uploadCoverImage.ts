import { Iuser } from "../../../commonEntities/entities/user.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { ErrorHandler } from '../../middlewares/errorMiddleware.js' ;

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
