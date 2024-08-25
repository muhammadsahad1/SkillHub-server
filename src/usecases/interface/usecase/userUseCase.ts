import { Ipost } from "../../../commonEntities/entities/post";
import {
  GetSkillRelatedUsersResponse,
  Iuser,
  IUserWithImages,
} from "../../../commonEntities/entities/user";
import { VerifyRequest } from "../../../commonEntities/entities/verificationRequest";
import { Next, Req, Res } from "../../../framework/types/serverPackageType";

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
  verifyRequest(userId : string ,requestData : VerifyRequest,next : Next):Promise<{success : boolean } | void>
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
    newPassword: string,
    next : Next,
  ): Promise<{ success: boolean; message: string } | any>;
  // ===================================================================>
  changePrivacy(
    userId: string,
    isPrivacy: boolean,
    next: Next
  ): Promise<any>;
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
  ): Promise<{ success: boolean; user: Iuser } | void>;

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
  // ===================================================================>
  removeFollower(
    fromRemoveId: string,
    toRemoveId: string,
    next: Next
  ): Promise<{ success: boolean; message: string }>;
// ===================================================================>

uploadPost(userId : string,imageUrl : Express.Multer.File  |undefined, caption : string,type : string) : Promise<any>

// ===================================================================>

uploadThoughts(userId : string,type : string,next : Next): Promise<{ success: boolean; thoughtPost   : Ipost } | void>

// ===================================================================>
followBack(toFollowId : string,fromFollowingId : string,next : Next) :Promise<{ success: boolean; message: string }>
// ===================================================================>

othersFollowers(userId : string,currentUserId : string,next : Next) :Promise<Iuser[]>
// ===================================================================>

othersFollowings(userId : string,currentUserId : string,next : Next) :Promise<Iuser[]>
// ===================================================================>
fetchOthersPosts(userId :string,  next : Next) :Promise<any>

fetchPosts(userSkill : string , next : Next) : Promise<any>
// ===================================================================>

fetchMyPosts(userId : string , next : Next) : Promise<any>
// ===================================================================>

deletePost(postId :string,next : Next): Promise<any>
// ===================================================================>

editPost(editedCaption : string,postId : string,next : Next) : Promise<{ success: boolean; message: string }>

postLike(userId : string,postId : string,next :Next) : Promise<{message : string , postId : string}>

addComment(postId : string,userId : string,comment : string,next :Next ):Promise<any>

delteComment(postId : string,commentId : string,next :Next ):Promise<any>

editingComment(postId : string,commentId : string,userId : string,updateComment : string,next : Next) :Promise<any>

  postView(postId : string,next : Next) :Promise<any>

// ===================================================================>
searchUsers(query : string,next : Next): Promise<Iuser[]>
// ===================================================================>

resendOtp(email: string, next: Next): Promise<void>;

getUser(id: string, next: Next): Promise<Iuser | undefined | void>;

}
