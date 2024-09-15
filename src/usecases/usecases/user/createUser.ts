import { IhashPassword } from "../../interface/service/hashPassword";
import { Iuser } from "../../../commonEntities/entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";
import { Ijwt } from "../../interface/service/jwt";

interface UserData {
  name: string;
  email: string;
  password: string;
}

// Creating user after user submits the OTP
export const createUser = async (
  email: string,
  otp: string,
  jwt: Ijwt,
  otpRepository: IotpRepository,
  userRepository: IuserRepository,
  hashPassword: IhashPassword,
  next: Next
): Promise<{
  success: boolean;
  user?: Iuser;
  tokens: { accessToken: string; refreshToken: string };
  message?: string;
} | void> => {
  try {
    // Fetch OTP
    const fetchedOtp = await otpRepository.findOtp(email);
    console.log("fetchedOTP", fetchedOtp);
    if (!fetchedOtp) {
      return next(new ErrorHandler(404, "OTP not found for the given email"));
    }

    // Check if provided OTP matches the stored OTP
    if (fetchedOtp.otp !== otp) {
      return next(new ErrorHandler(400, "Invalid OTP"));
    }

    // Hash the password from the OTP entry
    const hashedPassword = await hashPassword.createHash(
      fetchedOtp.userPassword
    );

    const user = {
      name: fetchedOtp.username,
      email: fetchedOtp.email,
      password: hashedPassword,
    };

    // Save user to the user collection DB
    const newUser = await userRepository.createUser(user);
    const tokens = await jwt.createAccessAndRefreshToken(newUser.id as string);
    console.log("tokens ===>", tokens);
    if (newUser) {
      return {
        success: true,
        user: newUser,
        tokens: tokens,
        message: "successfully created user",
      };
    }
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
