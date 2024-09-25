import { IotpGenerate } from "../../interface/service/otpGenerate.js";
import { IotpRepository } from "../../interface/repositoryInterface/otpRepository.js";
import { IsendEmail } from "../../interface/service/sendEmail.js";
import { Next } from "../../../framework/types/serverPackageType.js";


export const resentOtp = async (otpGenerate : IotpGenerate , otpRepository : IotpRepository ,sendEmail :IsendEmail,email : string,next : Next) => {
  try {
    
    const otp = await otpGenerate.createOtp()
    await otpRepository.resendOtp(email,otp)
    await sendEmail.sentEmailVerification("user",email,otp)
  } catch (error) {
    throw error
  }
}