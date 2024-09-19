import { IEvent } from "../../../commonEntities/entities/event";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
export declare const getEvent: (eventId: string, eventRepository: IEventRepository, next: Next) => Promise<IEvent | void>;
