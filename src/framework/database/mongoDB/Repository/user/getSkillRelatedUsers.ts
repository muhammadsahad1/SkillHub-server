import userModel from "../../model/userModel.js";

export const getSkillRelatedUsers = async (
  userId: string,
  skill: string,
  userModels: typeof userModel
) => {
  try {
    
    const skillRelatedUsers = await userModels.find({
      _id: { $ne: userId },
      skill,
    });
    console.log("skillRelatedusers ===========>",skillRelatedUsers);
    
    return skillRelatedUsers;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
