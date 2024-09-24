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
exports.isAdminAuthenticate = void 0;
const jwt_1 = require("../../service/jwt");
const userModel_1 = __importDefault(require("../../database/mongoDB/model/userModel"));
const jwt_2 = require("./jwt");
const jwt = new jwt_1.JWTtoken();
const isAdminAuthenticate = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const customReq = req;
    const accessToken = customReq.cookies.admin_access_token;
    const refreshToken = customReq.cookies.admin_refresh_token;
    console.log("customReq.cookies", customReq.cookies);
    console.log("ass ==>", accessToken);
    console.log("ref ==>", refreshToken);
    // Check for access token
    try {
        // Verify access token
        const decoded = yield jwt.verifyJWT(accessToken, process.env.JWT_ACCESS_KEY);
        const user = yield userModel_1.default.findById(decoded.id).select("-password");
        console.log("user ==> in admin ->", user);
        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }
        req.user = { id: user.id }; // Attach user to request
        return next();
    }
    catch (error) {
        console.log("Access token verification failed:", error.message);
        if (!accessToken) {
            console.log("not accesstoken");
            // return res.status(401).json({ message: "Not authorized, no access token" });
            if (refreshToken) {
                try {
                    console.log("keti");
                    const reDecoded = yield jwt.verifyJWT(refreshToken, process.env.JWT_REFRESH_KEY);
                    console.log("reDecoded ===>", reDecoded);
                    const newTokens = yield jwt.createAccessAndRefreshToken(reDecoded.id);
                    console.log("nweToek ==>", newTokens);
                    // Set new access token and refresh token in cookie
                    res.cookie("admin_access_token", newTokens.accessToken, jwt_2.accessTokenOption);
                    res.cookie("admin_refresh_token", newTokens.refreshToken, jwt_2.refreshTokenOption);
                    const user = yield userModel_1.default
                        .findById(reDecoded.id)
                        .select("-password");
                    if (!user) {
                        return res.status(401).json({ message: "User not found" });
                    }
                    req.user = { id: user.id };
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
exports.isAdminAuthenticate = isAdminAuthenticate;
