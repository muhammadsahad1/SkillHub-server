import { IEvent } from "../../../commonEntities/entities/event.js";
import { IS3Operations } from "../../../framework/service/s3Bucket.js";
import { Next } from "../../../framework/types/serverPackageType.js";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository.js";
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const getEvents = async (
  pogeNumber : number,
  next: Next,
  eventRepository: IEventRepository,
  s3Operations: IS3Operations
): Promise<IEvent[] | void> => {
  try {

    const result = await eventRepository.getEvents(pogeNumber,s3Operations);
    if (!result) {
      return next(new ErrorHandler(401, "failed to fetch the events"));
    }
    return result;  
  } catch (error) {
    return next(new ErrorHandler(500, "Internal server error"));
  }
};
