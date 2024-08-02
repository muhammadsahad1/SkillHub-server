import mongoose from "mongoose";
import userModel from "../../model/userModel";

export const myFollowers = async (
  userId: string,
  userModels: typeof userModel
) => {
  try {
    const user = await userModels.findById(userId).lean();

    const followers = user?.followers.filter((id) =>
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
