import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { Next } from "../../../framework/types/serverPackageType";
import { ErrorHandler } from '../../middlewares/errorMiddleware' ;
import { IhashPassword } from "../../interface/service/hashPassword";

export const resetPassword = async (
  password : string,
  token : string,
  userRepository : IuserRepository,
  hashPassword: IhashPassword,
  next :Next
) => {
  try {

    const hashedPassword = await hashPassword.createHash(password)

      const result = await userRepository.resetPasswordVerify(hashedPassword,token)
      console.log("result from db =>",result)

      if(result) {
        return {
          success : true,
          user : result,
          message : "reset password successfully"
        }
      }
  }catch(error){
    console.log("reset password failed",error)
  }
}