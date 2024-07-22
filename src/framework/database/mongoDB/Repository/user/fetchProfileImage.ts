import userModel from "../../model/userModel";
import { IS3Operations } from "../../../../service/s3Bucket";

export const fetchProfileImage = async (
  userModels: typeof userModel,
  s3 : IS3Operations,
  userId: string
) => {
  try {
    // fetching user's profileImage Name for fetch from S31bucket
    const findUser = await userModels.findById({ _id: userId });
    const imageName = findUser?.profileImage
    // here we got the IMAGE URL
    const imageUrl = await s3.getObjectUrl({ bucket : process.env.C3_BUCKET_NAME , key : imageName})
    return imageUrl
  } catch (error) {

  }
};
