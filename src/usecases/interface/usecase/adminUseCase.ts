import { IToken } from "../service/jwt";
import { Next , Req , Res } from "../../../framework/types/serverPackageType";

interface Admin {
  id: string;
  email: string;
}

export interface LoginResponse {
  success: boolean;
  tokens: IToken;
  message: string;
  admin: Admin;
}
  // each functions Interface (TYPSCRIPT)
  export interface IadminUseCase {
    adminLogin({ email , password } : { email : string , password : string }) : Promise<LoginResponse>;

  }