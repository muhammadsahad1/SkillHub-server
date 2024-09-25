import { IEvent } from "../../../../../commonEntities/entities/event.js";
import EventModel from "../../model/eventModel.js";

export const getEvent = async (
  eventId: string,
  eventModel: typeof EventModel,
): Promise<IEvent | null | void> => {
  try {
    const event = await eventModel.findById(eventId);
    return event || null;
  } catch (error: any) {
    console.log(error);
  }
}
