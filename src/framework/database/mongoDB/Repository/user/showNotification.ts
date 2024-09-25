import userModel from "../../model/userModel.js";
import { Iuser } from "../../../../../commonEntities/entities/user.js";

export const showNotification = async (
  userId: string,
  isShowNotification: boolean,
  userModels: typeof userModel
): Promise<any> => {
  try {
    console.log("status ==>", isShowNotification);
    const updatedUser = await userModels.findByIdAndUpdate(
      userId,
      { $set: { showNotification: isShowNotification } },
      { new: true } // Ensure the new option is set to true
    );
    console.log("updatedUser ===>", updatedUser?.showNotification);
    return updatedUser?.showNotification as boolean;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
