import { ICreateEvent, IEvent } from "../../../commonEntities/entities/event";
import { IS3Operations } from "../../../framework/service/s3Bucket";

export interface IEventRepository {
  createEvent(
    userId: string,
    data: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    s3Operations: IS3Operations
  ):Promise<{success : boolean , message : string} | void> 

  getEvents(s3Operations :IS3Operations) : Promise<IEvent[] | void>
}
