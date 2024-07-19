import { Iuser } from "../../../entities/user";
import { IToken } from "../service/jwt";
import { Next, Req, Res } from "../../../framework/types/serverPackageType";

// each functions Interface (TYPSCRIPT)
export interface IuserUseCase {
  userSignup(user: Iuser, next: Next): Promise<string | void | { success: boolean; message: string; }>;
  login(user: Iuser, next: Next):Promise<{ fetchUser: Iuser; tokens: IToken } | void > 
  createUser(email: string, otp: string, next: Next): Promise<void | Iuser| { success: boolean; user?: Iuser; message?: string }>;
  createProfile(user : Iuser,file: Express.Multer.File | undefined, next : Next) : Promise<void | {
    token: { accessToken: string; refreshToken: string; }; success : boolean; user?:Iuser ; message?: string 
}>;
  resendOtp(email : string,next:Next):Promise<void>;
  getUser(id: string, next: Next): Promise<Iuser | undefined>;
}
