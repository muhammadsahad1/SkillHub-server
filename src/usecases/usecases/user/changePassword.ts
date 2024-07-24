import { IhashPassword } from "../../interface/service/hashPassword"
import { Next } from "../../../framework/types/serverPackageType"
import { IuserRepository } from "../../interface/repositoryInterface/userRepository"
import ErrorHandler from "../../middlewares/errorHandler"

export const changePassword = async(
  userId : string,
  currentPassword : string,
  newPassword : string,
  hashPassword :IhashPassword,
  userRepository : IuserRepository,
  next : Next
) : Promise<any>=> {
try {
  console.log("kerii")
    const user = await userRepository.getUser(userId)
    console.log("user geted",user)

    if(!user){
      return next(new ErrorHandler(400,"User is not found"))
    }

    const compare = await hashPassword.comparePassword(currentPassword,user?.password)
    console.log("compare",compare)
    
    if(!compare) {
      return { success : false , message : "Current password is incorrect"}
    }
    const hashedPassword = await hashPassword.createHash(currentPassword)
    await userRepository.findByIdUpdateUpdateOne(userId,hashedPassword)

    return {
      success : true,
      message : "Pasword changed successfully",
    }
} catch (error :any) {
  return next(new ErrorHandler(500,"Internal Server Error"));
}


}