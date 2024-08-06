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
} from "./user/index";
import {
  uploadPost,
  fetchPosts,
  deletePost,
  editPost,
  fetchMyPosts,
} from "./post/index";
import { IS3Operations } from "../../../service/s3Bucket";
import PostModel from "../model/postModel";
import { Ipost } from "../../../../commonEntities/entities/post";

//Passing the user properties to DB intraction function with userModel/schema
export class UserRepository implements IuserRepository {
  constructor(
    private userModels: typeof userModel,
    private postModels: typeof PostModel
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
  async createUser(newUser: Iuser): Promise<
    | Iuser
    | void
    | {
        success: boolean;
        user?: Iuser;
        token: { accessToken: string; refershToken: string };
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
  async getSkillRelatedUserss(
    userId: string,
    skill: string,
    s3Bucket: IS3Operations
  ): Promise<IUserWithImages[]> {
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
  ): Promise<Iuser | void> {
    return await resetPasswordVerify(this.userModels, password, token);
  }
  // ===================================================================>
  async fetchProfileImage(
    S3Operations: IS3Operations,
    userId: string
  ): Promise<FetchProfileImageResponse> {
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
  ): Promise<Iuser | void> {
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
  ): Promise<any> {
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
    const { followersUsers, following } = await myFollowers(
      userId,
      this.userModels
    );

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

  async fetchPosts(userSkill: string, s3: IS3Operations): Promise<any> {
    return await fetchPosts(userSkill, s3, this.userModels, this.postModels);
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
  ): Promise<{ message: string; postId: string }> {
    return await postLike(userId, postId, this.postModels);
  }

  async fetchMyPosts(userId: string, s3: IS3Operations): Promise<any> {
    return await fetchMyPosts(userId, s3, this.postModels);
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
