import { InotificationUseCase } from "../../usecases/interface/usecase/notificationUseCase";
import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
export declare class NotificationController {
    private notificationUseCase;
    constructor(notificationUseCase: InotificationUseCase);
    createNotification(req: Req, res: Res, next: Next): Promise<void>;
    getNotifications(req: CustomRequest, res: Res, next: Next): Promise<void>;
    markAsRead(req: Req, res: Res, next: Next): Promise<void>;
}
