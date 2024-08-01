import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";

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
  
    return skillRelatedUsers;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
