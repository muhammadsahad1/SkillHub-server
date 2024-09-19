import { IEvent } from "../../../../../commonEntities/entities/event";
import EventModel from "../../model/eventModel";
export declare const getEvent: (eventId: string, eventModel: typeof EventModel) => Promise<IEvent | null | void>;
