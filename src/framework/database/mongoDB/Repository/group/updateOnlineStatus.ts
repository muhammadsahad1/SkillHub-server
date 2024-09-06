import mongoose from "mongoose";
import { GroupModel } from "../../model/groupModel";
import { IMember } from "../../../../../commonEntities/entities/group";

export const updateOnlineStatus = async (
  groupId: string,
  userId: string,
  status: boolean,
  groupModel: typeof GroupModel
): Promise<{
  success: boolean;
  message: string;
  updatedMember?: IMember[];
}> => {
  try {
    console.log("ethi DB", groupId, userId, status);
    const groupID = new mongoose.Types.ObjectId(groupId);
    const userID = new mongoose.Types.ObjectId(userId);

    // Update the online status
    const updateGrp = await groupModel.findOneAndUpdate(
      {
        _id: groupID,
        "members.userId": userID,
      },
      { $set: { "members.$.isOnline": status } },
      { new: true, projection: { members: 1 } }
    );

    console.log("updated grp ==>", updateGrp);
    // Check if any document was matched and modified
    if (updateGrp.matchedCount === 0) {
      return {
        success: false,
        message: "Group not found or member not part of the group",
      };
    }

    if (updateGrp.modifiedCount === 0) {
      return {
        success: false,
        message: "Status was not changed",
      };
    }

    // Fetch the group with all members
    const groupWithMembers = await groupModel
      .findById(groupID)
      .select("members");

    console.log("grpMember ==>", groupWithMembers);
    if (!groupWithMembers) {
      return {
        success: false,
        message: "Group or members not found",
      };
    }

    // Return the updated members array
    return {
      success: true,
      message: "Group online status changed",
      updatedMember: groupWithMembers.members,
    };
  } catch (error) {
    return {
      success: false,
      message: "Change online status failed",
    };
  }
};
