import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
import { ImessageUseCase } from "../../usecases/interface/usecase/messageUseCase";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
import httpStatus from "../status/httpStatus";

export class MessageController {
  constructor(private messageUseCase: ImessageUseCase) {}

  async sendMessage(req: CustomRequest, res: Res, next: Next) {
    try {
      const { receiverId, messages } = req.body;
      const senderId = req.user?.id as string;
      const result = await this.messageUseCase.sendMessage(senderId, receiverId, messages, next);
      res.status(httpStatus.CREATED).json(result); // Use CREATED status
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getChat(req: Req, res: Res, next: Next) {
    try {
      const { senderId, userToChatId } = req.query;
      const result = await this.messageUseCase.getChat(userToChatId, senderId, next);
      res.status(httpStatus.OK).json(result); // Use OK status
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async chatUsers(req: CustomRequest, res: Res, next: Next) {
    try {
      const userId = req.user?.id as string;
      const result = await this.messageUseCase.getConversationsUsers(userId, next);
      res.status(httpStatus.OK).json(result); // Use OK status
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async markAsRead(req: CustomRequest, res: Res, next: Next) {
    try {
      const { conversationId } = req.body;
      const userId = req.user?.id;
      await this.messageUseCase.markAsRead(conversationId, userId, next);
      res.status(httpStatus.NO_CONTENT).send(); // Use NO_CONTENT status for successful operation without content
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async uploadImage(req: Req, res: Res, next: Next) {
    try {
      const { senderId, receiverId } = req.body;
      const result = await this.messageUseCase.sendImage(senderId, receiverId, req.file, next);
      res.status(httpStatus.OK).json(result); // Use OK status
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
}
