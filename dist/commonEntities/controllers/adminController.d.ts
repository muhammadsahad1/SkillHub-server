import { Next, Req, Res } from "../../framework/types/serverPackageType";
import { IadminUseCase } from "../../usecases/interface/usecase/adminUseCase";
export declare class AdminController {
    private adminUseCase;
    constructor(adminUseCase: IadminUseCase);
    adminLogin(req: Req, res: Res, next: Next): Promise<void>;
    getUsers(req: Req, res: Res, next: Next): Promise<void>;
    blockUser(req: Req, res: Res, next: Next): Promise<void>;
    getVerificationRequests(req: Req, res: Res, next: Next): Promise<void>;
    changeVerifyStatus(req: Req, res: Res, next: Next): Promise<void>;
    getEvents(req: Req, res: Res, next: Next): Promise<void>;
    changeEventStatus(req: Req, res: Res, next: Next): Promise<void>;
    logout(req: Req, res: Res, next: Next): Promise<void>;
    getReports(req: Req, res: Res, next: Next): Promise<void>;
    reportAction(req: Req, res: Res, next: Next): Promise<void>;
    dasboardData(req: Req, res: Res, next: Next): Promise<void>;
}
