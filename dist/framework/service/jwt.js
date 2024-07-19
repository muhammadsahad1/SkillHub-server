var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export class JWTtoken {
    constructor() {
        this.JWT_VERICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
        this.JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
        this.JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";
    }
    //  creating verification JWT Token
    createVerificationJWT(Payload) {
        return __awaiter(this, void 0, void 0, function* () {
            const verifyToken = yield jwt.sign(Payload, this.JWT_VERICATION_KEY, {
                expiresIn: "15m",
            });
            return verifyToken;
        });
    }
    // creating Access Token and Refresh Token
    createAccessAndRefreshToken(id) {
    }
    // Verifying the Token of users
    verifyJWT(token) {
        throw new Error("Method not implemented.");
    }
    forgotPasswordToken(id, email) {
        throw new Error("Method not implemented.");
    }
}
