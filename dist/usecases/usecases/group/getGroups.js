import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const getGroups = async (next, groupRepository) => {
    try {
        const result = await groupRepository.getGroups();
        if (!result) {
            return next(new ErrorHandler(401, "Get groups failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error"));
    }
};
