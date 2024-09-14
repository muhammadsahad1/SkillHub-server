import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getEvents = async (pogeNumber, next, eventRepository, s3Operations) => {
    try {
        const result = await eventRepository.getEvents(pogeNumber, s3Operations);
        if (!result) {
            return next(new ErrorHandler(401, "failed to fetch the events"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error"));
    }
};
