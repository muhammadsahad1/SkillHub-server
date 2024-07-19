import { Iuser } from "../../../../../entities/user";
import userModel from "../../model/userModel";

export const createUser = async ( newUser : Iuser ,userModels: typeof userModel) :Promise<Iuser | undefined> => {
  try {
      const user = await userModel.create(newUser)
      console.log("user create avoo ....")
      return user
  } catch (error) {
    console.log(error)
  }
}