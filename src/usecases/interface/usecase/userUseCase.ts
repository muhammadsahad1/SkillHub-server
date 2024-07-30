import { GetSkillRelatedUsersResponse, Iuser, IUserWithImages } from "../../../commonEntities/entities/user";
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
  ): Promise<void | { fetchUser: Iuser; tokens: IToken }>;
  // ===================================================================>
  createUser(
    email: string,
    otp: string,
    next: Next
  ): Promise<
    void | Iuser | { success: boolean; user?: Iuser; message?: string }
  >;
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
  getSkillRelatedUsers(skill : string , next : Next):Promise<IUserWithImages>

  // ===================================================================>
  resendOtp(email: string, next: Next): Promise<void>;

  getUser(id: string, next: Next): Promise<Iuser | undefined | void>;
}
