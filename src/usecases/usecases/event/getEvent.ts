import { IEvent } from "../../../commonEntities/entities/event.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const getEvent = async (
  eventId : string,
  eventRepository : IEventRepository,
  next : Next
):Promise<IEvent | void> => {
  try {
    const result = await eventRepository.getEvent(eventId)
    if(!result){
      return next(new ErrorHandler(401,"Event not found"))
    }
    return result
  } catch (error) {
    return next(new ErrorHandler(500,"Internal server error"))
  }
}