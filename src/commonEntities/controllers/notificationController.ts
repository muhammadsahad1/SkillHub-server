import { InotificationUseCase } from "../../usecases/interface/usecase/notificationUseCase";
import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";

export class NotificationController {
  constructor(private notificationUseCase: InotificationUseCase) {}
// creating new notification
  async createNotification(req: Req, res: Res, next: Next) {
    const { senderId, receiverId, message, type , link } = req.body;
    const result = await this.notificationUseCase.createNotification(senderId,receiverId,message,type,link,next);
    res.status(201).json(result)
  }
// get all notifications
  async getNotifications(req: CustomRequest, res: Res, next: Next) {
    const userId = req.user?.id
    const result = await this.notificationUseCase.notifications(userId,next);
    res.status(201).json(result)
  }
// marking as read the notification
  async markAsRead(req: Req, res: Res, next: Next) {
    console.log("Received markAsRead request");
    console.log("Request body:", req.body);
    
    const { notificationId } = req.body
    
    const result = await this.notificationUseCase.markAsRead(notificationId,next);
    res.status(201).json(result)
  }
}
