import { Iuser } from "../entities/user";
import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { IuserUseCase } from "../../usecases/interface/usecase/userUseCase";
import {
  accessTokenOption,
  refreshTokenOption,
  roleOptions,
} from "../../framework/webServer/middleware/jwt";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";

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

      const { accessToken, refreshToken } = result?.tokens as {
        accessToken: string;
        refreshToken: string;
      };
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
      if (result) {
        const { accessToken, refreshToken } = result?.tokens as {
          accessToken: string;
          refreshToken: string;
        };
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
  async getUsers(req: CustomRequest, res: Res, next: Next) {
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
  // chang password
  async changePassword(req: CustomRequest, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.changePassword(
        req.user?.id,
        req.body.currentPassword,
        req.body.newPassword,
        next
      );

      res.status(200).json(result);
    } catch (error) {}
  }

  // ===================================================================>
  // create profile
  async createProfile(req: Req, res: Res, next: Next) {
    try {
      console.log("file ====== req ===>",req.file)
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
  // verify requesting for proffesional account
  async verifyRequest(req: CustomRequest, res: Res, next: Next) {
    const userId = req.user?.id;
    const result = await this.userUseCase.verifyRequest(userId, req.body, next);
    if (result) {
      res.status(200).json(result);
    }
  }

  // ===================================================================>
  // upload Cover Image
  async uploadCoverimage(req: CustomRequest, res: Res, next: Next) {
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
  async getProfileImage(req: CustomRequest, res: Res, next: Next) {
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

  async changePrivacy(req: CustomRequest, res: Res, next: Next) {
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
  async showNotification(req: CustomRequest, res: Res, next: Next) {
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
        req.query?.userId as string,
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

  async getMyFollowings(req: CustomRequest, res: Res, next: Next) {
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
  async myFollowers(req: CustomRequest, res: Res, next: Next) {
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

  async removeFollower(req: CustomRequest, res: Res, next: Next) {
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
  async followback(req: CustomRequest, res: Res, next: Next) {
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
  async uploadPost(req: CustomRequest, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.uploadPost(
        req.user?.id,
        req.file,
        req.body.caption,
        req.body.type
      );

      if (result.success) {
        res.status(200).json(result);
      } else {
        res.status(400).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async uploadThoughts(req: CustomRequest, res: Res, next: Next) {
    try {
      console.log("body =>", req.body);

      const { thoughts } = req.body;
      const userId = req.user?.id;
      const result = await this.userUseCase.uploadThoughts(
        userId,
        thoughts,
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
  async fetchPosts(req: CustomRequest, res: Res, next: Next) {
    try {
      const pageParam = req.query?.pageParam ? Number(req.query.pageParam) : 1;
      const result = await this.userUseCase.fetchPosts(
        req.query?.skill as string,
        pageParam,
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
  // One post
  async postView(req: Req, res: Res, next: Next) {
    try {
      const { postId } = req.query;
      const result = await this.userUseCase.postView(postId as string, next);
      res.status(200).json(result);
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
  async postLike(req: CustomRequest, res: Res, next: Next) {
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
  // Comment post
  async addComment(req: CustomRequest, res: Res, next: Next) {
    try {
      const { postId, comment } = req.body;
      const result = await this.userUseCase.addComment(
        postId,
        req.user?.id,
        comment,
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
  // Deleteing comment
  async deleteComment(req: Req, res: Res, next: Next) {
    try {
      const { commentId, postId } = req.body;
      const result = await this.userUseCase.delteComment(
        postId,
        commentId,
        next
      );

      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  // Deleteing comment
  async editingComment(req: CustomRequest, res: Res, next: Next) {
    try {
      const { commentId, postId, updatedText } = req.body.data;

      const result = await this.userUseCase.editingComment(
        postId,
        commentId,
        req.user?.id,
        updatedText,
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
  async fetchMyPosts(req: CustomRequest, res: Res, next: Next) {
    try {
      const result = await this.userUseCase.fetchMyPosts(req.user?.id, next);

      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Fetch my posts
  async fetchOtherFollowers(req: CustomRequest, res: Res, next: Next) {
    try {
      const userId = req.query.userId;

      const result = await this.userUseCase.othersFollowers(
        userId as string,
        req.user?.id,
        next
      );

      if (result) {
        console.log("result ===> ", result);
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ===================================================================>
  // Fetch my posts
  async fetchOtherFollowings(req: CustomRequest, res: Res, next: Next) {
    try {
      const userId = req.query.userId;

      const result = await this.userUseCase.othersFollowings(
        userId as string,
        req.user?.id,
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
  async fetchOthersPosts(req: Req, res: Res, next: Next) {
    try {
      const { userId } = req.query;
      const result = await this.userUseCase.fetchOthersPosts(
        userId as string,
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
  // Search users with elastic searching
  async searchUsers(req: Req, res: Res, next: Next) {
    try {
      const query = req.query.query as string;
      const result = await this.userUseCase.searchUsers(query, next);

      console.log("Search result from backend:", result);
      return res.status(200).json(result);
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  // ===================================================================>
  // logout User
  async userLogout(req: Req, res: Res, next: Next) {
    try {
      res.clearCookie("accessToken", accessTokenOption);
      // res.clearCookie("refreshToken", refreshTokenOption);
      res.clearCookie("role", roleOptions);
      res.status(200).json({ success: true, message: "successfully logouted" });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async reportPost(req: CustomRequest, res: Res, next: Next) {
    try {
      const { postId, reason } = req.body as {
        postId: string;
        userId: string;
        reason: string;
      };
      console.log("body ==>", req.body);
      const userId = req.user?.id as string;
      const result = await this.userUseCase.reportPost(
        postId,
        reason,
        userId,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
}
