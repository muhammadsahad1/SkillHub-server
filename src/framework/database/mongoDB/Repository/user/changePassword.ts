import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";

export const changePassword = async (
  userModels: typeof userModel,
  userId: string,
  password: string
): Promise<Iuser | null | void> => {
  try {
    console.log("updting ");
    const updateUser = await userModels.findOneAndUpdate(
      { _id: userId },
      {
        $set: {
          password: password,
        },
      }
    );

    return updateUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
