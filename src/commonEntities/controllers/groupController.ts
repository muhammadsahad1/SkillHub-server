import { json } from "stream/consumers";
import { Next, Req, Res } from "../../framework/types/serverPackageType";
import { IgroupUseCase } from "../../usecases/interface/usecase/groupUseCase";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
import httpStatus from "../status/httpStatus";

//============================== Group Controller ================== \\

export class GroupController {
  constructor(private groupUseCase: IgroupUseCase) {}

  async createGroup(req: CustomRequest, res: Res, next: Next) {
    try {
      const groupData = req.body;
      const creatorId = req.user?.id as string;
      const result = await this.groupUseCase.createGroup(
        groupData,
        creatorId,
        req.file,
        next
      );
      if (result) {
        res.status(httpStatus.CREATED).json(result); // Use CREATED status
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getGroups(req: Req, res: Res, next: Next) {
    try {
      const result = await this.groupUseCase.getGroups(next);
      if (result) {
        res.status(httpStatus.OK).json({
          success: true,
          result,
        });
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async joinGroup(req: CustomRequest, res: Res, next: Next) {
    try {
      const { groupId } = req.body;
      const userId = req.user?.id as string;
      const result = await this.groupUseCase.joinGroup(groupId, userId, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async getGroup(req: Req, res: Res, next: Next) {
    try {
      const { groupId } = req.query as { groupId: string };
      const result = await this.groupUseCase.getGroup(groupId, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async sendMessage(req: CustomRequest, res: Res, next: Next) {
    try {
      const { groupId, message } = req.body as {
        groupId: string;
        message: string;
      };
      const senderId = req.user?.id;
      const result = await this.groupUseCase.sendMessage(
        senderId,
        groupId,
        message,
        next
      );
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async messages(req: Req, res: Res, next: Next) {
    try {
      const { groupId } = req.query as { groupId: string };
      const result = await this.groupUseCase.messages(groupId, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async updateOnlineStatus(req: Req, res: Res, next: Next) {
    try {
      const { groupId, userId, status } = req.body;
      const result = await this.groupUseCase.updateOnlineStatus(
        groupId,
        userId,
        status,
        next
      );
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async leaveGroup(req: CustomRequest, res: Res, next: Next) {
    try {
      const { groupId } = req.body as { groupId: string };
      const userId = req.user?.id;
      const result = await this.groupUseCase.leaveGroup(groupId, userId, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
}
