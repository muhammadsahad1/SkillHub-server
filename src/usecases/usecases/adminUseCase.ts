// interfaces
import { IS3Operations } from "../../framework/service/s3Bucket.js";
import { IadminRepository } from "../interface/repositoryInterface/adminRepository.js";
import { IhashPassword } from "../interface/service/hashPassword.js";
import { Ijwt } from "../interface/service/jwt.js";
import { IsendEmail } from "../interface/service/sendEmail.js";
import { IadminUseCase } from "../interface/usecase/adminUseCase.js";
import { adminLogin, blockUser, changeEventsStatus, changeVerifyStatus, getEvents, getUsers, getVerificationRequests , getReports, reportAction, dashBoardData } from "./admin/index.js";
import { Next } from "../../framework/types/serverPackageType.js";
import { IVerificationRequest } from "../../commonEntities/entities/verificationRequest.js";
import { Server } from "socket.io";
import { IEvent } from "../../commonEntities/entities/event.js";
import { IReportRequest } from "../../commonEntities/entities/reportRequests.js";

// ================================= Admin user cases ================================= \\

export class AdminUseCase implements IadminUseCase {
  constructor(
    private adminRepostory: IadminRepository,
    private Jwt: Ijwt,
    private hashPassword: IhashPassword,
    private sendEmail: IsendEmail,
    private s3: IS3Operations,
    private io : Server,
  ) {}

  // ===================================================================>
  async adminLogin(email: string, password: string, next: Next): Promise<any> {
    const result = await adminLogin(
      email,
      password,
      this.Jwt,
      this.hashPassword,
      this.adminRepostory,
      next
    );
    return result;
  }
  // ===================================================================>
  async getUsers(next: Next): Promise<any> {
    const result = await getUsers(this.adminRepostory, next);
    return result;
  }
  // ===================================================================>
  async getVerificationRequests(next: Next): Promise<IVerificationRequest[] | void> {
    const result = await getVerificationRequests(this.adminRepostory,next)
    return result 
  }
  
  async changeVerifyStatus(requesId: string, status: "Pending" | "Approved" | "Rejected" , next: Next): Promise<{ success: boolean; } | undefined | void> {
    const result = await changeVerifyStatus(requesId , status ,this.adminRepostory,this.io,next)
    return result
  }
  // ===================================================================>
  async getEvents(next: Next):Promise<void | IEvent[]>{
    return await getEvents(next,this.adminRepostory)
  }
 // ===================================================================>
  async changeEventStatus(requestId: string, action : "Pending" | "Approved" | "Rejected",next: Next): Promise<{ success: boolean } | void> {
    return await changeEventsStatus(requestId ,action, this.adminRepostory , next)
  }

  // ===================================================================>
  async blockUser(id: string): Promise<any> {
    const result = await blockUser(id, this.adminRepostory);
    return result;
  }
// ===================================================================>
  async getReports (next : Next) : Promise<IReportRequest[] | void> {
    return await getReports(next,this.adminRepostory,this.s3)
  }

  async reportAction(reportId: string, status: string,next : Next): Promise<{ success: boolean; message: string; } | void> {
      return await reportAction(reportId,status,this.adminRepostory,next)
  }

  async dashBoardData(next: Next): Promise<any> {
      return await dashBoardData(this.adminRepostory,next)
  }
}
