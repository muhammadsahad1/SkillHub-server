import { Iuser } from "../entities/user";
import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { IuserUseCase } from "../../usecases/interface/usecase/userUseCase";
import {
  accessTokenOption,
  refreshTokenOption,
  roleOptions,
} from "../../framework/webServer/middleware/jwt";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";

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
      const result = await this.userUseCase.createUser(
        req.body.email,
        req.body.verifyCode,
        next
      );

      const { accessToken, refreshToken } = result?.tokens;
      res.cookie("accessToken", accessToken, accessTokenOption);
      res.cookie("refreshToken", refreshToken, refreshTokenOption);
      res.cookie("role", "user", roleOptions);
      res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // resentOtp
  async resentOtp(req: Req, res: Res, next: Next) {
    try {
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
      console.log("result Token ==>", result);
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
    try {
      const result = await this.userUseCase.resetPassword(
        req.body.password,
        req.body.resetToken,
        next
      );

      if (result) {
        res.json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  // ===================================================================>
  // Get skill Related Users
  async getSkillRelatedUsers(req: Req, res: Res, next: Next) {
    try {
      const skill = req.query.skill as string;
      const result = await this.userUseCase.getSkillRelatedUsers(
        req.user?.id,
        skill,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
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
  async changePassword(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.changePassword(
        req.user?.id,
        req.body.currentPassword,
        req.body.newPassword
      );

      res.status(200).json(result);
    } catch (error) {}
  }

  // ===================================================================>
  // create profile
  async createProfile(req: Req, res: Res, next: Next) {
    try {
      console.log("Request body:", req.body);
      console.log("Request file:", req.file);

      const result = await this.userUseCase.createProfile(
        req.body,
        req.file,
        next
      );

      if (result) {
        res.status(200).json({
          user: result.user,
          message: "Profile created successfully",
          success: true,
          role: "user",
        });
      } else {
        return next(new ErrorHandler(400, "Profile creation failed"));
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  // ===================================================================>
  // upload Cover Image
  async uploadCoverimage(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.uploadCoverImage(
        req.user?.id,
        req.file,
        next
      );
      if (!result) {
        console.log("rsult is not come");
      }
      console.log("sfkjdfjsdkljsdljs");
      console.log("result from userUserCase =>", result);

      res.status(200).json({
        success: true,
        message: "Cover image uploaded successfully",
        user: result,
      });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  // ===================================================================>
  // getProfileImage
  async getProfileImage(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.getProfileImage(req.user?.id, next);
      if (result) {
        res.json(result);
      }
      console.log("this result is going", result);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  async changePrivacy(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.changePrivacy(
        req.user?.id,
        req.body.isPrivacy,
        next
      );

      if (result) {
        res.status(201).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // change notification settings
  async showNotification(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.showNotification(
        req.user?.id,
        req.body.isShowNotification,
        next
      );
      if (result) {
        res.status(201).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  async getUserDetails(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.getUserDetails(
        req.query?.userId,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async userFollowUp(req: Req, res: Res, next: Next) {
    try {
      await this.userUseCase.userFollowUp(
        req.body.toFollowingId,
        req.body.fromFollowerId,
        next
      );
      res.status(200).json({ success: "successfully update the following" });
    } catch (error) {
      res
        .status(500)
        .json({ success: false, message: "Failed to follow user" });
    }
  }

  async getMyFollowings(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.getMyFollowings(req.user?.id, next);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  //myFollowers
  async myFollowers(req: Req, res: Res, next: Next) {
    try {
      const userId = req.user?.id;
      const result = await this.userUseCase.myFollowers(userId, next);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // Unfollow
  async unFollow(req: Req, res: Res, next: Next) {
    try {
      const { toUnFollowId, fromFollowerId } = req.body;
      const result = await this.userUseCase.unFollow(
        toUnFollowId,
        fromFollowerId,
        next
      );
      console.log("result of unfollow user =>", result);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async removeFollower(req: Req, res: Res, next: Next) {
    try {
      const { toRemoveId } = req.body;
      const result = await this.userUseCase.removeFollower(
        req.user?.id,
        toRemoveId,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // followBack
  async followback(req: Req, res: Res, next: Next) {
    try {
      const { toFollowId } = req.body;
      const result = await this.userUseCase.followBack(
        req.user?.id,
        toFollowId,
        next
      );

      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Uploading post
  async uploadPost(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.uploadPost(
        req.user?.id,
        req.file,
        req.body.caption,
        req.body.type,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // fetching the posts
  async fetchPosts(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.fetchPosts(
        req.query?.skill as string,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Delete post
  async deletePost(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.deletePost(
        req.query?.postId as string,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Post edit
  async editPost(req: Req, res: Res, next: Next) {
    try {
      const { id, caption } = req.body;
      const result = await this.userUseCase.editPost(
        caption as string,
        id as string,
        next
      );

      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Post like
  async postLike(req: Req, res: Res, next: Next) {
    try {
      const { postId } = req.body;

      const result = await this.userUseCase.postLike(
        req.user?.id,
        postId,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Fetch my posts
  async fetchMyPosts(req: Req, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.fetchMyPosts(req.user?.id,next);
      
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
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
