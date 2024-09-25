import { IuserRepository } from "../../interface/repositoryInterface/userRepository.js";
import { IToken, Ijwt } from "../../interface/service/jwt.js";
import { Iuser } from "../../../commonEntities/entities/user.js";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository.js";
import { IotpGenerate } from "../../interface/service/otpGenerate.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IsendEmail } from "../../interface/service/sendEmail.js";
import { IhashPassword } from "../../interface/service/hashPassword.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

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
      const createdOtp = await otpGenerate.createOtp();
      const responseCreateOtp = await otpRepository.createOtp(
        user.name,
        user.email,
        user.password,
        createdOtp
      );

      await sendEmail.sentEmailVerification(user.name, user.email, createdOtp);
      const password = await hashPassword.createHash(user.password as string);
      user.password = password;

      return { success: true, message: "otp send" };
    }
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Error"));
  }
};
