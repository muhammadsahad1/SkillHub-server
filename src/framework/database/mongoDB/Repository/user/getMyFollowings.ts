import mongoose from "mongoose";
import userModel from "../../model/userModel";
import { IS3Operations } from "../../../../service/s3Bucket";

export const getMyFollowing = async (
  userId : string,
  userModels : typeof userModel,
  s3 : IS3Operations
) => {
  try {

    const user = await userModels.findById(userId).lean()

    if(!user){
      return "user is not found"
    }

    const followings = user?.following.filter(id => mongoose.Types.ObjectId.isValid(id));

    const followingsUsers = await userModels.find({_id : {$in : followings}})

    return followingsUsers
    
    
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; 
  }
}