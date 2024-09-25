import { IS3Operations } from "../../../../service/s3Bucket.js";
import userModel from "../../model/userModel.js";

// Define the type for userModel to ensure type safety
type UserModelType = typeof userModel;

// Define the function to fetch followers
export const getOthersFollowers = async (
  userId: string,
  userModel: UserModelType
) => {
  try {
    const user = await userModel.findById(userId);

    // Check if user exists
    if (!user) {
      throw new Error("User not found");
    }

    const followers = user.followers;
    await userModel.find();

    return followers;
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw new Error("Unable to fetch followers");
  }
};
