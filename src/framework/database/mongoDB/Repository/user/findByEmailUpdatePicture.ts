import userModel from "../../model/userModel.js";
import { Iuser } from "../../../../../commonEntities/entities/user.js";

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
    return updatedUser;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; 
  }
  
};
