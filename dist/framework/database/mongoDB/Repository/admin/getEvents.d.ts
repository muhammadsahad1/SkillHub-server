import { IEvent } from "../../../../../commonEntities/entities/event";
import EventModel from "../../model/eventModel";
import userModel from "../../model/userModel";
export declare const getEvents: (eventModel: typeof EventModel, userModels: typeof userModel) => Promise<IEvent[] | void>;
