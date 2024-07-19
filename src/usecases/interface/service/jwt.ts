import { Iuser } from "../../../entities/user";
import jwt , {JwtPayload} from 'jsonwebtoken'

export interface IToken {
  accessToken: string;
  refreshToken: string;
  role: string;
}



export interface Ijwt {
  createAccessAndRefreshToken(id: string): Promise<IToken>;
  verifyJWT(token: string,secret : String): Promise<string | jwt.JwtPayload> ;
  forgotPasswordToken(id :string , email: string) : Promise<string>
}
