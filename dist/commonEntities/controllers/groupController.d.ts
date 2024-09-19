import { Next, Req, Res } from "../../framework/types/serverPackageType";
import { IgroupUseCase } from "../../usecases/interface/usecase/groupUseCase";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
export declare class GroupController {
    private groupUseCase;
    constructor(groupUseCase: IgroupUseCase);
    createGroup(req: CustomRequest, res: Res, next: Next): Promise<void>;
    getGroups(req: Req, res: Res, next: Next): Promise<void>;
    joinGroup(req: CustomRequest, res: Res, next: Next): Promise<void>;
    getGroup(req: Req, res: Res, next: Next): Promise<void>;
    sendMessage(req: CustomRequest, res: Res, next: Next): Promise<void>;
    messages(req: Req, res: Res, next: Next): Promise<void>;
    updateOnlineStatus(req: Req, res: Res, next: Next): Promise<void>;
    leaveGroup(req: CustomRequest, res: Res, next: Next): Promise<void>;
}
