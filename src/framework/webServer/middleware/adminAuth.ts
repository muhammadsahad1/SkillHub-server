import { Request, Response, NextFunction } from "express";
import { JWTtoken } from "../../service/jwt";
import userModel from "../../database/mongoDB/model/userModel";
import { CustomRequest } from "./request/customReq";
import { refreshTokenOption, accessTokenOption } from "./jwt";
import { RequestHandler } from "express";

const jwt = new JWTtoken();

export const isAdminAuthenticate: RequestHandler = async (req, res, next) => {
  const customReq = req as Request;
  const accessToken = customReq.cookies.admin_access_token;
  const refreshToken = customReq.cookies.admin_refresh_token;
  console.log("customReq.cookies", customReq.cookies);
  console.log("ass ==>", accessToken);
  console.log("ref ==>", refreshToken);

  // Check for access token

  try {
    // Verify access token
    const decoded = await jwt.verifyJWT(
      accessToken,
      process.env.JWT_ACCESS_KEY
    );
    console.log("decoded admin ==>", decoded, "ide ==>", decoded.id);
    const user = await userModel.findById(decoded.id).select("-password");
    console.log("user ==> in admin ->", user);
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user._id }; 
    return next();
  } catch (error: any) {
    console.log("Access token verification failed:", error.message);

    if (!accessToken) {
      console.log("not accesstoken");
      // return res.status(401).json({ message: "Not authorized, no access token" });
      if (refreshToken) {
        try {
          console.log("keti");
          const reDecoded = await jwt.verifyJWT(
            refreshToken,
            process.env.JWT_REFRESH_KEY
          );
          console.log("reDecoded ===>", reDecoded);
          const newTokens = await jwt.createAccessAndRefreshToken(reDecoded.id);
          console.log("nweToek ==>", newTokens);
          // Set new access token and refresh token in cookie
          res.cookie(
            "admin_access_token",
            newTokens.accessToken,
            accessTokenOption
          );
          res.cookie(
            "admin_refresh_token",
            newTokens.refreshToken,
            refreshTokenOption
          );
          const user = await userModel
            .findById(reDecoded.id)
            .select("-password");
          if (!user) {
            return res.status(401).json({ message: "User not found" });
          }

          req.user = { id: user._id };
          return next();
        } catch (refreshError: any) {
          console.log(
            "Refresh token verification failed:",
            refreshError.message
          );
          return res
            .status(401)
            .json({ message: "Not authorized, invalid refresh token" });
        }
      } else {
        return res
          .status(401)
          .json({ message: "Not authorized, no refresh token" });
      }
    }
  }
};
