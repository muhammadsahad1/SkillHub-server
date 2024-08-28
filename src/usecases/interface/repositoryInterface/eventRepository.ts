import { ICreateEvent, IEvent } from "../../../commonEntities/entities/event";
import { IEventRegister } from "../../../commonEntities/entities/eventRegister";
import { IS3Operations } from "../../../framework/service/s3Bucket";

export interface IEventRepository {
  createEvent(
    userId: string,
    data: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    s3Operations: IS3Operations
  ):Promise<{success : boolean , message : string} | void> 

  getEvents(s3Operations :IS3Operations) : Promise<IEvent[] | void>

  eventDetails(eventId : string ,s3Operations : IS3Operations) : Promise<IEvent | void | null> 
  
  eventRegister(eventRegisterData : IEventRegister) : Promise<any>
}
