import { Iotp } from "../../../../commonEntities/entities/otp";
import otpModel from "../model/otpModel";
import { IotpRepository } from "../../../../usecases/interface/repositoryInterface/otpRepository";

export class OtpRepository implements IotpRepository {

  // creating opt document for particular time (1m) 
  async createOtp(username:string,email: string,userPassword:string, otp: string): Promise<Iotp> {
      try {
        
        const resultOtp = await otpModel.create({username, email ,userPassword,otp })
        resultOtp.save()
        console.log("created OTP ==>" , resultOtp)
        return resultOtp  
        
      } catch (error) {
        throw error
      }
  }
  async findOtp(email: string): Promise<Iotp | null> {
    try {

      const fetchOtp = await otpModel.findOne({ email })
      console.log("fetchOtp ===>",fetchOtp)
      return fetchOtp
    } catch (error) {
      console.log(error)
      return null
    }
  
  }
  findAndDeleteUser(email: string): Promise<Boolean> {
    
  }
  resendOtp(email: string, otp: string): Promise<void> {
    
  }
  
}