import {
  ICreateEvent,
  IEvent,
} from "../../../../commonEntities/entities/event.js";
import { IEventRegister } from "../../../../commonEntities/entities/eventRegister.js";
import { IEventRepository } from "../../../../usecases/interface/repositoryInterface/eventRepository.js";

import { IS3Operations } from "../../../service/s3Bucket.js";
import { IStripeService } from "../../../service/stripService.js";
import EventModel from "../model/eventModel.js";
import { EventPaymentModel } from "../model/eventPaymentModel.js";
import userModel from "../model/userModel.js";
import {
  changeStatus,
  createOrUpdateEvent,
  eventDetails,
  eventRegister,
  getEvent,
  getEvents,
} from "./event/index.js";

export class EventRepository implements IEventRepository {
  constructor(
    private eventModel: typeof EventModel,
    private eventPaymentModel: typeof EventPaymentModel,
    private userModels: typeof userModel
  ) {}

  async createEvent(
    userId: string,
    data: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    s3: IS3Operations
  ): Promise<{ success: boolean; message: string } | void> {
    return await createOrUpdateEvent(
      userId,
      data,
      bannerFile,
      s3,
      this.eventModel
    );
  }

  async getEvents(
    pageNumber: number,
    s3: IS3Operations
  ): Promise<IEvent[] | void> {
    return await getEvents(pageNumber, this.eventModel, s3);
  }

  async eventDetails(
    eventId: string,
    s3Operations: IS3Operations
  ): Promise<IEvent | void | null> {
    return await eventDetails(eventId, this.eventModel, s3Operations);
  }

  async eventRegister(
    stripService: IStripeService,
    eventRegisterData: IEventRegister
  ): Promise<{
    success: boolean;
    message: string;
    joinToken?: string;
    paymentUrl?: string;
  }> {
    return await eventRegister(
      eventRegisterData,
      this.eventModel,
      this.eventPaymentModel,
      this.userModels
    );
  }

  async getEvent(eventId: string): Promise<IEvent | null | void> {
    return await getEvent(eventId, this.eventModel);
  }

  async changeStatus(
    eventId: string,
    status: string
  ): Promise<{ success: boolean } | void> {
    return await changeStatus(eventId, status, this.eventModel);
  }
}
