import { Next, Req, Res } from "../../framework/types/serverPackageType";
import { IadminUseCase } from "../../usecases/interface/usecase/adminUseCase";
import {
  accessTokenOption,
  refreshTokenOption,
  roleOptions,
} from "../../framework/webServer/middleware/jwt";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
import httpStatus from "../status/httpStatus";
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

    console.log("admin loging called");
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
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.UNAUTHORIZED).json({ message: "Login failed" });
    }
  }

  // ======================================================>
  async getUsers(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.getUsers(next);
    res.status(httpStatus.OK).json(result);
  }

  // ======================================================>
  async blockUser(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.blockUser(req.body.id);
    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ message: "User not found" });
    }
  }

  // ======================================================>
  async getVerificationRequests(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.getVerificationRequests(next);
    res.status(httpStatus.OK).json(result);
  }

  // ======================================================>
  async changeVerifyStatus(req: Req, res: Res, next: Next) {
    const { reqId, status } = req.body;
    const result = await this.adminUseCase.changeVerifyStatus(
      reqId,
      status,
      next
    );
    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res
        .status(httpStatus.BAD_REQUEST)
        .json({ message: "Invalid request ID" });
    }
  }
  // ======================================================>
  async getEvents(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.getEvents(next);
    res.status(httpStatus.OK).json(result);
  }
  // ======================================================>
  async changeEventStatus(req: Req, res: Res, next: Next) {
    const { requestId, action } = req.body;
    const result = await this.adminUseCase.changeEventStatus(
      requestId,
      action,
      next
    );
    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res.status(httpStatus.BAD_REQUEST).json({ message: "Invalid event ID" });
    }
  }
  // ======================================================>
  async logout(req: Req, res: Res, next: Next) {
    try {
      res.clearCookie("admin_access_token", accessTokenOption);
      res.clearCookie("role", roleOptions);
      res.status(httpStatus.OK).json({ message: "Admin logout successful" });
    } catch (error: any) {
      return next(
        new ErrorHandler(httpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
    }
  }
  // ======================================================>
  async getReports(req: Req, res: Res, next: Next) {
    try {
      const result = await this.adminUseCase.getReports(next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      } else {
        res.status(httpStatus.NO_CONTENT).json({ message: "No reports found" });
      }
    } catch (error: any) {
      return next(
        new ErrorHandler(httpStatus.INTERNAL_SERVER_ERROR, error.message)
      );
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
        res.status(httpStatus.OK).json(result);
      } else {
        res
          .status(httpStatus.BAD_REQUEST)
          .json({ message: "Invalid report ID" });
      }
    } catch (error) {
      return next(
        new ErrorHandler(
          httpStatus.INTERNAL_SERVER_ERROR,
          "Report action failed"
        )
      );
    }
  }
  // ======================================================>
  async dasboardData(req: Req, res: Res, next: Next) {
    const result = await this.adminUseCase.dashBoardData(next);
    if (result) {
      res.status(httpStatus.OK).json(result);
    } else {
      res
        .status(httpStatus.NO_CONTENT)
        .json({ message: "No dashboard data available" });
    }
  }
}
