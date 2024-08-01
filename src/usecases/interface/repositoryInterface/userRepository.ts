import { FetchProfileImageResponse, Iuser, IUserWithImages } from "../../../commonEntities/entities/user";
import { IS3Operations } from "../../../framework/service/s3Bucket";

export interface IuserRepository {
  createUser(newUser: Iuser): Promise<Iuser |
  void
 | {
     success: boolean;
     user?: Iuser;
     token: { accessToken: string; refershToken: string };
     message?: string;
   }
>;
  findByEmail(email: string): Promise<Iuser | void>;
  findByIdUpdateUpdateOne(userId : string,password : string) : Promise<Iuser | void>;
  findByEmailUpdateOne(email : string ,toUpdateVal : string):Promise<Iuser | void>
  findOneUpdateResetToken(email : string,resetToken : string) : Promise<Iuser | void>
  resetPasswordVerify(password : string , token : string) : Promise<Iuser | void>
  createProfile(user : Iuser,file : Express.Multer.File,S3Operations : any) :Promise< Iuser| void> 
  fetchProfileImage(s3upload : any,userId : string) :Promise<FetchProfileImageResponse> 
  uploadeCoverImage(userId : string,file : Express.Multer.File,s3 : any):Promise<Iuser | void>
  changeShowNotification(userId : string , isShowNotification : boolean) :Promise<{ status : boolean}>
  getSkillRelatedUserss(userId : string ,skill : string , s3Bucket: IS3Operations) :Promise<IUserWithImages[]>
  getUserDetails(userId : string) : Promise<Iuser>
  getMyFollowing(userId : string,S3Operations : IS3Operations) : Promise<any>
  getAllUsers(): Promise<string>;
  followUp(toFollowingId : string , fromFollowerId : string):Promise<void>
  blockUser(id: string): Promise<Iuser>;
  getUser(id: string): Promise<Iuser | undefined>;
  // changePrivacy(userId : string,isPrivacy : boolean) : Promise< { status : boolean }| undefined>
}