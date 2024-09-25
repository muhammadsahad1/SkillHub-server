import { Iuser } from "../../../../../commonEntities/entities/user.js";
import userModel from "../../model/userModel.js";

export const getUserDetails = async (
  userId: string,
  userModels: typeof userModel
): Promise<Iuser | any> => {
  try {
    const users = await userModels
      .findById(userId).lean()
    // Populate following
  
    console.log("users ===>", users);
    if (!users) {
      return;
    }
    return users as Iuser;
  } catch (error) {}
};
