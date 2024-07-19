import userModel from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";

export const findByEmail = async (userModels: typeof userModel,email: string): Promise<Iuser | void> => {
  try {
    let user = await userModel.findOne({ email });
    console.log("checking findbyEmila")
    if (user) {
      return user;
    } else {
      return;
    }
  } catch (error) {
    console.log(error);
  }
};
