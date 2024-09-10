import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";

export const createUser = async (
  newUser: Iuser,
  userModels: typeof userModel
): Promise<Iuser | void> => {
  try {
    const user = await userModels.create(newUser);
    console.log("user create avoo ....");
    return user;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
