import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getGroup = async (groupId, groupRepository, next) => {
    try {
        const result = await groupRepository.getGroup(groupId);
        if (!result) {
            return next(new ErrorHandler(401, "fetch group were failed"));
        }
        console.log("res ==>", result);
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal server error"));
    }
};
