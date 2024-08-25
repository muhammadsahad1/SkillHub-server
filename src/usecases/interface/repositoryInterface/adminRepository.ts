import { Iuser } from "../../../commonEntities/entities/user";
import { IVerificationRequest } from "../../../commonEntities/entities/verificationRequest";

export interface IadminRepository {
  adminLogin(email: string): Promise<Iuser | void>;
  getUsers(): Promise<Iuser[] | undefined>;
  getVerificationRequests(): Promise<IVerificationRequest[] | undefined> 
  changeVerifyStatus(requesId : string,status : "Pending" | "Approved" | "Rejected" ) : Promise<{success : boolean} | undefined>
  blockUser(id : string) : Promise<any>;
}
