import userModel from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";

export const resetPasswordVerify = async (
  userModels: typeof userModel,
  password: string,
  token: string
) => {
  try {

    const fetchedUser = await userModels.findOne({ resetPasswordToken: token });
    if (!fetchedUser) {
      return;
    } 
      
      const updatedUser = await userModels.findByIdAndUpdate(
        { _id: fetchedUser._id },
        {
          $set: {
            password: password,
            resetPasswordToken: ''
          },
        },
        { new: true }
      );
    
      return updatedUser
      
    
  } catch (error) {
    console.error("Error finding user by email:", error);
  }
};
