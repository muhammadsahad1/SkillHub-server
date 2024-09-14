export const markAsRead = async (conversationId, userId, messageRepository, next) => {
    try {
        console.log("conversationId ===>", conversationId);
        console.log("userId ===>", userId);
        await messageRepository.markAsRead(conversationId, userId);
    }
    catch (error) {
        console.log("error in markAsRead ", error);
    }
};
