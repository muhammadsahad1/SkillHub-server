import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const sendMessage = async (senderId, groupId, message, groupRepository, next) => {
    try {
        const result = await groupRepository.sendMessage(senderId, groupId, message);
        if (!result) {
            return next(new ErrorHandler(401, "send message is failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(401, "Internal server error "));
    }
};
