import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const updateOnlineStatus = async (groupId, userId, status, groupRepository, next) => {
    try {
        console.log("ethi");
        const result = await groupRepository.updateOnlineStatus(groupId, userId, status);
        if (!result) {
            return next(new ErrorHandler(401, "update online status failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error"));
    }
};
