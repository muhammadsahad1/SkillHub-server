import { IEvent } from "../../../commonEntities/entities/event";
import { IReportRequest } from "../../../commonEntities/entities/reportRequests";
import { Iuser } from "../../../commonEntities/entities/user";
import { IVerificationRequest } from "../../../commonEntities/entities/verificationRequest";
import { IS3Operations } from "../../../framework/service/s3Bucket";

export interface IadminRepository {
  adminLogin(email: string): Promise<Iuser | void>;
  getUsers(): Promise<Iuser[] | undefined>;
  getVerificationRequests(): Promise<IVerificationRequest[] | undefined> 
  changeVerifyStatus(requesId : string,status : "Pending" | "Approved" | "Rejected" ) : Promise<{success : boolean} | undefined>
  changeEventStatus(requestId : string,status : "Pending" | "Approved" | "Rejected"  ): Promise<{ success: boolean; } | void>
  getEvents() : Promise<IEvent[] | void>
  getReports(s3Operations : IS3Operations) : Promise<IReportRequest[] | void>
  blockUser(id : string) : Promise<any>;
  dashBoardData() : Promise<any>
  reportAction(reportId : string , status : string  ): Promise<{ success: boolean; message: string } | void>;
}
