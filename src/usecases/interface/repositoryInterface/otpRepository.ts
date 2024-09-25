  import { Iotp } from "../../../commonEntities/entities/otp";

export interface IotpRepository{
  createOtp(username : string,userPassword : string | undefined,email : string ,otp :string) : Promise<Iotp>,
  findOtp(email : string) : Promise <Iotp | null>
  // findAndDeleteUser(email : string) : Promise<Boolean>
  resendOtp (email:string,otp : string): Promise<void>
}