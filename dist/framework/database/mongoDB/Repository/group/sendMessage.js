import mongoose from "mongoose";
export const sendMessage = async (senderId, groupId, message, groupMessageModel) => {
    try {
        const senderID = new mongoose.Types.ObjectId(senderId);
        const groupID = new mongoose.Types.ObjectId(groupId);
        await groupMessageModel.create({
            groupId: groupID,
            senderId: senderID,
            message,
        });
        return {
            success: true,
            message: "Send Message",
        };
    }
    catch (error) {
        return {
            success: false,
            message: "falied to update the send message",
        };
    }
};
