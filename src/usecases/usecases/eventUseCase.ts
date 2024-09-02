import { ICreateEvent, IEvent } from "../../commonEntities/entities/event";
import { IEventRegister } from "../../commonEntities/entities/eventRegister";
import { IS3Operations } from "../../framework/service/s3Bucket";
import { Next } from "../../framework/types/serverPackageType";
import { IEventRepository } from "../../usecases/interface/repositoryInterface/eventRepository";
import { IEventUseCase } from "../interface/usecase/eventUseCase";
import {
  changeStatus,
  createEvent,
  eventDetails,
  eventRegister,
  getEvent,
  getEvents,
  getJoinLink,
  makePayment,
} from "../usecases/event/index";
import { IStripeService } from "../../framework/service/stripService";
import Stripe from "stripe";

export class EventUseCase implements IEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private s3Operations: IS3Operations,
    private stripService: IStripeService
  ) {}

  async createEvent(
    userId: string,
    data: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string; joinLink: string } | void> {
    return await createEvent(
      userId,
      data,
      bannerFile,
      this.eventRepository,
      this.s3Operations,
      next
    );
  }

  async getEvents(next: Next): Promise<IEvent[] | void> {
    return await getEvents(next, this.eventRepository, this.s3Operations);
  }

  async eventDetails(
    eventId: string,
    next: Next
  ): Promise<IEvent | void | null> {
    return await eventDetails(
      eventId,
      this.s3Operations,
      this.eventRepository,
      next
    );
  }

  async eventRegister(
    eventRegisterData: IEventRegister,
    next: Next
  ): Promise<{
    success: boolean;
    message: string;
    joinToken?: string;
    paymentUrl?: string;
  } | void> {
    return await eventRegister(
      this.stripService,
      eventRegisterData,
      this.eventRepository,
      next
    );
  }

  async getEvent(eventId: string, next: Next): Promise<IEvent | void> {
    return await getEvent(eventId, this.eventRepository, next);
  }

  async makePayment(eventPrice: string, eventId :string,userId : string,next: Next): Promise<string | void> {
    return await makePayment(this.stripService,eventPrice,eventId,userId,next)
  }

  async changeStatus(eventId : string,status: string, next: Next): Promise<{ success: boolean; } | void> {
    return await changeStatus(eventId,status,this.eventRepository,next)
  }


}
