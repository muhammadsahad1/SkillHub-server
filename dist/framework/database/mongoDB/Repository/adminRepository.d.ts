import { Iuser } from "../../../../commonEntities/entities/user";
import { IadminRepository } from "../../../../usecases/interface/repositoryInterface/adminRepository";
import userModel from "../model/userModel";
import { IVerificationRequest } from "../../../../commonEntities/entities/verificationRequest";
import { VerificationRequestModal } from "../model/VerificationRequest";
import { IEvent } from "../../../../commonEntities/entities/event";
import EventModel from "../model/eventModel";
import { IReportRequest } from "../../../../commonEntities/entities/reportRequests";
import ReportModel from "../model/reportRequest";
import { IS3Operations } from "../../../service/s3Bucket";
import PostModel from "../model/postModel";
import { NotificationModel } from "../model/notification";
import { GroupModel } from "../model/groupModel";
export declare class AdminRepository implements IadminRepository {
    private userModels;
    private verificationRequestsModel;
    private eventModel;
    private reportModel;
    private postModel;
    private notifcationModel;
    private groupModel;
    constructor(userModels: typeof userModel, verificationRequestsModel: typeof VerificationRequestModal, eventModel: typeof EventModel, reportModel: typeof ReportModel, postModel: typeof PostModel, notifcationModel: typeof NotificationModel, groupModel: typeof GroupModel);
    adminLogin(email: string): Promise<Iuser | void>;
    getUsers(): Promise<Iuser[] | undefined>;
    getVerificationRequests(): Promise<IVerificationRequest[] | undefined>;
    changeVerifyStatus(requesId: string, status: "Pending" | "Approved" | "Rejected"): Promise<{
        success: boolean;
    } | undefined>;
    getEvents(): Promise<IEvent[] | void>;
    changeEventStatus(requestId: string, status: "Pending" | "Approved" | "Rejected"): Promise<{
        success: boolean;
    } | void>;
    getReports(s3Operations: IS3Operations): Promise<IReportRequest[] | void>;
    blockUser(id: string): Promise<any>;
    reportAction(reportId: string, status: string): Promise<{
        success: boolean;
        message: string;
    } | void>;
    dashBoardData(): Promise<any>;
}
