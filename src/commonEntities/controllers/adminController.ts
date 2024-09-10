import { Next, Req, Res } from "../../framework/types/serverPackageType";
import { IadminUseCase } from "../../usecases/interface/usecase/adminUseCase";
import {
  accessTokenOption,
  refreshTokenOption,
  roleOptions,
} from "../../framework/webServer/middleware/jwt";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
// ===================================== User Controller ================================= //

export class AdminController {
  constructor(private adminUseCase: IadminUseCase) {}
  // ======================================================>
  async adminLogin(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.adminLogin(
      req.body.email,
      req.body.password,
      next
    );

    console.log("ress =>", result);

    res.cookie(
      "admin_access_token",
      result.tokens?.accessToken,
      accessTokenOption
    );

    res.cookie(
      "admin_refresh_token",
      result.tokens?.refreshToken,
      refreshTokenOption
    );

    res.cookie("role", "admin", roleOptions);
    if (result) {
      res.status(200).json(result);
    }
  }
  // ======================================================>
  async getUsers(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.getUsers(next);
    res.status(200).json(result);
  }

  // ======================================================>
  async blockUser(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.blockUser(req.body.id);
    res.status(200).json(result);
  }

  // ======================================================>
  async getVerificationRequests(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.getVerificationRequests(next);
    res.status(200).json(result);
  }
  // ======================================================>
  async changeVerifyStatus(req: Req, res: Res, next: Next) {
    const { reqId, status } = req.body;
    const result = await this.adminUseCase.changeVerifyStatus(
      reqId,
      status,
      next
    );
    res.status(200).json(result);
  }
  // ======================================================>
  async getEvents(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.getEvents(next);
    res.status(200).json(result);
  }
  // ======================================================>
  async changeEventStatus(req: Req, res: Res, next: Next) {
    const { requestId, action } = req.body;
    const result = await this.adminUseCase.changeEventStatus(
      requestId,
      action,
      next
    );
    res.status(200).json(result);
  }
  // ======================================================>
  async logout(req: Req, res: Res, next: Next) {
    try {
      res.clearCookie("admin_access_token", accessTokenOption);
      // res.clearCookie("admin_refresh_token", refreshTokenOption);
      res.clearCookie("role", roleOptions);
      res.status(200).json({ message: "admin logout successfull" });
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ======================================================>
  async getReports(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getReports(next);
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }
  // ======================================================>
  async reportAction(req: Req, res: Res, next: Next) {
    try {
      const { reportId, status } = req.body as {
        reportId: string;
        status: string;
      };
      const result = await this.adminUseCase.reportAction(
        reportId,
        status,
        next
      );
      if (result) {
        res.status(200).json(result);
      }
    } catch (error) {}
  }
  // ======================================================>
  async dasboardData(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.dashBoardData(next);
    if (result) {
      res.status(200).json(result);
    }
  }
}
