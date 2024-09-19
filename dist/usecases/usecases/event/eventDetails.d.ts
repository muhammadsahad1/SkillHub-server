import { IEvent } from "../../../commonEntities/entities/event";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
export declare const eventDetails: (eventId: string, s3Operations: IS3Operations, eventRepository: IEventRepository, next: Next) => Promise<IEvent | void | null>;
