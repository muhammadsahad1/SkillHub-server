import { Iuser } from "../entities/user";
import { Req, Res, Next } from "../framework/types/serverPackageType";
import { IuserUseCase } from "../usecases/interface/usecase/userUseCase";
import {
  accessTokenOption,
  refreshTokenOption,
  roleOptions,
} from "../framework/webServer/middleware/jwt";
import ErrorHandler from "../usecases/middlewares/errorHandler";

// ===================================== User Controller ================================= //

export class UserController {
  constructor(private userUseCase: IuserUseCase) {}
  // ===================================================================>
  // User signup
  async userSignup(req: Req, res: Res, next: Next) {
    try {
      const response = await this.userUseCase.userSignup(req.body, next);
      res.json(response); // Send response back to client
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Creating user
  async createUser(req: Req, res: Res, next: Next) {
    try {
      console.log("req.body===>", req.body);
      console.log("req.bodyOTP", req.body.verifyCode);
      const newUser = await this.userUseCase.createUser(
        req.body.email,
        req.body.verifyCode,
        next
      );
      res.json(newUser);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // resentOtp
  async resentOtp(req: Req, res: Res, next: Next) {
    try {
      console.log(req.body);
      const { email } = req.body;
      await this.userUseCase.resendOtp(email, next);
      res.json({ success: true, message: "Resented Otp in your Email" });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // login and created&stored JWT Token
  async login(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.login(req.body, next);
      if (result) {
        const { accessToken, refreshToken } = result.tokens;
        res.cookie("accessToken", accessToken, accessTokenOption);
        res.cookie("refreshToken", refreshToken, refreshTokenOption);
        res.cookie("role", "user", roleOptions);
        res.json({
          user: result.fetchUser,
          message: "User Logged successfully",
          success: true,
          role: "user",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // forgetPassword update
  async forgotPassword(req: Req, res: Res, next: Next) {
    try {
      const { email } = req.body;
      const result = await this.userUseCase.forgotPassword(email, next);
      if (result) {
        res.json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // reset Password
  async resetPassword(req: Req, res: Res, next: Next) {
    const result = await this.userUseCase.resetPassword(
      req.body.password,
      req.body.resetToken,
      next
    );
    if (result) {
      res.json(result);
    }
  }
  // ===================================================================>
  // googleLogin
  async googleLogin(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.login(req.body, next);
      if (result) {
        const { accessToken, refreshToken } = result.tokens;
        res.cookie("accessToken", accessToken, accessTokenOption);
        res.cookie("refreshToken", refreshToken, refreshTokenOption);
        res.cookie("role", "user", roleOptions);
        res.json({
          user: result.fetchUser,
          message: "User Logged successfully",
          success: true,
          role: "user",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // create profile
  async createProfile(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.createProfile(
        req.body,
        req.file,
        next
      );

      if (result) {
        const { accessToken, refreshToken } = result.token;
        res.cookie("accessToken", accessToken, accessTokenOption);
        res.cookie("refreshToken", refreshToken, refreshTokenOption);
        res.cookie("role", "user", roleOptions);
        res.status(200).json({
          user: result.user,
          message: "Profile created successfully",
          success: true,
          role: "user",
          accessToken: accessToken,
          refreshToken: refreshToken,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // getProfileImage
  async getProfileImage(req: Req, res: Res, next: Next) {
    try {
      const { userId } = req.query;
      console.log("userId ===>", userId);
      const result = await this.userUseCase.getProfileImage(userId, next);
      if(result){
        res.json(result)
      }
      console.log("this result is going",result)
    } catch (error) {}
  }
  // ===================================================================>
  // logout User
  async userLogout(req: Req, res: Res, next: Next) {
    try {
      res.clearCookie("accessToken", accessTokenOption);
      res.clearCookie("refreshToken", refreshTokenOption);
      res.clearCookie("role", roleOptions);
      res.status(200).json({ success: true, message: "successfully logouted" });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
}
