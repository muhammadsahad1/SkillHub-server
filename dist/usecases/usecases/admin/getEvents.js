import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getEvents = async (next, adminRepository) => {
    try {
        const result = await adminRepository.getEvents();
        if (!result) {
            return next(new ErrorHandler(401, "failed to fetch the events request"));
        }
        return result;
    }
    catch (error) { }
};
