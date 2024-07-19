import { Iuser } from "../../../entities/user";

export interface IuserRepository {
  createUser(newUser: Iuser): Promise<Iuser | undefined>;
  findByEmail(email: string): Promise<Iuser | void>;
  findByEmailUpdateOne(email : string ,picture : string):Promise<Iuser | void>
  createProfile(user : Iuser,file : Express.Multer.File,s3upload : any) :Promise< Iuser| void> 
  getAllUsers(): Promise<string>;
  blockUser(id: string): Promise<any>;
  getUser(id: string): Promise<Iuser | undefined>;
}