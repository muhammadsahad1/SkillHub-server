import { IhashPassword } from "../../interface/service/hashPassword";
import { Iuser } from "../../../entities/user";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository";
import ErrorHandler from "../../middlewares/errorHandler";

// Creating user after user submits the OTP
export const createUser = async (
  email: string,
  otp: string,
  otpRepository: IotpRepository,
  userRepository: IuserRepository,
  hashPassword: IhashPassword,
  next: Next,
): Promise<{ success: boolean; user?: Iuser; message?: string }| void> => {
  try {
    // Fetch OTP 
    const fetchedOtp = await otpRepository.findOtp(email);
    console.log("fetchedOTP",fetchedOtp)
    if (!fetchedOtp) {
      return next(new ErrorHandler(404,"OTP not found for the given email"));
    }

    // Check if provided OTP matches the stored OTP
    if (fetchedOtp.otp !== otp) {
      return next(new ErrorHandler(400,"Invalid OTP"));
    }

    // Hash the password from the OTP entry
    const hashedPassword = await hashPassword.createHash(fetchedOtp.userPassword);

    const user: Iuser = {
      name: fetchedOtp.username,
      email: fetchedOtp.email,
      password: hashedPassword,
    };

    console.log("user ==> creating user",user)
    // Save user to the user collection DB
    const newUser = await userRepository.createUser(user);
    if(newUser){
      return { success : true , user : newUser , message : "successfully created user"}
    }
  

  } catch (error) {
    return next(new ErrorHandler(500,"Internal Server Error"));
  }
};
