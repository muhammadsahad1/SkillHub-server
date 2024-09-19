import mongoose from "mongoose";
import { GroupModel } from "../../model/groupModel";

export const joinGroup = async (
  groupId: string,
  joinUserId: string,
  groupModel: typeof GroupModel
): Promise<{ success: boolean; message: string }> => {
  try {
    const group = await groupModel.findById(groupId);
    const userId = new mongoose.Types.ObjectId(joinUserId);

    if (group) {
      const isMember = group.members.some((member: any) =>
        member.userId.equals(userId));

      if (!isMember) {
        await group.updateOne({ $push: { members: { userId: userId } } });
        return {
          success: true,
          message: "Joined group successfully",
        };
      } else {
        return {
          success: false,
          message: "User is already a member of the group",
        };
      }
    } else {
      return {
        success: false,
        message: "Group not found",
      };
    }
  } catch (error) {
    console.error("Error joining group:", error);
    return {
      success: false,
      message: "Failed to join group",
    };
  }
};
