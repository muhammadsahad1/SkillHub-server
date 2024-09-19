import { IEvent } from "../../../../../commonEntities/entities/event";
import { IS3Operations } from "../../../../service/s3Bucket";
import EventModel from "../../model/eventModel";
export declare const getEvents: (pageNumber: number, eventModel: typeof EventModel, s3: IS3Operations) => Promise<IEvent[]>;
