import userModel from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";

// updating user for attaching resetToken
export const findUpdateResetToken = async (
  userModels: typeof userModel,
  email: string,
  resetToken: string
): Promise<Iuser | any> => {
  try {
    const userAttachResetLink = await userModels.findOneAndUpdate(
      { email: email },
      { $set: { resetPasswordToken: resetToken } },
      { new : true }
    );
    
    return userAttachResetLink
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
