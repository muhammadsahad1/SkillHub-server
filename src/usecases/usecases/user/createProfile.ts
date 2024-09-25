import { Iuser } from "../../../commonEntities/entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { ErrorHandler } from '../../middlewares/errorMiddleware' ;

export const createProfile = async (
  user : Iuser,
  file : Express.Multer.File,
  userRepository : IuserRepository,
  S3Operations : IS3Operations,
  next : Next 
) : Promise<{ success: boolean; user?: Iuser; message?: string }| void> => {
  try {
  
    const updatedUser = await userRepository.createProfile(user,file,S3Operations)
    if(!updatedUser){
      return next(new ErrorHandler(400,"Profile creation failed"))
    }

    return {
      success : true ,
      user : updatedUser,
      message : "Profile created successfully."
    }
  
  } catch (error) {
    
  }
}