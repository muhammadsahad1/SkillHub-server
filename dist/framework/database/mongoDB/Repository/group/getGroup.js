import mongoose from "mongoose";
export const getGroup = async (groupId, s3Operations, groupModel, userModels) => {
    try {
        // Fetch group information from the database
        const group = await groupModel.findById(groupId);
        if (!group) {
            throw new Error("Group not found");
        }
        // Fetch members' information
        const membersWithUserInfo = await Promise.all(group.members.map(async (memberId) => {
            // Ensure memberId is a valid ObjectId
            const memberObjectId = new mongoose.Types.ObjectId(memberId.userId);
            const user = await userModels.findById(memberObjectId);
            if (!user) {
                // Handle the case where a user is not found
                return {
                    userId: memberObjectId.toString(),
                    userName: "Unknown",
                    profileImageUrl: "default-profile-image-url", // Provide a default or placeholder image
                };
            }
            // Get the profile image URL
            const profileImageName = user.profileImage || "unknown";
            const profileImageUrl = await s3Operations.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME,
                key: profileImageName,
            });
            return {
                userId: user.id,
                userName: user.name,
                profileImageUrl,
            };
        }));
        // Get the group's image URL
        const groupImageName = group.groupImage || "unknown";
        const groupImageUrl = await s3Operations.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: groupImageName,
        });
        // Return the group data with additional information
        const groupData = group.toObject();
        groupData.groupImageUrl = groupImageUrl;
        return {
            ...groupData,
            members: membersWithUserInfo,
        };
    }
    catch (error) {
        // Log the error or handle it according to your application's requirements
        console.error("Error fetching group:", error.message);
        return undefined;
    }
};
