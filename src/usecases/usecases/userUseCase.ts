import {
  userSignup,
  createUser,
  login,
  createProfile,
  resetPassword,
  forgotPassword,
  getProfileImage,
  changePassword,
  getUser,
  coverImageUpload,
  changePrivacy,
  changeShowNotification,
  getSkillRelatedUsers,
  getUserDetails,
  followUp,
  getMyFollowings,
  unFollow,
  myFollowers,
  removeFollower,
  followBack,
  uploadPostandRetriveUrl,
  getPosts,
  deletePost,
  editPost,
  postLike,
  fetchMyPosts,
  othersFollowers,
  othersFollowings,
  addComment,
  deleteComment,
  editingComment,
  fetchOthersPosts,
  searchUsers,
  postView,
  uploadThoughts,
  verifyRequest,
  reportPost,
} from "./user/index.js";
import { IuserUseCase } from "../interface/usecase/userUseCase.js";
import { IuserRepository } from "../interface/repositoryInterface/userRepository.js";
import { Ijwt, IToken } from "../interface/service/jwt.js";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository.js";
import { IotpGenerate } from "../interface/service/otpGenerate.js";
import { IhashPassword } from "../interface/service/hashPassword.js";
import {
  FetchProfileImageResponse,
  GetSkillRelatedUsersResponse,
  Iuser,
  IUserWithImages,
} from "../../commonEntities/entities/user.js";
import { IsendEmail } from "../interface/service/sendEmail.js";
import { Next } from "../../framework/types/serverPackageType.js";
import { resentOtp } from "./user/resentOtp.js";
import { ErrorHandler } from "../middlewares/errorMiddleware.js";
import { IS3Operations } from "../../framework/service/s3Bucket.js";
import { IElasticsearchService } from "../../framework/service/elasticsearchService.js";
import { NextFunction } from "express";
import { Ipost } from "../../commonEntities/entities/post.js";
import { Server } from "socket.io";
import { InotificationRepository } from "../interface/repositoryInterface/notificationRepository.js";
import { VerifyRequest } from "../../commonEntities/entities/verificationRequest.js";

// ================================= User use cases ================================= \\

export class UserUseCase implements IuserUseCase {
  constructor(
    private userRepostory: IuserRepository,
    private Jwt: Ijwt,
    private otpRepository: IotpRepository,
    private hashPassword: IhashPassword,
    private otpGenerate: IotpGenerate,
    private sendEmail: IsendEmail,
    private s3: IS3Operations,
    private elasticSearchService: IElasticsearchService,
    private io: Server,
    private notification: InotificationRepository
  ) {}

  // ===================================================================>
  async userSignup(
    user: Iuser,
    next: Next
  ): Promise<string | void | { success: boolean; message: string }> {
    try {
      let token = await userSignup(
        this.Jwt,
        this.otpRepository,
        this.userRepostory,
        this.otpGenerate,
        this.hashPassword,
        user,
        this.sendEmail,
        next
      );
      return token;
    } catch (error) {
      console.log(error);
    }
  }
  // ===================================================================>
  async createUser(
    email: string,
    otp: string,
    next: Next
  ): Promise<void | {
    success: boolean;
    user?: Iuser;
    tokens: { accessToken: string; refreshToken: string };
    message?: string;
  }> {
    const newuser = await createUser(
      email,
      otp,
      this.Jwt,
      this.otpRepository,
      this.userRepostory,
      this.hashPassword,
      next
    );
    return newuser;
  }
  // ===================================================================>
  async resendOtp(email: string, next: Next): Promise<void> {
    await resentOtp(
      this.otpGenerate,
      this.otpRepository,
      this.sendEmail,
      email,
      next
    );
  }
  // ===================================================================>
  async login(
    user: Iuser,
    next: Next
  ): Promise<{
    fetchUser?: Iuser | void;
    tokens: { accessToken: string; refreshToken: string };
  } | void> {
    const tokens = await login(
      this.userRepostory,
      this.Jwt,
      this.hashPassword,
      user.email,
      user.password,
      user.picture,
      next
    );
    return tokens;
  }
  // ===================================================================>
  async forgotPassword(
    email: string,
    next: Next
  ): Promise<void | {
    success: boolean;
    token: string;
    user: Iuser;
    message: string;
  }> {
    const result = await forgotPassword(
      this.Jwt,
      this.userRepostory,
      this.sendEmail,
      email,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "user reset password updated failed"));
    }
    return result;
  }
  // ===================================================================>
  async resetPassword(
    password: string,
    resetToken: string,
    next: Next
  ): Promise<{ success: boolean; user?: Iuser; message?: string } | void> {
    const result = await resetPassword(
      password,
      resetToken,
      this.userRepostory,
      this.hashPassword,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "User is founded"));
    }
    return result;
  }
  // ===================================================================>
  async getUser(userId: string, next: Next): Promise<Iuser | undefined | void> {
    const result = await getUser(userId, this.userRepostory, next);
    if (!result) {
      return next(new ErrorHandler(400, "User is founded"));
    }
    return result;
  }
  // ===================================================================>
  async changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string,
    next: Next
  ): Promise<{ success: boolean; message: string } | any> {
    const result = await changePassword(
      userId,
      currentPassword,
      newPassword,
      this.hashPassword,
      this.userRepostory,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "User is founded"));
    }
    return result;
  }

  // ===================================================================>
  // Use Case
  async createProfile(
    user: Iuser,
    file: Express.Multer.File,
    next: Next
  ): Promise<void | {
    success: boolean;
    user?: Iuser;
    message?: string;
  }> {
    try {
      console.log("File data in use case:", file);
      const result = await createProfile(
        user,
        file,
        this.userRepostory,
        this.s3,
        next
      );

      if (!result) {
        return next(new ErrorHandler(400, "Profile update failed"));
      }

      return result;
    } catch (error) {
      console.error("Error in createProfile use case:", error);
      return next(new ErrorHandler(500, "Internal Server Error"));
    }
  }

  //verify requesting
  async verifyRequest(
    userId: string,
    requestData: VerifyRequest,
    next: Next
  ): Promise<{ success: boolean } | void> {
    return await verifyRequest(userId, requestData, this.userRepostory, next);
  }

  // upload cover image
  async uploadCoverImage(
    userId: string,
    file: Express.Multer.File,
    next: Next
  ): Promise<Iuser | void> {
    const result = await coverImageUpload(
      userId,
      file,
      this.s3,
      this.userRepostory,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "User is founded"));
    }

    if (result) {
      console.log(" userCase ===>", result);
      return result;
    }
  }

  // ===================================================================>
  async getProfileImage(
    userId: string,
    next: Next
  ): Promise<{
    success: boolean;
    imageUrls: FetchProfileImageResponse | undefined;
    message?: string;
  } | void> {
    const result = await getProfileImage(
      userId,
      this.userRepostory,
      this.s3,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "User is founded"));
    }
    return result;
  }
  // ===================================================================>
  //change password
  async changePrivacy(
    userId: string,
    isPrivacy: boolean,
    next: Next
  ): Promise<any> {
    const result = await changePrivacy(
      userId,
      isPrivacy,
      this.userRepostory,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "Change privacy failed"));
    }
    return result;
  }
  // ===================================================================>
  //change password
  async showNotification(
    userId: string,
    isShowNotification: boolean,
    next: Next
  ): Promise<{ success: boolean; status: boolean } | any> {
    const result = await changeShowNotification(
      userId,
      isShowNotification,
      this.userRepostory,
      next
    );
    console.log("resss=>", result);
    return result;
  }
  // ===================================================================>
  async getSkillRelatedUsers(
    userId: string,
    skill: string,
    next: Next
  ): Promise<{
    success: boolean;
    userDetails: IUserWithImages[] | undefined;
  } | void> {
    return await getSkillRelatedUsers(
      userId,
      skill,
      this.userRepostory,
      this.s3,
      next
    );
  }
  // ===================================================================>
  async getUserDetails(
    userId: string,
    next: Next
  ): Promise<{ success: boolean; user: Iuser } | void> {
    const result = await getUserDetails(
      userId,
      this.s3,
      this.userRepostory,
      next
    );
    if (!result) {
      return next(new ErrorHandler(400, "fetch user failed"));
    }
    return {
      success: true,
      user: result,
    };
  }
  // ===================================================================>
  async userFollowUp(
    toFollowingId: string,
    fromFollowerId: string,
    next: Next
  ): Promise<void> {
    await followUp(toFollowingId, fromFollowerId, this.userRepostory, next);
  }
  // ===================================================================>
  async getMyFollowings(userId: string, next: Next): Promise<IUserWithImages[] | void> {
    return await getMyFollowings(userId, this.userRepostory, this.s3, next);
  }
  // ===================================================================>
  async myFollowers(userId: string, next: Next): Promise<Iuser[]> {
    return await myFollowers(userId, this.s3, this.userRepostory, next);
  }

  // ===================================================================>
  async unFollow(
    toUnfollowId: string,
    fromFollowerId: string,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    return await unFollow(
      toUnfollowId,
      fromFollowerId,
      this.userRepostory,
      this.notification,
      next
    );
  }
  // ===================================================================>
  async removeFollower(
    fromRemoverId: string,
    toRemoveId: string,
    next: NextFunction
  ): Promise<{ success: boolean; message: string }> {
    return await removeFollower(
      fromRemoverId,
      toRemoveId,
      this.userRepostory,
      next
    );
  }

  async followBack(
    toFollowId: string,
    fromFollowingId: string,
    next: Next
  ): Promise<{ success: boolean; message: string }> {
    return await followBack(
      toFollowId,
      fromFollowingId,
      this.userRepostory,
      next
    );
  }

  async othersFollowers(
    userId: string,
    currentUserId: string,
    next: Next
  ): Promise<any> {
    return await othersFollowers(
      userId,
      currentUserId,
      this.userRepostory,
      this.s3,
      next
    );
  }

  async othersFollowings(
    userId: string,
    currentUserId: string,
    next: Next
  ): Promise<any> {
    return await othersFollowings(
      userId,
      currentUserId,
      this.userRepostory,
      this.s3,
      next
    );
  }

  async uploadPost(
    userId: string,
    imageUrl: Express.Multer.File,
    caption: string,
    type: string
  ): Promise<any> {
    return await uploadPostandRetriveUrl(
      userId,
      imageUrl,
      caption,
      type,
      this.s3,
      this.userRepostory
    );
  }

  async uploadThoughts(
    userId: string,
    thoughts: string,
    next: Next
  ): Promise<{ success: boolean; thoughtPost: Ipost } | void> {
    return await uploadThoughts(userId, thoughts, this.userRepostory, next);
  }

  async fetchPosts(userSkill: string,pageParam : number, next: Next): Promise<any> {
    return await getPosts(userSkill,pageParam, this.s3, this.userRepostory, next);
  }

  async fetchMyPosts(userId: string, next: Next): Promise<any> {
    return await fetchMyPosts(userId, this.userRepostory, this.s3, next);
  }

  async postView(postId: string, next: Next): Promise<any> {
    return await postView(postId, this.userRepostory, this.s3, next);
  }

  async fetchOthersPosts(userId: string, next: Next): Promise<any> {
    return await fetchOthersPosts(userId, this.userRepostory, this.s3, next);
  }

  async deletePost(postId: string, next: Next): Promise<any> {
    return await deletePost(postId, this.userRepostory, next);
  }

  async editPost(
    editedCaption: string,
    postId: string,
    next: Next
  ): Promise<{ success: boolean; message: string }> {
    return await editPost(editedCaption, postId, this.userRepostory, next);
  }

  async postLike(userId: string, postId: string, next: Next): Promise<any> {
    return await postLike(
      userId,
      postId,
      this.userRepostory,
      this.notification,
      next
    );
  }

  async addComment(
    postId: string,
    userId: string,
    comment: string,
    next: Next
  ): Promise<any> {
    return await addComment(
      postId,
      userId,
      comment,
      this.userRepostory,
      this.s3,
      this.io,
      next
    );
  }

  async delteComment(
    postId: string,
    commentId: string,
    next: Next
  ): Promise<any> {
    return await deleteComment(postId, commentId, this.userRepostory, next);
  }

  async editingComment(
    postId: string,
    commentId: string,
    userId: string,
    updateComment: string,
    next: Next
  ): Promise<any> {
    return await editingComment(
      postId,
      commentId,
      userId,
      updateComment,
      this.userRepostory,
      next
    );
  }

  async searchUsers(
    query: string,
    next: Next
  ): Promise<{ success: boolean; message?: string; result: Iuser[] } | void> {
    return await searchUsers(query, this.elasticSearchService, this.s3, next);
  }

  async reportPost(
    postId: string,
    reason: string,
    userId: string,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
    return await reportPost(postId, reason, userId, this.userRepostory, next);
  }
}
