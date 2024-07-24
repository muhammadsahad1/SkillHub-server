import userModel from "../model/userModel";
import { Iuser } from "../../../../entities/user";
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
} from "./user/index";
import { IS3Operations } from "../../../service/s3Bucket";

//Passing the user properties to DB intraction function with userModel/schema
export class UserRepository implements IuserRepository {
  constructor(private userModels: typeof userModel) {}

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
  async createUser(newUser: Iuser): Promise<Iuser | undefined> {
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
  ): Promise<string | void> {
    return await fetchProfileImage(this.userModels, S3Operations, userId);
  }
  // ===================================================================>
  async findByIdUpdateUpdateOne(
    userId: string,
    password: string
  ): Promise<Iuser | void> {
    return await changePassword(this.userModels,userId,password)
  }
  // ===================================================================>
  async getUser(userId: string): Promise<Iuser | undefined >{
    return await getUser(this.userModels, userId);
  }
  // ===================================================================>
  getAllUsers(): Promise<string> {
    throw new Error("Method not implemented.");
  }
  // ===================================================================>
  blockUser(id: string): Promise<any> {
    throw new Error("Method not implemented.");
  }
  // ===================================================================>
}
