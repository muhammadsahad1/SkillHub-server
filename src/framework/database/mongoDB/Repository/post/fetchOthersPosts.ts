import mongoose from "mongoose";
import { IS3Operations } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";

export const fetchOthersPosts = async (
  userId: string,
  s3: IS3Operations,
  postModels: typeof PostModel,
  userModels: typeof userModel
) => {
  try {
    const userID = new mongoose.Types.ObjectId(userId);
    const userPosts = await postModels.find({ userId: userID });
    const user = await userModels.findById(userId);

    const profileImageUrl = user?.profileImage
      ? await s3.getObjectUrl({
          bucket: process.env.C3_BUCKET_NAME,
          key: user.profileImage,
        })
      : null;
      

    const postsWithImage = await Promise.all(
      userPosts.map(async (post) => {
        const imageName = post.imageName;
        const postUrl = await s3.getObjectUrl({
          bucket: process.env.C3_BUCKET_NAME,
          key: imageName,
        });

        return {
          ...post.toObject(),
          postUrl: postUrl,
          profileImageUrl : profileImageUrl,
          userName : user?.name
        };
      })
    );

    return postsWithImage;
  } catch (error) {
    console.error("Error fetching the others posts:", error);
    return undefined; // Handle error as needed
  }
};
