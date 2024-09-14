import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const makePayment = async (stripService, eventPrice, eventId, userId, next) => {
    try {
        const price = Number(eventPrice);
        const sessionId = await stripService.createCheckoutSession(price, eventId, userId);
        if (!sessionId) {
            return next(new ErrorHandler(401, "stripservice didnt return sessionId "));
        }
        return sessionId;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error"));
    }
};
