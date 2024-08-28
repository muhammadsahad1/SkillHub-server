import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { IEventUseCase } from "../../usecases/interface/usecase/eventUseCase";

// [=============================== Event Controller =============================]
export class EventController {
  constructor(private eventUseCase: IEventUseCase) {}
  // creating Event
  async createEvent(req: Req, res: Res, next: Next) {
    const data = req.body;
    const userId = req.user?.id;
    const result = await this.eventUseCase?.createEvent(
      userId,
      data,
      req.file,
      next
    );
    if (result) {
      res.status(200).json(result);
    }
  }

  // fetching the all events
  async getEvents(req: Req, res: Res, next: Next) {
  const result = await this.eventUseCase.getEvents(next);
    if (result) {
      res.status(200).json(result);
    }
  
  }

  async eventDetails(req : Req , res : Res, next : Next) {
    const eventId = req.query.eventId as string;
    const result = await this.eventUseCase.eventDetails(eventId,next)
    if(result){
      res.status(200).json(result)
    }
  }

  async eventRegister() {
    const result = await this.eventUseCase.
  }
}
