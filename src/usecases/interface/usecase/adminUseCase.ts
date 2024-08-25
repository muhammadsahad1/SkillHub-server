import { IToken } from "../service/jwt";
import { Next } from "../../../framework/types/serverPackageType";
import { IVerificationRequest } from "../../../commonEntities/entities/verificationRequest";

// ================================> AdminUseCase Interface
export interface IadminUseCase {
  adminLogin(email: string, password: string, next: Next): Promise<any>;
  getVerificationRequests(next : Next) : Promise<IVerificationRequest[] | void>
  changeVerifyStatus(requesId : string , status : "Pending" | "Approved" | "Rejected"  ,next : Next): Promise<{ success: boolean; } | undefined | void>
  getUsers(next: Next): Promise<any>;
  blockUser(id: string): Promise<any>;
}
