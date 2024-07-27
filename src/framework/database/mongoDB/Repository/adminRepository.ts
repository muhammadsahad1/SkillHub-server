import { Iuser } from "../../../../commonEntities/entities/user";
import { IadminRepository } from "../../../../usecases/interface/repositoryInterface/adminRepository";
import { findByEmail } from "./user";
import userModel from "../model/userModel";

export class AdminRepository implements IadminRepository {
  constructor(private userModels: typeof userModel) {}

  async adminLogin(email: string): Promise<Iuser | void> {
    return await findByEmail(this.userModels,email);
    
  }
}
