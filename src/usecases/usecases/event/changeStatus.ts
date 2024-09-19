import { Next } from "../../../framework/types/serverPackageType.js"
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository.js"
import { ErrorHandler } from "../../middlewares/errorMiddleware.js";

export const changeStatus = async (
  eventId : string,
  status : string,
  eventRepository : IEventRepository,
  next : Next
) => {
try {
  const result = await eventRepository.changeStatus(eventId,status)
  if (!result) {
    return next(new ErrorHandler(401, "event change status failed"));
  }
  return result;
} catch (error) {
  return next(new ErrorHandler(500, "Internal Server Error"));
}
}
