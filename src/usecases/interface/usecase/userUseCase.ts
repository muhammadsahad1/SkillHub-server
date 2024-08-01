import {
  GetSkillRelatedUsersResponse,
  Iuser,
  IUserWithImages,
} from "../../../commonEntities/entities/user";
import { IToken } from "../service/jwt";
import { Next, Req, Res } from "../../../framework/types/serverPackageType";
import { IprivacySettings } from "../../../commonEntities/entities/user";

// each functions Interface (TYPSCRIPT)
export interface IuserUseCase {
  userSignup(
    user: Iuser,
    next: Next
  ): Promise<string | void | { success: boolean; message: string }>;
  // ===================================================================>
  login(
    user: Iuser,
    next: Next
  ): Promise<{
    fetchUser?: Iuser | void;
    token: { accessToken: string; refreshToken: string };
  } | void>;
  // ===================================================================>
  createUser(
    email: string,
    otp: string,
    next: Next
  ): Promise<{
    success: boolean;
    user?: Iuser;
    tokens: { accessToken: string; refreshToken: string };
    message?: string;
  } | void>;
  // ===================================================================>
  createProfile(
    user: Iuser,
    file: Express.Multer.File | undefined,
    next: Next
  ): Promise<void | {
    success: boolean;
    user?: Iuser;
    message?: string;
  }>;
  // ===================================================================>
  getProfileImage(
    userId: string,
    next: Next
  ): Promise<{
    success: boolean;
    imageUrls: { profileUrl: string; coverImageUrl: string };
    coverImage: string | void;
    message?: string;
  } | void>;
  // ===================================================================>
  uploadCoverImage(
    userId: string,
    file: Express.Multer.File | undefined,
    next: Next
  ): Promise<Iuser | void>;
  // ===================================================================>
  forgotPassword(
    email: string,
    next: Next
  ): Promise<
    | void
    | Iuser
    | { success: boolean; token: string; user: Iuser; message: string }
  >;
  // ===================================================================>
  resetPassword(
    password: string,
    resetToken: string,
    next: Next
  ): Promise<{ success: boolean; user?: Iuser; message?: string } | void>;
  // ===================================================================>
  changePassword(
    userId: string,
    currentPassword: string,
    newPassword: string
  ): Promise<{ success: boolean; message: string }>;
  // ===================================================================>
  changePrivacy(
    userId: string,
    isPrivacy: boolean,
    next: Next
  ): Promise<{ updatedPrivacySettings: IprivacySettings; status: boolean }>;
  // ===================================================================>
  showNotification(
    userId: string,
    isShowNotification: boolean,
    next: Next
  ): Promise<{ success: boolean; status: boolean }>;
  // ===================================================================>
  getSkillRelatedUsers(
    userId: string,
    skill: string,
    next: Next
  ): Promise<IUserWithImages>;

  // ===================================================================>
  getUserDetails(
    userId: string,
    next: Next
  ): Promise<{ success: boolean; user: Iuser }>;

  // ===================================================================>
  userFollowUp(
    toFollowingId: string,
    followerId: string,
    next: Next
  ): Promise<void>;

  // ===================================================================>
  getMyFollowings(userId: string, next: Next): Promise<Iuser[]>;

  // ===================================================================>
  myFollowers(userId: string, next: Next): Promise<Iuser[]>;

  // ===================================================================>
  unFollow(
    toUnfollowId: string,
    fromFollowerId: string,
    next: Next
  ): Promise<{ success: boolean; message: string } | void>;

  resendOtp(email: string, next: Next): Promise<void>;

  getUser(id: string, next: Next): Promise<Iuser | undefined | void>;
}
