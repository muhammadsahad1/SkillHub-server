import { ICreateEvent, IEvent } from "../../../../commonEntities/entities/event";
import { IEventRegister } from "../../../../commonEntities/entities/eventRegister";
import { IEventRepository } from "../../../../usecases/interface/repositoryInterface/eventRepository";

import { IS3Operations } from "../../../service/s3Bucket";
import { IZegoService } from "../../../service/zegoService";
import EventModel from "../model/eventModel";
import { EventPaymentModel } from "../model/eventPaymentModel";
import { createEvent, eventDetails, eventRegister, getEvent, getEvents } from "./event/index";

export class EventRepository implements IEventRepository {
  constructor(private eventModel: typeof EventModel,
    private eventPaymentModel : typeof EventPaymentModel
  ) {}


  async createEvent(
    userId : string,
    data : ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    zegoService : IZegoService,
    s3: IS3Operations
  ): Promise<{ success: boolean; message: string , joinLink?: string } | void> {
    return await createEvent(
      userId,
      data,
      bannerFile,
      s3,
      this.eventModel,
      zegoService,
    );
  }

  async getEvents(s3: IS3Operations): Promise<IEvent[] | void> {
    return await getEvents(this.eventModel,s3)
  }

  async eventDetails(eventId: string, s3Operations: IS3Operations): Promise<IEvent | void | null> {
      return await eventDetails(eventId,this.eventModel,s3Operations)
  }

  async eventRegister(eventRegisterData: IEventRegister):Promise<{success : boolean ,message : string ,joinToken ?: string}> {
    return await eventRegister(eventRegisterData,this.eventModel,this.eventPaymentModel)
  }

  async getEvent(eventId: string): Promise<IEvent | null | void> {
    return await getEvent(eventId,this.eventModel)
  }

}
