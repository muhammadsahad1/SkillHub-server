import { Iuser } from "../../../../../commonEntities/entities/user.js";
import userModel from "../../model/userModel.js";

export const getUsers = async (userModels: typeof userModel) => {
  try {
    const users = await userModels.find({ role: { $ne: "admin" } }).sort({ createdAt : -1})
    return users as Iuser[];
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
