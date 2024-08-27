import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const getEvents = async (
  next : Next,
  eventRepository : IEventRepository,
  s3Operations: IS3Operations
) => {
  try {
  const result = await eventRepository.getEvents(s3Operations)
  if(!result){
    return next(new ErrorHandler(401,"failed to fetch the events"))
  }
  return result 

  } catch (error) {
    return next(new ErrorHandler(500,"Internal server error"))
  }
}