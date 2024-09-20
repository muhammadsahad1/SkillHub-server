import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const eventRegister = async (stripService, eventRegisterData, eventRepository, next) => {
    try {
        const result = await eventRepository.eventRegister(stripService, eventRegisterData);
        if (!result) {
            return next(new ErrorHandler(401, "eventRegisteration failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error "));
    }
};
