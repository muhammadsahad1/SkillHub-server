import { Iuser } from "../../../../../commonEntities/entities/user.js";
import userModel from "../../model/userModel.js";

export const createUser = async (
  newUser: Iuser,
  userModels: typeof userModel
): Promise<Iuser | void> => {
  try {
    const user = await userModels.create(newUser);

    return user;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
