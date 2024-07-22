import { Iuser } from "../../../entities/user";
import { IsendEmail } from "../../interface/service/sendEmail";
import { Next } from "../../../framework/types/serverPackageType";
import { Ijwt } from "../../interface/service/jwt";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import ErrorHandler from "../../middlewares/errorHandler";

export const forgotPassword = async (
  jwt : Ijwt,
  userRepository : IuserRepository,
  sendEmail : IsendEmail,
  email : string,
  next : Next,
) => {

  try {
    console.log("forgot passs ethi ....")
    const user = await userRepository.findByEmail(email)
    console.log("fech user ",user)
    if(!user){
      return { message : "User not found",success : false}
    }
    // forgotToken generating FN
    const resetPassToken = await jwt.forgotPasswordToken(user?.id,user.email)
    
    // passing the user email and resetToken for update
    const fetechedUser = await userRepository.findOneUpdateResetToken(email,resetPassToken)

    if(!fetechedUser){
      return next(new ErrorHandler(404,"Updateing found error"));
    }

    await sendEmail.sentResetLinkVerification(fetechedUser.name,fetechedUser.email,resetPassToken)
      return {
        success : true,
        token : resetPassToken,
        user : fetechedUser,
        message : "Resetpassord link has been sended",
      }
    


  } catch (error) {
    
  }
}