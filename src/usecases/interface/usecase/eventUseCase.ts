import { ICreateEvent, IEvent } from "../../../commonEntities/entities/event";
import { IEventRegister } from "../../../commonEntities/entities/eventRegister";
import { Next } from "../../../framework/types/serverPackageType";

export interface IEventUseCase {
  createEvent(
    userId: string,
    eventDate: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string } | void>;

  // ============================================================

  getEvents(next: Next): Promise<IEvent[] | void>;

  // ============================================================

  eventDetails(eventId : string , next : Next) : Promise<IEvent | void | null>

  eventRegiter(registerData : IEventRegister,next : Next) : Promise<any>
}
