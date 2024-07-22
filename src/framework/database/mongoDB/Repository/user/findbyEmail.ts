import userModel from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";

export const findByEmail = async (userModels: typeof userModel, email: string): Promise<Iuser | void> => {
  try {
    console.log("finding", email);
    const user = await userModels.findOne({ email : email });
    console.log("checking findByEmail");
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
