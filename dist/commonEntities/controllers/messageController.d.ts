import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
import { ImessageUseCase } from "../../usecases/interface/usecase/messageUseCase";
export declare class MessageController {
    private messageUseCase;
    constructor(messageUseCase: ImessageUseCase);
    sendMessage(req: CustomRequest, res: Res, next: Next): Promise<void>;
    getChat(req: Req, res: Res, next: Next): Promise<void>;
    chatUsers(req: CustomRequest, res: Res, next: Next): Promise<void>;
    markAsRead(req: CustomRequest, res: Res, next: Next): Promise<void>;
    uploadImage(req: Req, res: Res, next: Next): Promise<{
        success: boolean;
    }>;
}
