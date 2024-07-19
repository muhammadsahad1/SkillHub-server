import { Iuser } from "../../../entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Ijwt } from "../../interface/service/jwt";
import ErrorHandler from "../../middlewares/errorHandler";

export const createProfile = async (
  user : Iuser,
  file : Express.Multer.File,
  userRepository : IuserRepository,
  jwt : Ijwt,
  s3upload : IS3Operations,
  next : Next 
) : Promise<{ success: boolean;token : {accessToken: string;refreshToken: string;role: string;}, user?: Iuser; message?: string }| void> => {
  try {
    console.log("throught this")
    const updatedUser = await userRepository.createProfile(user,file,s3upload)
    console.log("updatedUser",updatedUser)
    if(!updatedUser){
      return next(new ErrorHandler(400,"Profile creation failed"))
    }
    // generating token as return
    const fetchUser = await userRepository.findByEmail(user.email)
    const tokens = await jwt.createAccessAndRefreshToken(fetchUser?.id as string)

    return {
      success : true ,
      token : tokens,
      user : updatedUser,
      message : "Profile created successfully."
    }
  
  } catch (error) {
    
  }
}