import { Iuser } from "../../../../../commonEntities/entities/user";
import userModel from '../../model/userModel'

export const getUser = async(
  userModels : typeof userModel,
  userId : string
): Promise<Iuser | any> => {
  try {
    const user = await userModels.findById({_id : userId})
    console.log("getUser ===>", user)
    return user
  } catch (error) {
    
  }
}