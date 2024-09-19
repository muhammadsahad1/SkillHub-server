import ConversationModel from "../../model/conversation";
export const sendImage = async (senderId, receiverId, file, s3Operations, messageModel, conversationModal) => {
    try {
        console.log("its come in repo ");
        let conversation = await ConversationModel.findOne({
            participants: { $all: [senderId, receiverId] }
        });
        if (!conversation) {
            conversation = await conversationModal.create({
                participants: [senderId, receiverId], lastMessage: null
            });
        }
        let imageName = '';
        if (file) {
            const buffer = file.buffer;
            const mimetype = file.mimetype;
            const originalname = file.originalname;
            const putObjectUrl = {
                originalname,
                buffer,
                mimetype
            };
            imageName = await s3Operations.putObjectUrl(putObjectUrl);
        }
        const newMessage = new messageModel({
            senderId,
            receiverId,
            message: "",
            media: imageName,
        });
        console.log("newMessage ==>", newMessage);
        if (newMessage) {
            console.log("newMessage =222=>", newMessage);
            const status = await newMessage.save();
            console.log("status ==>", status);
            conversation.messages.push(newMessage._id);
            await conversation.save();
            console.log("newMessage ==>", newMessage);
            return {
                success: true
            };
        }
    }
    catch (error) {
        console.error("Error in sendImage:", error);
        return undefined;
    }
};
