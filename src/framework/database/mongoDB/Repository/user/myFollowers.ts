import mongoose from "mongoose";
import userModel from "../../model/userModel.js";

export const myFollowers = async (
  userId: string,
  userModels: typeof userModel
) => {
  try {
    const user = await userModels.findById(userId).lean();
    const followersArray = user?.followers as mongoose.Types.ObjectId[];
    const followers = followersArray.filter((id) =>
      mongoose.Types.ObjectId.isValid(id)
    );
    const followersUsers = await userModels.find({ _id: { $in: followers } });

    // returning followerUsers and followingback userId
    return {
      followersUsers,
      following: user?.following,
    };
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
