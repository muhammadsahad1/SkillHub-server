import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const messages = async (groupId, groupRepository, next) => {
    try {
        const result = await groupRepository.messages(groupId);
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
