import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const joinGroup = async (groupId, joinUserId, groupRepository, next) => {
    try {
        const result = await groupRepository.joinGroup(groupId, joinUserId);
        if (!result) {
            return next(new ErrorHandler(401, "join group failed"));
        }
        console.log("res ==>", result);
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(401, "Internal server error"));
    }
};
