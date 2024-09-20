import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { ErrorHandler } from '../../middlewares/errorMiddleware.js' ;
import { IhashPassword } from "../../interface/service/hashPassword.js";

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

      if(result) {
        return {
          success : true,
          user : result,
          message : "reset password successfully"
        }
      }
    } catch (error) {
      return next(new ErrorHandler(400, "failed tp reset password"));
    }
}