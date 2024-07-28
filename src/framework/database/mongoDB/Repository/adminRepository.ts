import { Iuser } from "../../../../commonEntities/entities/user";
import { IadminRepository } from "../../../../usecases/interface/repositoryInterface/adminRepository";
import { findByEmail } from "./user";
import userModel from "../model/userModel";
import {blockUser, getUsers } from './admin/index'

export class AdminRepository implements IadminRepository {
  constructor(private userModels: typeof userModel) {}

  async adminLogin(email: string): Promise<Iuser | void> {
    return await findByEmail(this.userModels,email);
    
  }

  async getUsers(): Promise<Iuser[] | undefined > {
    return await getUsers(this.userModels)
  }

  async blockUser(id: string): Promise<any> {
    return await blockUser(id,this.userModels)
  }
}
