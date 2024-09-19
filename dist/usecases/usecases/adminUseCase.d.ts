import { IS3Operations } from "../../framework/service/s3Bucket";
import { IadminRepository } from "../interface/repositoryInterface/adminRepository";
import { IhashPassword } from "../interface/service/hashPassword";
import { Ijwt } from "../interface/service/jwt";
import { IsendEmail } from "../interface/service/sendEmail";
import { IadminUseCase } from "../interface/usecase/adminUseCase";
import { Next } from "../../framework/types/serverPackageType";
import { IVerificationRequest } from "../../commonEntities/entities/verificationRequest";
import { Server } from "socket.io";
import { IEvent } from "../../commonEntities/entities/event";
import { IReportRequest } from "../../commonEntities/entities/reportRequests";
export declare class AdminUseCase implements IadminUseCase {
    private adminRepostory;
    private Jwt;
    private hashPassword;
    private sendEmail;
    private s3;
    private io;
    constructor(adminRepostory: IadminRepository, Jwt: Ijwt, hashPassword: IhashPassword, sendEmail: IsendEmail, s3: IS3Operations, io: Server);
    adminLogin(email: string, password: string, next: Next): Promise<any>;
    getUsers(next: Next): Promise<any>;
    getVerificationRequests(next: Next): Promise<IVerificationRequest[] | void>;
    changeVerifyStatus(requesId: string, status: "Pending" | "Approved" | "Rejected", next: Next): Promise<{
        success: boolean;
    } | undefined | void>;
    getEvents(next: Next): Promise<void | IEvent[]>;
    changeEventStatus(requestId: string, action: "Pending" | "Approved" | "Rejected", next: Next): Promise<{
        success: boolean;
    } | void>;
    blockUser(id: string): Promise<any>;
    getReports(next: Next): Promise<IReportRequest[] | void>;
    reportAction(reportId: string, status: string, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
    dashBoardData(next: Next): Promise<any>;
}
