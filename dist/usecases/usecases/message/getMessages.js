import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const getChat = async (userToChatId, senderId, s3, messageRepository, next) => {
    try {
        const result = await messageRepository.getChat(userToChatId, senderId, s3);
        if (!result) {
            return next(new ErrorHandler(401, "Getting the messages failed"));
        }
        console.log("result ===>", result);
        return result;
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
