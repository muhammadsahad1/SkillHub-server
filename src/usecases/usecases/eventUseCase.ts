import { ICreateEvent, IEvent } from "../../commonEntities/entities/event";
import { IS3Operations } from "../../framework/service/s3Bucket";
import { Next } from "../../framework/types/serverPackageType";
import { IEventRepository } from "../../usecases/interface/repositoryInterface/eventRepository";
import { IEventUseCase } from "../interface/usecase/eventUseCase";
import { createEvent, getEvents } from "../usecases/event/index";

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
}
