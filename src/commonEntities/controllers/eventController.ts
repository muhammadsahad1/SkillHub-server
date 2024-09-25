import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
import { IEventUseCase } from "../../usecases/interface/usecase/eventUseCase";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";
import httpStatus from "../status/httpStatus";

// [=============================== Event Controller =============================]

export class EventController {
  constructor(private eventUseCase: IEventUseCase) {}

  // creating Event
  async createEvent(req: CustomRequest, res: Res, next: Next) {
    try {
      const data = req.body;
      const userId = req.user?.id as string;
      const result = await this.eventUseCase?.createEvent(
        userId,
        data,
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

  // fetching all events
  async getEvents(req: Req, res: Res, next: Next) {
    try {
      console.log("req.q ==>", req.query);
      const pageNumber = parseInt(req.query.pageNumber as string, 10);
      const result = await this.eventUseCase.getEvents(pageNumber, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async eventDetails(req: Req, res: Res, next: Next) {
    try {
      const eventId = req.query.eventId as string;
      const result = await this.eventUseCase.eventDetails(eventId, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async eventRegister(req: Req, res: Res, next: Next) {
    try {
      const { registerData } = req.body;
      const result = await this.eventUseCase.eventRegister(registerData, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async joinMeeting(req: Req, res: Res, next: Next) {
    try {
      const { eventId } = req.query as { eventId: string };
      const result = await this.eventUseCase.getEvent(eventId, next);
      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async makePayment(req: Req, res: Res, next: Next) {
    try {
      const { eventPrice, eventId, userId } = req.body as {
        eventPrice: string;
        eventId: string;
        userId: string;
      };

      const result = await this.eventUseCase.makePayment(
        eventPrice,
        eventId,
        userId,
        next
      );

      if (result) {
        res.status(httpStatus.OK).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async changeStatus(req: Req, res: Res, next: Next) {
    const { eventId, status } = req.body;
    const result = await this.eventUseCase.changeStatus(eventId, status, next);
    if (result) { 
    }
  }
}
