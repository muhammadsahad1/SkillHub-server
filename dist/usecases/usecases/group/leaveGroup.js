import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const leaveGroup = async (groupId, userId, groupRepository, next) => {
    try {
        const result = await groupRepository.leaveGroup(groupId, userId);
        if (!result) {
            return next(new ErrorHandler(401, "Failed to leave the group"));
        }
        console.log("res ==>", result);
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(401, "Internal server error"));
    }
};
