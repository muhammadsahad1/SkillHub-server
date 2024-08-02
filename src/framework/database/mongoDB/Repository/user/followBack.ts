import userModel from "../../model/userModel";

export const followBack = async (
  fromFollowingId: string,
  toFollowId: string,
  userModels: typeof userModel
) => {
  try {
    console.log("from followingID ==>", fromFollowingId ,"toFollowId ==>",toFollowId)
      await userModels.findByIdAndUpdate(fromFollowingId,{ $push : {
        following : toFollowId
      }})

  } catch (error) {
    console.error("Error finding user by email:", error);
    return undefined;
  }
};
