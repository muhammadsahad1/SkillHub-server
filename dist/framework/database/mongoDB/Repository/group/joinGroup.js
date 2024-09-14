import mongoose from "mongoose";
export const joinGroup = async (groupId, joinUserId, groupModel) => {
    try {
        console.log("grId ==>", groupId, "usreId ==>", joinUserId);
        const group = await groupModel.findById(groupId);
        const userId = new mongoose.Types.ObjectId(joinUserId);
        console.log("G==>", group);
        if (group) {
            const isMember = group.members.some((member) => member.userId.equals(userId));
            console.log("isMember ==>", isMember);
            if (!isMember) {
                await group.updateOne({ $push: { members: { userId: userId } } });
                return {
                    success: true,
                    message: "Joined group successfully",
                };
            }
            else {
                return {
                    success: false,
                    message: "User is already a member of the group",
                };
            }
        }
        else {
            return {
                success: false,
                message: "Group not found",
            };
        }
    }
    catch (error) {
        console.error("Error joining group:", error);
        return {
            success: false,
            message: "Failed to join group",
        };
    }
};
