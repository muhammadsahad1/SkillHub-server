import { ICreateEvent, IEvent } from "../../../../commonEntities/entities/event";
import { IEventRepository } from "../../../../usecases/interface/repositoryInterface/eventRepository";
import { IS3Operations } from "../../../service/s3Bucket";
import EventModel from "../model/eventModel";
import { createEvent, getEvents } from "./event/index";

export class EventRepository implements IEventRepository {
  constructor(private eventModel: typeof EventModel) {}

  async createEvent(
    userId : string,
    data : ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    s3: IS3Operations
  ): Promise<{ success: boolean; message: string } | void> {
    return await createEvent(
      userId,
      data,
      bannerFile,
      s3,
      this.eventModel
    );
  }

  async getEvents(s3: IS3Operations): Promise<IEvent[] | void> {
    return await getEvents(this.eventModel,s3)
  }
}
