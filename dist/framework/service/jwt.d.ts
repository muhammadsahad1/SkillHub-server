import { JwtPayload } from "jsonwebtoken";
import { Ijwt, IToken } from "../../usecases/interface/service/jwt";
export interface CustomJwtPayload extends JwtPayload {
    id: string;
}
export declare class JWTtoken implements Ijwt {
    JWT_VERICATION_KEY: string;
    JWT_ACCESS_KEY: string;
    JWT_REFRESH_KEY: string;
    createAccessAndRefreshToken(id: string): Promise<IToken>;
    verifyJWT(token: string, secret: string): Promise<CustomJwtPayload>;
    forgotPasswordToken(id: string, email: string): Promise<string>;
}
