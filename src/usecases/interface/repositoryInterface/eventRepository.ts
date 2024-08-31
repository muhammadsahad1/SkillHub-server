import { ICreateEvent, IEvent } from "../../../commonEntities/entities/event";
import { IEventRegister } from "../../../commonEntities/entities/eventRegister";
import { IZegoService } from "../../../framework/service/zegoService";
import { IS3Operations } from "../../../framework/service/s3Bucket";

export interface IEventRepository {
  createEvent(
    userId: string,
    data: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    zegoService : IZegoService,
    s3Operations: IS3Operations
  ): Promise<{ success: boolean; message: string , joinLink ?: string } | void>

  getEvents(s3Operations :IS3Operations) : Promise<IEvent[] | void>

  eventDetails(eventId : string ,s3Operations : IS3Operations) : Promise<IEvent | void | null> 
  
  eventRegister(eventRegisterData : IEventRegister) :Promise<{success : boolean ,message : string ,joinToken ?: string}>

  getEvent(eventId : string ) : Promise<IEvent | null | void>
}
