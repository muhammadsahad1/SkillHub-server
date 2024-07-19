import userModel from "../../model/userModel";
import { Iuser } from "../../../../../entities/user";

export const findByEmailUpdatePicture = async (
  userModels: typeof userModel,
  email: string,
  picture: string
): Promise<Iuser | void | any> => {
  try {
    console.log("Updating user with email:", email);
    console.log("New picture URL:", picture);
    const updatedUser = await userModels.findOneAndUpdate(
      { email: email },
      {
        $set: {
          picture: picture,
        },
      },
      { new: true }
    );
    console.log("google kazhinj updated",updatedUser)
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; 
  }
  
};
