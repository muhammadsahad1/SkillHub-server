import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getEvent = async (eventId, eventRepository, next) => {
    try {
        const result = await eventRepository.getEvent(eventId);
        if (!result) {
            return next(new ErrorHandler(401, "Event not found"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error"));
    }
};
