import { Request, Response, NextFunction } from "express";
import { JWTtoken } from "../../service/jwt";
import userModel from "../../database/mongoDB/model/userModel";
import { CustomRequest } from "./request/customReq";
import { refreshTokenOption, accessTokenOption } from "./jwt";
import { RequestHandler } from "express";

const jwt = new JWTtoken();

export const isAuthenticate: RequestHandler = async (req, res, next) => {
  const customReq = req as CustomRequest;
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
    const decoded = await jwt.verifyJWT(
      accessToken,
      process.env.JWT_ACCESS_KEY
    );
    const user = await userModel.findById(decoded.id).select("-password");

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    req.user = { id: user.id };
    // Attach user to request
    return next();
  } catch (error: any) {
    console.log("Access token verification failed:", error.message);

    if (!accessToken) {
      // return res.status(401).json({ message: "Not authorized, no access token" });
      if (refreshToken) {
        try {
          const reDecoded = await jwt.verifyJWT(
            refreshToken,
            process.env.JWT_REFRESH_KEY
          );
          const newTokens = await jwt.createAccessAndRefreshToken(reDecoded.id);

          // Set new access token and refresh token in cookie
          res.cookie("accessToken", newTokens.accessToken, accessTokenOption);
          res.cookie(
            "refreshToken",
            newTokens.refreshToken,
            refreshTokenOption
          );
          const user = await userModel
            .findById(reDecoded.id)
            .select("-password");
          if (!user) {
            return res.status(401).json({ message: "User not found" });
          }

          req.user = { id: user.id };
          console.log("user_Id ====>", req.user);
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
