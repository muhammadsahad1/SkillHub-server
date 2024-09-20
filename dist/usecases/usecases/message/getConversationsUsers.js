import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const getConversationsUsers = async (userId, messageRepository, s3, next) => {
    try {
        const result = await messageRepository.getConversationsUsers(userId, s3);
        if (!result) {
            return next(new ErrorHandler(401, "Getting the messages failed"));
        }
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
