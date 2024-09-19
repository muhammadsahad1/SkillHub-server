import userModel from "../../model/userModel.js";

export const getOthersFollowings = async (
  userId: string,
  userModels: typeof userModel
) => {
  try {
    
    const user = await userModels.findById(userId);
    // Check if user exists
    if (!user) {
      throw new Error("User not found");
    }
    console.log("Followings ===>", user.following);
    return user.following;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
