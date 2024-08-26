import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const createEvent = async (
  eventRepository: IEventRepository,
  next: Next
) => {
  try {
    const result = await eventRepository.createEvent();
    if (!result) {
      return next(new ErrorHandler(401, "Creating event is failed"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};
