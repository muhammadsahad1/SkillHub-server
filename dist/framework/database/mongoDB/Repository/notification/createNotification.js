import mongoose from "mongoose";
const isValidObjectId = (id) => mongoose.Types.ObjectId.isValid(id) && /^[0-9a-fA-F]{24}$/.test(id);
export const createNotification = async (senderId, receiverId, message, type, link, notificationModel) => {
    try {
        // Validate ObjectId
        if (!isValidObjectId(senderId) || !isValidObjectId(receiverId)) {
            throw new Error('Invalid ObjectId format');
        }
        const senderObjId = new mongoose.Types.ObjectId(senderId);
        const receiverObjId = new mongoose.Types.ObjectId(receiverId);
        const newNotification = {
            senderId: senderObjId,
            receiverId: receiverObjId,
            message,
            type,
            link,
            read: false,
        };
        console.log("newNoti==>", newNotification);
        const notification = await notificationModel.create(newNotification);
        const result = await notification.save();
        return result;
    }
    catch (error) {
        console.error("Error in createNotification:", error);
        return undefined;
    }
};
