import { ICreateEvent } from "../../../commonEntities/entities/event";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IEventRepository } from "../../interface/repositoryInterface/eventRepository";
import { ErrorHandler } from "../../middlewares/errorMiddleware";

export const createEvent = async (
  userId: string,
  data: ICreateEvent,
  bannerFile: Express.Multer.File | undefined,
  eventRepository: IEventRepository,
  s3Operations: IS3Operations,
  next: Next
): Promise<{ success: boolean; message: string } | void> => {
  try {
    const result = await eventRepository.createEvent(
      userId,
      data,
      bannerFile,
      s3Operations
    );
    if (!result) {
      return next(new ErrorHandler(401, "Creating event is failed"));
    }
    return result;
  } catch (error) {
    return next(new ErrorHandler(500, "Internal Server Error"));
  }
};