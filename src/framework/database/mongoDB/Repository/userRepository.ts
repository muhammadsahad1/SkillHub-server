import userModel from "../model/userModel";
import {
  FetchProfileImageResponse,
  Iuser,
  IUserWithImages,
} from "../../../../commonEntities/entities/user";
import { IuserRepository } from "../../../../usecases/interface/repositoryInterface/userRepository";
import {
  createUser,
  findByEmail,
  createProfile,
  findByEmailUpdatePicture,
  resetPasswordVerify,
  getUser,
  changePassword,
  findUpdateResetToken,
  fetchProfileImage,
  uploadCoverImage,
  showNotification,
  getSkillRelatedUsers,
  getUsersImageUrls,
  getUserDetails,
  followUp,
  getMyFollowing,
  unFollow,
  myFollowers,
  removeFollower,
  followBack,
  postLike,
  getOthersFollowers,
  getOthersFollowersImageUrls,
  getOthersFollowings,
  getOthersFollowingsImageUrl,
  changePrivacy,
  verifyRequest,
} from "./user/index";
import {
  uploadPost,
  fetchPosts,
  deletePost,
  editPost,
  fetchMyPosts,
  addComment,
  getCommentedUserImage,
  deleteComment,
  editComment,
  fetchOthersPosts,
  postView,
  uploadThoughts,
  reportPost,
} from "./post/index";
import { IS3Operations } from "../../../service/s3Bucket";
import PostModel from "../model/postModel";
import { Next } from "../../../types/serverPackageType";
import { IComment, Ipost } from "../../../../commonEntities/entities/post";
import { VerificationRequestModal } from "../model/VerificationRequest";
import { VerifyRequest } from "../../../../commonEntities/entities/verificationRequest";
import ReportModel from "../model/reportRequest";

//Passing the user properties to DB intraction function with userModel/schema
export class UserRepository implements IuserRepository {
  constructor(
    private userModels: typeof userModel,
    private postModels: typeof PostModel,
    private verificationRequestModal: typeof VerificationRequestModal,
    private requestModel: typeof ReportModel
  ) {}

  // ===================================================================>
  async createProfile(
    userProfile: Iuser,
    file: Express.Multer.File,
    S3Operations: IS3Operations
  ): Promise<Iuser | void> {
    return await createProfile(
      userProfile,
      file,
      S3Operations,
      this.userModels
    );
  }
  // ===================================================================>
  async verifyRequest(
    userId: string,
    requestData: VerifyRequest
  ): Promise<{ success: boolean } | undefined> {
    return await verifyRequest(
      userId,
      requestData,
      this.verificationRequestModal,
      this.userModels
    );
  }
  // ===================================================================>
  async createUser(newUser: Iuser): Promise<
    | Iuser
    | void
    | {
        success: boolean;
        user?: Iuser;
        token: { accessToken: string; refreshToken: string };
        message?: string;
      }
  > {
    return await createUser(newUser, this.userModels);
  }
  // ===================================================================>
  async findByEmail(email: string): Promise<Iuser | void> {
    return await findByEmail(this.userModels, email);
  }
  // ===================================================================>
  async findByEmailUpdateOne(
    email: string,
    picture: string
  ): Promise<Iuser | void> {
    return await findByEmailUpdatePicture(this.userModels, email, picture);
  }
  // ===================================================================>
  async findOneUpdateResetToken(
    email: string,
    resetToken: string
  ): Promise<Iuser | void> {
    const resInfisrt = await findUpdateResetToken(
      this.userModels,
      email,
      resetToken
    );
    return resInfisrt;
  }
  // ===================================================================>
  async getSkillRelatedUsers(
    userId: string,
    skill: string,
    s3Bucket: IS3Operations
  ): Promise<IUserWithImages[] | undefined> {
    const users = await getSkillRelatedUsers(userId, skill, this.userModels);
    if (!users || users.length === 0) {
      return [];
    }
    const res = await getUsersImageUrls(users, [], s3Bucket);
    return res;
  }
  // ===================================================================>
  async getUserDetails(userId: string): Promise<Iuser> {
    return await getUserDetails(userId, this.userModels);
  }
  // ===================================================================>
  async resetPasswordVerify(
    password: string,
    token: string
  ): Promise<Iuser | null | void> {
    return await resetPasswordVerify(this.userModels, password, token);
  }
  // ===================================================================>
  async fetchProfileImage(
    S3Operations: IS3Operations,
    userId: string
  ): Promise<FetchProfileImageResponse | undefined> {
    return await fetchProfileImage(this.userModels, S3Operations, userId);
  }
  // cover image upload
  async uploadeCoverImage(
    userId: string,
    file: Express.Multer.File,
    S3Operations: IS3Operations
  ): Promise<Iuser | void> {
    return await uploadCoverImage(this.userModels, userId, file, S3Operations);
  }
  // ===================================================================>
  async findByIdUpdateUpdateOne(
    userId: string,
    password: string
  ): Promise<Iuser | null | void> {
    return await changePassword(this.userModels, userId, password);
  }
  // ===================================================================>
  async changeShowNotification(
    userId: string,
    isShowNotification: boolean
  ): Promise<{ status: boolean }> {
    return await showNotification(userId, isShowNotification, this.userModels);
  }
  // ===================================================================>
  async followUp(toFollowingId: string, fromFollowerId: string): Promise<void> {
    await followUp(toFollowingId, fromFollowerId, this.userModels);
  }
  // ===================================================================>
  async getUser(userId: string): Promise<Iuser | undefined> {
    return await getUser(this.userModels, userId);
  }

  async getMyFollowing(
    userId: string,
    S3Operations: IS3Operations
  ): Promise<IUserWithImages[] | undefined> {
    const followingUsers = await getMyFollowing(
      userId,
      this.userModels,
      S3Operations
    );
    if (!followingUsers || followingUsers.length === 0) {
      return [];
    }
    const followingUsersWithImage = await getUsersImageUrls(
      followingUsers,
      [],
      S3Operations
    );
    return followingUsersWithImage;
  }

  // ===================================================================>
  async unFollow(toUnFollowId: string, fromFollowerId: string): Promise<void> {
    return await unFollow(toUnFollowId, fromFollowerId, this.userModels);
  }

  async myFollowers(userId: string, S3Operations: IS3Operations): Promise<any> {
    const result = await myFollowers(userId, this.userModels);

    if (!result) {
      return [];
    }

    const { followersUsers, following } = result;

    if (!followersUsers || followersUsers?.length === 0) {
      return [];
    }

    const followersUsersWithImage = await getUsersImageUrls(
      followersUsers,
      following,
      S3Operations
    );
    return followersUsersWithImage;
  }
  // ===================================================================>
  async removeFollower(
    fromRemoverId: string,
    toRemoveId: string
  ): Promise<void> {
    return await removeFollower(fromRemoverId, toRemoveId, this.userModels);
  }
  // ===================================================================>

  async followBack(fromFollowingId: string, toFollowId: string): Promise<void> {
    return await followBack(fromFollowingId, toFollowId, this.userModels);
  }
  // ===================================================================>
  async othersFollowers(
    userId: string,
    currentUserId: string,
    S3Operations: IS3Operations
  ): Promise<any> {
    const followers = await getOthersFollowers(userId, this.userModels);
    if (!followers || followers?.length === 0) {
      return [];
    }

    return await getOthersFollowersImageUrls(
      followers,
      currentUserId,
      this.userModels,
      S3Operations
    );
  }

  async othersFollowings(
    userId: string,
    currentUserId: string,
    s3: IS3Operations
  ): Promise<any> {
    const followings = await getOthersFollowings(userId, this.userModels);

    if (!followings || followings?.length === 0) {
      return [];
    }
    return await getOthersFollowingsImageUrl(
      followings,
      currentUserId,
      this.userModels,
      s3
    );
  }

  async uploadPostRetriveImageUrl(
    userId: string,
    file: Express.Multer.File,
    caption: string,
    type: string,
    s3: IS3Operations
  ): Promise<any> {
    return await uploadPost(
      userId,
      file,
      caption,
      type,
      s3,
      this.userModels,
      this.postModels
    );
  }
  // ===================================================================>

  async uploadThoughts(
    userId: string,
    thoughts: string
  ): Promise<{ success: boolean; thoughtPost: Ipost } | void> {
    return await uploadThoughts(userId, thoughts, this.postModels);
  }

  // ===================================================================>

  async fetchPosts(
    userSkill: string,
    pageParam: number,
    s3: IS3Operations
  ): Promise<any> {
    return await fetchPosts(
      userSkill,
      pageParam,
      s3,
      this.userModels,
      this.postModels
    );
  }

  // ===================================================================>
  async deletePost(postId: string): Promise<void> {
    return await deletePost(postId, this.postModels);
  }

  async editPost(
    caption: string,
    postId: string
  ): Promise<{ postId: string | undefined; caption: string | undefined }> {
    return await editPost(caption, postId, this.postModels);
  }

  async postLike(
    userId: string,
    postId: string
  ): Promise<{
    message: string;
    postId: string | undefined;
    postUserId: string | undefined;
  }> {
    return await postLike(userId, postId, this.postModels);
  }

  async addComment(
    postId: string,
    userId: string,
    comment: string,
    s3: IS3Operations,
    next: Next
  ): Promise<any> {
    const newComment = await addComment(
      postId,
      userId,
      comment,
      this.postModels,
      this.userModels
    );
    if (!newComment) {
      return [];
    }

    const newFirstComment = newComment?.comments[0];
    const userIdToFetch = newFirstComment.userId.toString();
    const postOwnerId = newComment?.postOwnerId;
    return await getCommentedUserImage(
      postOwnerId,
      userIdToFetch,
      s3,
      this.userModels,
      next
    );
  }

  async fetchMyPosts(userId: string, s3: IS3Operations): Promise<any> {
    return await fetchMyPosts(userId, s3, this.postModels);
  }

  async fetchOthersPosts(userId: string, s3: IS3Operations): Promise<any> {
    return await fetchOthersPosts(userId, s3, this.postModels, this.userModels);
  }

  async postView(postId: string): Promise<any> {
    return await postView(postId, this.postModels);
  }

  async editComment(
    postId: string,
    commentId: string,
    userId: string,
    updatedComment: string
  ): Promise<IComment | void> {
    return await editComment(
      postId,
      commentId,
      userId,
      updatedComment,
      this.postModels
    );
  }

  async deleteComment(postId: string, commentId: string): Promise<any> {
    return await deleteComment(postId, commentId, this.postModels);
  }

  async changePrivacy(userId: string, isPrivacy: boolean): Promise<any> {
    return await changePrivacy(userId, isPrivacy, this.userModels);
  }

  async reportPost(
    postId: string,
    reason: string,
    userId: string
  ): Promise<{ success: boolean; message: string } | void> {
    return await reportPost(
      postId,
      reason,
      userId,
      this.postModels,
      this.requestModel
    );
  }

  getAllUsers(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  // ===================================================================>
  blockUser(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  // ===================================================================>
}
