// here while user sending message that time conversation is creating
export const sendMessage = async (senderId, receiverId, message, messageModel, conversationModel) => {
    try {
        let conversation = await conversationModel.findOne({
            participants: { $all: [senderId, receiverId] },
        });
        // creating conversation if the converstion not exists
        if (!conversation) {
            conversation = await conversationModel.create({
                participants: [senderId, receiverId], lastMessage: null
            });
        }
        const newMessage = new messageModel({
            senderId,
            receiverId,
            message,
            media: "",
        });
        console.log("neww=>", newMessage);
        if (newMessage) {
            await newMessage.save();
            conversation.messages.push(newMessage._id);
            conversation.lastMessage = newMessage._id;
            await conversation.save();
            return newMessage;
        }
    }
    catch (error) {
        console.error("Error in create conversation:", error);
        return undefined;
    }
};
