import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";

export const getUsers = async (userModels: typeof userModel) => {
  try {
    const users = await userModels.find({ role: { $ne: "admin" } });
    return users as Iuser[];
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
