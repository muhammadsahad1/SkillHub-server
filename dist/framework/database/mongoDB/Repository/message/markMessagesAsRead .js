export const markMessagesAsRead = async (conversationId, userId, messageModal, conversationModel) => {
    try {
        console.log("vannnn ===>", conversationId);
        // Find the conversation and populate messages
        const conversation = await conversationModel
            .findById(conversationId)
            .populate("messages");
        if (!conversation) {
            return;
        }
        await Promise.all(conversation?.messages.map(async (message) => {
            console.log("messagesss ====>", message);
            if (message && !message.readBy.includes(userId)) {
                message.readBy.push(userId);
                await messageModal.updateOne({
                    _id: message._id,
                }, { $addToSet: { readBy: userId } });
            }
        }));
    }
    catch (error) {
        console.error("Error in markMessagesAsRead:", error);
    }
};
