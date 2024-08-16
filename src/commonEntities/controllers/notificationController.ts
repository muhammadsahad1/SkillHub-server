import { InotificationUseCase } from "../../usecases/interface/usecase/notificationUseCase";
import { Req, Res, Next } from "../../framework/types/serverPackageType";

export class NotificationController {
  constructor(private notificationUseCase: InotificationUseCase) {}

  async createNotification(req: Req, res: Res, next: Next) {
    console.log("bodyyyy ====>",req.body);
    
    const { senderId, receiverId, message, type , link } = req.body;
    const result = await this.notificationUseCase.createNotification(senderId,receiverId,message,type,link,next);
    res.status(201).json(result)
  }

  async getNotifications(req: Req, res: Res, next: Next) {
    const userId = req.user?.id
    const result = await this.notificationUseCase.notifications(userId,next);
    res.status(201).json(result)
  }

}
