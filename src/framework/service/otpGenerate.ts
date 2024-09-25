import { IotpGenerate } from "../../usecases/interface/service/otpGenerate";

export class OtpGenerate implements IotpGenerate {
  async createOtp(): Promise<string> {
    let numericChar = '0123456789'
    let otp = ''
    for(let i= 0 ; i < 4 ; i ++){
      let randomIndx = Math.floor(Math.random() * numericChar.length)
      otp += numericChar[randomIndx]
    }
    return otp
  }
}