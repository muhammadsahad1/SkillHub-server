import mongoose from "mongoose";
import userModel from "../../model/userModel.js";
import { IS3Operations } from "../../../../service/s3Bucket.js";
import { Iuser } from "../../../../../commonEntities/entities/user.js";

export const getMyFollowing = async (
  userId : string,
  userModels : typeof userModel,
  s3 : IS3Operations
): Promise<Iuser[] | undefined> => {
  try {

    const user = await userModels.findById(userId).lean()
    const folllowings = user?.following as mongoose.Types.ObjectId[]

    const followings = folllowings.filter(id => mongoose.Types.ObjectId.isValid(id));

    const followingsUsers = await userModels.find({_id : {$in : followings}})

    return followingsUsers
    
    
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; 
  }
}