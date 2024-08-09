import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export class JWTtoken {
    JWT_VERICATION_KEY = process.env.JWT_VERIFICATION_KEY || "";
    JWT_ACCESS_KEY = process.env.JWT_ACCESS_KEY || "";
    JWT_REFRESH_KEY = process.env.JWT_REFRESH_KEY || "";
    async createAccessAndRefreshToken(id) {
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
    async verifyJWT(token, secret) {
        return (await jwt.verify(token, secret));
    }
    async forgotPasswordToken(id, email) {
        const Payload = { id };
        const resetPasswordToken = await jwt.sign(Payload, process.env.JWT_SECRET, {
            expiresIn: "20m",
        });
        return resetPasswordToken;
    }
}
