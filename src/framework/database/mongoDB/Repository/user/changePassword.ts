import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from "../../model/userModel";

export const changePassword = async (
  userModels : typeof userModel,
  userId : string,
  password : string,
) => {
  try {
    console.log("updting ")
    const updateUser = await userModels.findOneAndUpdate({_id : userId},{
      $set : {
        password : password
      }
    })

    console.log("updated USer",updateUser)
    return updateUser
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
}