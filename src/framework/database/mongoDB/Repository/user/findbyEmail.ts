import userModel from "../../model/userModel";
import { Iuser } from "../../../../../commonEntities/entities/user";

export const findByEmail = async (userModels: typeof userModel, email: string): Promise<Iuser | void> => {
  try {
  
    const user = await userModels.findOne({ email : email });

    if (user) {
      return user;
    } else {
      return;
    }
  } catch (error) {
    console.error("Error finding user by email:", error);
    return undefined;
  }
};
