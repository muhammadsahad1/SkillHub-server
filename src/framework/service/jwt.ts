import jwt, { JwtPayload } from "jsonwebtoken";
import { Ijwt, IToken } from "../../usecases/interface/service/jwt";
import { Iuser } from "../../commonEntities/entities/user";
import dotenv from "dotenv";
dotenv.config();

export interface CustomJwtPayload extends JwtPayload {
  id: string;
}

export class JWTtoken implements Ijwt {
  JWT_VERICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
  JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
  JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";

  async createAccessAndRefreshToken(id: string): Promise<IToken> {
    console.log("token fn invoked ");

    const Payload = { id };
    const accessToken = await jwt.sign(Payload, process.env.JWT_ACCESS_KEY, {
      expiresIn: "5h",
    });

    const refreshToken = await jwt.sign(Payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "3d",
    });
    
    return { accessToken, refreshToken, role: "" };
  }

  // Verifying the Token of users
  async verifyJWT(token: string, secret: string): Promise<CustomJwtPayload> {
    return (await jwt.verify(token, secret)) as CustomJwtPayload;
  }

  async forgotPasswordToken(id: string, email: string): Promise<string> {
    const Payload = { id };
    const resetPasswordToken = await jwt.sign(Payload, process.env.JWT_SECRET, {
      expiresIn: "20m",
    });
    return resetPasswordToken;
  }
}
