import { IToken } from "../service/jwt";
import { Next } from "../../../framework/types/serverPackageType";
import { IVerificationRequest } from "../../../commonEntities/entities/verificationRequest";
import { IEvent } from "../../../commonEntities/entities/event";

// ================================> AdminUseCase Interface
export interface IadminUseCase {
  adminLogin(email: string, password: string, next: Next): Promise<any>;
  getVerificationRequests(next : Next) : Promise<IVerificationRequest[] | void>
  changeVerifyStatus(requesId : string , status : "Pending" | "Approved" | "Rejected"  ,next : Next): Promise<{ success: boolean; } | undefined | void>
  getEvents(next : Next) :Promise<void | IEvent[]>
  getUsers(next: Next): Promise<any>;
  changeEventStatus(requestId : string,action : string,next : Next ): Promise<{ success: boolean; } | void>
  blockUser(id: string): Promise<any>;
}
