import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IToken, Ijwt } from "../../interface/service/jwt";
import { Iuser } from "../../../commonEntities/entities/user";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { IotpGenerate } from "../../interface/service/otpGenerate";
import { Next } from "../../../framework/types/serverPackageType";
import { IsendEmail } from "../../interface/service/sendEmail";
import { IhashPassword } from "../../interface/service/hashPassword";
import ErrorHandler from "../../middlewares/errorHandler";

export const userSignup = async (
  jwt: Ijwt,
  otpRepository: IotpRepository,
  userRepostory: IuserRepository,
  otpGenerate: IotpGenerate,
  hashPassword: IhashPassword,
  user: Iuser,
  sendEmail: IsendEmail,
  next: Next
): Promise<string | void | { success: boolean; message: string }> => {
  try {
    
    const existUser = await userRepostory.findByEmail(user.email);
    if (existUser) {
      console.log("user already exists");
      return next(new ErrorHandler(400, "User already exists"));
    } 

    const userInOtp = await otpRepository.findOtp(user.email);
    if (userInOtp) {
      await sendEmail.sentEmailVerification(
        user.name,
        user.email,
        userInOtp.otp as string
      );
    } else {
      console.log("otp keri");
      const createdOtp = await otpGenerate.createOtp();
      const responseCreateOtp = await otpRepository.createOtp(
        user.name,
        user.email,
        user.password,
        createdOtp
      );
      console.log("responseCreateOtp",responseCreateOtp)
      await sendEmail.sentEmailVerification(user.name, user.email, createdOtp);
      const password = await hashPassword.createHash(user.password as string);
      user.password = password;

      return { success: true, message: "otp send" };
    }
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Error"));
  }
};
