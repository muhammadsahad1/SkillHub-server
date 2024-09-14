import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const eventDetails = async (eventId, s3Operations, eventRepository, next) => {
    try {
        const result = await eventRepository.eventDetails(eventId, s3Operations);
        if (!result) {
            return next(new ErrorHandler(401, "Events Details failed to fetch"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(401, "Events Details failed to fetch"));
    }
};
