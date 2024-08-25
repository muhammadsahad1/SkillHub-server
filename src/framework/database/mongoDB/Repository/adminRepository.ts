import { Iuser } from "../../../../commonEntities/entities/user";
import { IadminRepository } from "../../../../usecases/interface/repositoryInterface/adminRepository";
import { findByEmail } from "./user";
import userModel from "../model/userModel";
import { blockUser, changeVerifyStatus, getUsers, getVerificationRequests } from "./admin/index";
import { IVerificationRequest } from "../../../../commonEntities/entities/verificationRequest";
import { VerificationRequestModal } from "../model/VerificationRequest";

export class AdminRepository implements IadminRepository {
  constructor(
    private userModels: typeof userModel,
    private verificationRequestsModel: typeof VerificationRequestModal
  ) {}

  async adminLogin(email: string): Promise<Iuser | void> {
    return await findByEmail(this.userModels, email);
  }

  async getUsers(): Promise<Iuser[] | undefined> {
    return await getUsers(this.userModels);
  }

  async getVerificationRequests(): Promise<IVerificationRequest[] | undefined> {
    return await getVerificationRequests(this.verificationRequestsModel);
  }

  async changeVerifyStatus(requesId: string, status: "Pending" | "Approved" | "Rejected"): Promise<{ success: boolean; } | undefined> {
      return await changeVerifyStatus(requesId , status ,this.userModels, this.verificationRequestsModel)
  }

  async blockUser(id: string): Promise<any> {
    return await blockUser(id, this.userModels);
  }
}
