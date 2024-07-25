import { Iuser } from "../../../commonEntities/entities/user";

export interface IuserRepository {
  createUser(newUser: Iuser): Promise<Iuser | undefined>;
  findByEmail(email: string): Promise<Iuser | void>;
  findByIdUpdateUpdateOne(userId : string,password : string) : Promise<Iuser | void>;
  findByEmailUpdateOne(email : string ,toUpdateVal : string):Promise<Iuser | void>
  findOneUpdateResetToken(email : string,resetToken : string) : Promise<Iuser | void>
  resetPasswordVerify(password : string , token : string) : Promise<Iuser | void>
  createProfile(user : Iuser,file : Express.Multer.File,s3upload : any) :Promise< Iuser| void> 
  fetchProfileImage(s3upload : any,userId : string) : Promise< string | void>
  getAllUsers(): Promise<string>;
  blockUser(id: string): Promise<Iuser>;
  getUser(id: string): Promise<Iuser | undefined>;
}