import {
  ICreateEvent,
  IEvent,
} from "../../../../commonEntities/entities/event";
import { IEventRegister } from "../../../../commonEntities/entities/eventRegister";
import { IEventRepository } from "../../../../usecases/interface/repositoryInterface/eventRepository";

import { IS3Operations } from "../../../service/s3Bucket";
import { IStripeService } from "../../../service/stripService";
import EventModel from "../model/eventModel";
import { EventPaymentModel } from "../model/eventPaymentModel";
import userModel from "../model/userModel";
import {
  changeStatus,
  createOrUpdateEvent,
  eventDetails,
  eventRegister,
  getEvent,
  getEvents,
} from "./event/index";

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
