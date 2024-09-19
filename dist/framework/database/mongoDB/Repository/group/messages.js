import mongoose from "mongoose";
export const messages = async (groupId, groupMessageModel, groupModel, userModels, s3Operations) => {
    try {
        console.log("keroooo");
        if (!mongoose.Types.ObjectId.isValid(groupId)) {
            throw new Error("Invalid groupId format");
        }
        // Use 'find' to fetch multiple group messages
        const groupMessages = await groupMessageModel
            .find({ groupId: new mongoose.Types.ObjectId(groupId) })
            .populate({
            path: "senderId",
            select: "_id name profileImage",
        })
            .exec();
        // Check if the array of messages is empty
        if (!groupMessages || groupMessages.length === 0) {
            return [];
        }
        // Process and return the messages with user data and media
        const messagesWithUsers = await Promise.all(groupMessages.map(async (message) => {
            let profileImageUrl = "";
            const profileImageName = message.senderId.profileImage || "";
            if (profileImageName) {
                profileImageUrl = await s3Operations.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: profileImageName,
                });
            }
            return {
                _id: message._id,
                message: message.message,
                media: message.media
                    ? await s3Operations.getObjectUrl({
                        bucket: process.env.C3_BUCKET_NAME,
                        key: message.media,
                    })
                    : null,
                sender: {
                    _id: message.senderId._id,
                    name: message.senderId?.name,
                    userProfile: profileImageUrl,
                },
                createdAt: message?.createdAt,
                readBy: message.readBy,
            };
        }));
        return messagesWithUsers;
    }
    catch (error) {
        console.error("Error fetching group messages:", error);
        throw new Error(`Failed to fetch messages: ${error.message}`);
    }
};
