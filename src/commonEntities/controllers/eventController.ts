import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
import { IEventUseCase } from "../../usecases/interface/usecase/eventUseCase";
import { ErrorHandler } from "../../usecases/middlewares/errorMiddleware";

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
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  // fetching the all events
  async getEvents(req: Req, res: Res, next: Next) {
    try {
      const result = await this.eventUseCase.getEvents(next);
      if (result) {
        res.status(200).json(result);
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
        res.status(200).json(result);
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
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  async joinMeeting(req: Req, res: Res, next: Next) {
    try {
      console.log("vann join meeting ");
      
      const { eventId } = req.query as { eventId: string };
      console.log("evId =>",eventId)
      const result = await this.eventUseCase.getEvent(eventId, next);
      console.log("result==>",result)
      if (result) {
        res.status(200).json(result);
      }
    } catch (error: any) {
      return next(new ErrorHandler(error.status, error.message));
    }
  }

  // async generateToken(req : Req, res :Res , next : Next) {

  // }
}
