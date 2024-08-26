import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { IEventUseCase } from "../../usecases/interface/usecase/eventUseCase";

// [=============================== Event Controller =============================]
export class EventController {
  constructor(private eventUseCase: IEventUseCase) {}
  // creating Event
  async createEvent(req: Req, res: Res, next: Next) {
    const {
      title,
      description,
      date,
      time,
      duration,
      speaker,
      registrationLink,
      accessLink,
      category,
    } = req.body;
    const result = await this.eventUseCase.createEvent(
      title,
      description,
      date,
      time,
      duration,
      speaker,
      registrationLink,
      accessLink,
      category,
      req?.file
    );
    if (result) {
      res.status(200).json(result);
    }
  }
}
