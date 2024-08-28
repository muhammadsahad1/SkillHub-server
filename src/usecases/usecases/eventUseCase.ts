import { ICreateEvent, IEvent } from "../../commonEntities/entities/event";
import { IEventRegister } from "../../commonEntities/entities/eventRegister";
import { IS3Operations } from "../../framework/service/s3Bucket";
import { Next } from "../../framework/types/serverPackageType";
import { IEventRepository } from "../../usecases/interface/repositoryInterface/eventRepository";
import { IEventUseCase } from "../interface/usecase/eventUseCase";
import { createEvent, eventDetails, eventRegister, getEvents } from "../usecases/event/index";

export class EventUseCase implements IEventUseCase {
  constructor(
    private eventRepository: IEventRepository,
    private s3Operations: IS3Operations
  ) {}

  async createEvent(
    userId: string,
    data: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string } | void> {
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
    return await getEvents(next,this.eventRepository,this.s3Operations)
  }

  async eventDetails(eventId : string , next : Next) :Promise<IEvent | void | null> {
    return await eventDetails(eventId,this.s3Operations,this.eventRepository,next)
  }

  async eventRegister(eventRegisterData : IEventRegister,next : Next) : Promise<IEvent | void | null> {
    return await eventRegister(eventRegisterData,this.eventRepository,next)
  }
}
