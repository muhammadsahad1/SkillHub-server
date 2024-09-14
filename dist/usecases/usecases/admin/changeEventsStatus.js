import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const changeEventsStatus = async (requestId, action, adminRepository, next) => {
    try {
        const result = await adminRepository.changeEventStatus(requestId, action);
        if (!result) {
            return next(new ErrorHandler(401, "Change event status failed"));
        }
        return result;
    }
    catch (error) { }
};
