"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAuthenticate = void 0;
const jwt_1 = require("../../service/jwt");
const userModel_1 = __importDefault(require("../../database/mongoDB/model/userModel"));
const jwt_2 = require("./jwt");
const jwt = new jwt_1.JWTtoken();
const isAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    const accessToken = customReq.cookies.accessToken;
    const refreshToken = customReq.cookies.refreshToken;
    console.log("access TOken ==>", accessToken);
    console.log("refreashToken ===>", refreshToken);
    // eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
    //   .eyJpZCI6IjY2Yjc3ZTVmNTRiYTIxNWM4Mjg1MzExYSIsImlhdCI6MTcyNTYzMTA0OCwiZXhwIjoxNzI1NjQ5MDQ4fQ
    //   .Ie6SFpCwbYaWAlerYTRQWHp1zw90AyeLdjMBjuuZ8WM;
    // Check for access token
    try {
        // Verify access token
        const decoded = yield jwt.verifyJWT(accessToken, process.env.JWT_ACCESS_KEY);
        const user = yield userModel_1.default.findById(decoded.id).select("-password");
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = { id: user.id };
        // Attach user to request
        return next();
    }
    catch (error) {
        console.log("Access token verification failed:", error.message);
        if (!accessToken) {
            // return res.status(401).json({ message: "Not authorized, no access token" });
            if (refreshToken) {
                try {
                    const reDecoded = yield jwt.verifyJWT(refreshToken, process.env.JWT_REFRESH_KEY);
                    const newTokens = yield jwt.createAccessAndRefreshToken(reDecoded.id);
                    // Set new access token and refresh token in cookie
                    res.cookie("accessToken", newTokens.accessToken, jwt_2.accessTokenOption);
                    res.cookie("refreshToken", newTokens.refreshToken, jwt_2.refreshTokenOption);
                    const user = yield userModel_1.default
                        .findById(reDecoded.id)
                        .select("-password");
                    if (!user) {
                        return res.status(401).json({ message: "User not found" });
                    }
                    req.user = { id: user.id };
                    console.log("user_Id ====>", req.user);
                    return next();
                }
                catch (refreshError) {
                    console.log("Refresh token verification failed:", refreshError.message);
                    return res
                        .status(401)
                        .json({ message: "Not authorized, invalid refresh token" });
                }
            }
            else {
                return res
                    .status(401)
                    .json({ message: "Not authorized, no refresh token" });
            }
        }
    }
});
exports.isAuthenticate = isAuthenticate;
