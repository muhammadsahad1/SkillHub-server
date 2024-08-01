import userModel from "../../model/userModel";

export const unFollow = async (
  toUnFollowId: string,
  fromFollowerId: string,
  userModels: typeof userModel
) => {
  try {
    // remove the userId from following list to toUnFollowUser
    if (toUnFollowId && fromFollowerId) {
      // remove the userId from following of following user
      await userModels.findByIdAndUpdate(fromFollowerId, {
        $pull: { following: toUnFollowId },
      });
  
        // removing the userId from followers of followed user
        await userModels.findByIdAndUpdate(toUnFollowId, {
          $pull: { followers: fromFollowerId },
        });

      
    }
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
