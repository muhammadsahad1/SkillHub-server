import { ICreateEvent, IEvent } from "../../../commonEntities/entities/event";
import { Next } from "../../../framework/types/serverPackageType";

export interface IEventUseCase {
  createEvent(
    userId: string,
    eventDate: ICreateEvent,
    bannerFile: Express.Multer.File | undefined,
    next: Next
  ): Promise<{ success: boolean; message: string } | void>;

  // ============================================================

  getEvents(next: Next): Promise<IEvent[] | void>;
}
