import userModel from "../../model/userModel.js";
import mongoose from "mongoose";

export const followUp = async (
  toFollowingId: string,
  fromFollowerId: string,
  userModels: typeof userModel
) => {
  try {

    if (toFollowingId && fromFollowerId) {
      const toFollowingObjectId = new mongoose.Types.ObjectId(toFollowingId);
      const fromFollowerObjectId = new mongoose.Types.ObjectId(fromFollowerId);
      await userModels.findByIdAndUpdate(
        { _id: toFollowingObjectId },
        {
          $addToSet: { followers: fromFollowerId },
        }
      );

      await userModels.findOneAndUpdate(
        { _id: fromFollowerObjectId },
        {
          $addToSet: { following: toFollowingId },
        }
      );
      
    } else {
      console.log("one of the id is not valid");
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
