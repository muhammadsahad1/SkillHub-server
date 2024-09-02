import { Next } from "../../../framework/types/serverPackageType"
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository"
import { ErrorHandler } from "../../middlewares/errorMiddleware";

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
