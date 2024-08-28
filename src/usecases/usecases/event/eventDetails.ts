import { IEvent } from "../../../commonEntities/entities/event";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const eventDetails = async (
  eventId : string,
  s3Operations : IS3Operations,
  eventRepository : IEventRepository,
  next :Next
):Promise<IEvent | void | null> => {
  try {
    const result = await eventRepository.eventDetails(eventId,s3Operations)
    if(!result){
      return next(new ErrorHandler(401,"Events Details failed to fetch"))
    }
    return result 
  } catch (error) {
    return next(new ErrorHandler(401,"Events Details failed to fetch"))
  }
}