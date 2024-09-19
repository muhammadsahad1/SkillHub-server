export const getChat = async (userToChatId, senderId, userModels, s3, conversationModel) => {
    try {
        console.log("userTOchjat ==>", userToChatId);
        const conversation = await conversationModel
            .findOne({
            participants: { $all: [senderId, userToChatId] },
        })
            .populate("messages");
        if (!conversation || !conversation.messages) {
            const user = await userModels
                .findById(userToChatId)
                .select("_id name email profileImage");
            let profileImageUrl = "";
            if (user?.profileImage) {
                profileImageUrl = await s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: user?.profileImage,
                });
            }
            const userWithProfileImage = {
                ...user?.toObject(),
                profileImageUrl: profileImageUrl,
            };
            const result = {
                messages: [],
                userWithProfileImage,
            };
            return result;
        }
        const messageWithAllData = await Promise.all(conversation?.messages.map(async (msg) => {
            const media = msg?.media;
            if (media) {
                const mediaImgUrl = await s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: media
                });
                return {
                    ...msg.toObject(),
                    mediaUrl: mediaImgUrl
                };
            }
            return msg.toObject();
        }));
        const user = await userModels
            .findById(userToChatId)
            .select("_id name email profileImage");
        let profileImageUrl = "";
        if (user?.profileImage) {
            profileImageUrl = await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: user?.profileImage,
            });
        }
        const userWithProfileImage = {
            ...user?.toObject(),
            profileImageUrl: profileImageUrl,
        };
        const result = {
            messages: messageWithAllData,
            userWithProfileImage,
        };
        console.log("result ==>", result);
        return result;
    }
    catch (error) {
        console.error("Error in create conversation:", error);
        return undefined;
    }
};
