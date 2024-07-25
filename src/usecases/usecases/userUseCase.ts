import {
  userSignup,
  createUser,
  login,
  createProfile,
  resetPassword,
  forgotPassword,
  getProfileImage,
  changePassword,
  getUser

} from "./user/index";
import { IuserUseCase } from "../interface/usecase/userUseCase";
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { Ijwt, IToken } from "../interface/service/jwt";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IhashPassword } from "../interface/service/hashPassword";
import { Iuser } from "../../commonEntities/entities/user";
import { IsendEmail } from "../interface/service/sendEmail";
import { Next } from "../../framework/types/serverPackageType";
import { resentOtp } from "./user/resentOtp";
import ErrorHandler from "../middlewares/errorHandler";
import { IS3Operations } from "../../framework/service/s3Bucket";

// ================================= User user cases ================================= \\

export class UserUseCase implements IuserUseCase {
  constructor(
    private userRepostory: IuserRepository,
    private Jwt: Ijwt,
    private otpRepository: IotpRepository,
    private hashPassword: IhashPassword,
    private otpGenerate: IotpGenerate,
    private sendEmail: IsendEmail,
    private s3: IS3Operations
  ) {}
// ===================================================================>
  async userSignup(
    user: Iuser,
    next: Next
  ): Promise<string | void | { success: boolean; message: string }> {
    try {
      let token = await userSignup(
        this.Jwt,
        this.otpRepository,
        this.userRepostory,
        this.otpGenerate,
        this.hashPassword,
        user,
        this.sendEmail,
        next
      );
      return token;
    } catch (error) {
      console.log(error);
    }
  }
// ===================================================================>
  async createUser(
    email: string,
    otp: string,
    next: Next
  ): Promise<
    Iuser | void | { success: boolean; user?: Iuser; message?: string }
  > {
    const newuser = await createUser(
      email,
      otp,
      this.otpRepository,
      this.userRepostory,
      this.hashPassword,
      next
    );
    return newuser;
  }
// ===================================================================>
  async resendOtp(email: string, next: Next): Promise<void> {
    await resentOtp(
      this.otpGenerate,
      this.otpRepository,
      this.sendEmail,
      email,
      next
    );
  }
// ===================================================================>
  async login(
    user: Iuser,
    next: Next
  ): Promise<{ fetchUser: Iuser; tokens: IToken }> {
    const tokens = await login(
      this.userRepostory,
      this.Jwt,
      this.hashPassword,
      user.email,
      user.password,
      user.picture,
      next
    );
    return tokens;
  }
// ===================================================================>
  async forgotPassword(
    email: string,
    next: Next
  ): Promise<
    | void
    | Iuser
    | { success: boolean; token: string; user: Iuser; message: string }
  > {
    const result = await forgotPassword(
      this.Jwt,
      this.userRepostory,
      this.sendEmail,
      email,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "user reset password updated failed"));
    }
    return result;
  }
// ===================================================================>
  async resetPassword(
    password: string,
    resetToken: string,
    next: Next
  ): Promise<{ success: boolean; user?: Iuser; message?: string } | void> {
    const result = await resetPassword(
      password,
      resetToken,
      this.userRepostory,
      this.hashPassword,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "User is founded"));
    }
    return result;
  }
// ===================================================================>
async getUser (userId : string,next : Next): Promise<Iuser | undefined | void>{
  const result = await getUser(userId,this.userRepostory,next)
  if(!result){
    return next(new ErrorHandler(400,"User is founded"))
  }
  return result
}

// ===================================================================>
async changePassword ( userId : string ,currentPassword : string ,newPassword : string,next : Next) :Promise<{ success : boolean ; message? :string} | any> {
  const result = await changePassword(userId,currentPassword,newPassword,this.hashPassword,this.userRepostory,next)
  if(!result){
    return next(new ErrorHandler(400,"User is founded"))
  }
  return result
}

// ===================================================================>
  async createProfile(
    user: Iuser,
    file: Express.Multer.File,
    next: Next
  ): Promise<void | {
    success: boolean;
    user?: Iuser;
    token: IToken;
    message?: string;
  }> {
    console.log("user details in creating===>", user, "  file ===>", file);
    const result = await createProfile(
      user,
      file,
      this.userRepostory,
      this.Jwt,
      this.s3,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "Profile update failed"));
    }
    return result;
  }

// ===================================================================>
  async getProfileImage(
    userId: string,
    next: Next
  ): Promise<{
    success: boolean;
    imageUrl: string | void;
    message?: string;
  } | void> {
    const result = await getProfileImage(
      userId,
      this.userRepostory,
      this.s3,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "User is founded"));
    }
    return result;
  }
// ===================================================================>

}
