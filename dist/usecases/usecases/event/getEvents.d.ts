import { IEvent } from "../../../commonEntities/entities/event";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
export declare const getEvents: (pogeNumber: number, next: Next, eventRepository: IEventRepository, s3Operations: IS3Operations) => Promise<IEvent[] | void>;
