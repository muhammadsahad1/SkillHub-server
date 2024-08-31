import { ICreateEvent, IEvent } from "../../../commonEntities/entities/event";
import { IEventRegister } from "../../../commonEntities/entities/eventRegister";
import { Next } from "../../../framework/types/serverPackageType";

export interface IEventUseCase {
  createEvent(
    userId: string,
    eventDate: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    next: Next
  ):  Promise<{ success: boolean; message: string , joinLink : string } | void>;

  // ============================================================

  getEvents(next: Next): Promise<IEvent[] | void>;

  // ============================================================

  eventDetails(eventId : string , next : Next) : Promise<IEvent | void | null>

  eventRegister(registerData : IEventRegister,next : Next) :Promise<{success : boolean ,message : string ,joinToken : string} | void>

  getEvent(eventId : string,next : Next)  : Promise<IEvent | void>

}
