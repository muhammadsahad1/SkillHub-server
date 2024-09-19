import { IEvent } from "../../../../../commonEntities/entities/event";
import { IS3Operations } from "../../../../service/s3Bucket";
import EventModel from "../../model/eventModel";
export declare const eventDetails: (eventId: string, eventModel: typeof EventModel, s3Operations: IS3Operations) => Promise<IEvent | void | null>;
