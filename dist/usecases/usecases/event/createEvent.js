import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const createEvent = async (userId, data, bannerFile, eventRepository, s3Operations, next) => {
    try {
        const result = await eventRepository.createEvent(userId, data, bannerFile, s3Operations);
        if (!result) {
            return next(new ErrorHandler(401, "Creating event is failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
