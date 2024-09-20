import { ErrorHandler } from "../../middlewares/errorMiddleware.js";
export const sendMessage = async (senderId, receiverId, message, messageRepository, next) => {
    try {
        const result = await messageRepository.sendMessage(senderId, receiverId, message);
        if (!result) {
            return { success: true, result };
        }
        return { success: true, result };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
