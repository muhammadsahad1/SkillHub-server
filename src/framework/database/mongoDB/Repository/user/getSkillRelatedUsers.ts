import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";

export const getSkillRelatedUsers = async (
  skill : string ,
  userModels : typeof userModel
) => {
  try {
    console.log("DB intratce vann")
    const skillRelatedUsers = await userModels.find({skill})

    
    return skillRelatedUsers
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; 
  }
}