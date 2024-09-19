import { Iuser } from "../../../../commonEntities/entities/user.js";
import { IadminRepository } from "../../../../usecases/interface/repositoryInterface/adminRepository.js";
import { findByEmail } from "./user";
import userModel from "../model/userModel.js";
import {
  blockUser,
  changeEventStatus,
  changeVerifyStatus,
  dashBoardData,
  getEvents,
  getReports,
  getUsers,
  getVerificationRequests,
  reportAction,
} from "./admin/index.js";
import { IVerificationRequest } from "../../../../commonEntities/entities/verificationRequest.js";
import { VerificationRequestModal } from "../model/VerificationRequest.js";
import { IEvent } from "../../../../commonEntities/entities/event.js";
import EventModel from "../model/eventModel.js";
import { IReportRequest } from "../../../../commonEntities/entities/reportRequests.js";
import ReportModel from "../model/reportRequest.js";
import { IS3Operations } from "../../../service/s3Bucket.js";
import PostModel from "../model/postModel.js";
import { NotificationModel } from "../model/notification.js";
import { GroupModel } from "../model/groupModel.js";

export class AdminRepository implements IadminRepository {
  constructor(
    private userModels: typeof userModel,
    private verificationRequestsModel: typeof VerificationRequestModal,
    private eventModel: typeof EventModel,
    private reportModel: typeof ReportModel,
    private postModel: typeof PostModel,
    private notifcationModel: typeof NotificationModel,
    private groupModel: typeof GroupModel
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

  async changeVerifyStatus(
    requesId: string,
    status: "Pending" | "Approved" | "Rejected"
  ): Promise<{ success: boolean } | undefined> {
    return await changeVerifyStatus(
      requesId,
      status,
      this.userModels,
      this.verificationRequestsModel
    );
  }

  async getEvents(): Promise<IEvent[] | void> {
    return await getEvents(this.eventModel, this.userModels);
  }

  async changeEventStatus(
    requestId: string,
    status: "Pending" | "Approved" | "Rejected"
  ): Promise<{ success: boolean } | void> {
    return await changeEventStatus(requestId, status, this.eventModel);
  }

  async getReports(
    s3Operations: IS3Operations
  ): Promise<IReportRequest[] | void> {
    return await getReports(this.reportModel, this.postModel, s3Operations);
  }

  async blockUser(id: string): Promise<any> {
    return await blockUser(id, this.userModels);
  }

  async reportAction(
    reportId: string,
    status: string
  ): Promise<{ success: boolean; message: string } | void> {
    return await reportAction(
      reportId,
      status,
      this.reportModel,
      this.postModel,
      this.notifcationModel
    );
  }

  async dashBoardData(): Promise<any> {
    return await dashBoardData(
      this.postModel,
      this.groupModel,
      this.eventModel,
      this.userModels
    );
  }
}
