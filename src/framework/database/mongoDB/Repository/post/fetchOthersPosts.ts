import mongoose from "mongoose";
import { IS3Operations } from "../../../../service/s3Bucket.js";
import PostModel from "../../model/postModel.js";
import userModel from "../../model/userModel.js";

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
          bucket: process.env.C3_BUCKET_NAME || "",
          key: user.profileImage,
        })
      : null;

    // Retrieving the posts with images from the S3 bucket or other types
    const postsWithImage = await Promise.all(
      userPosts.map(async (post) => {
        if (post.type === "image") {
          const postUrl = post.imageName
            ? await s3.getObjectUrl({
                bucket: process.env.C3_BUCKET_NAME || "",
                key: post.imageName,
              })
            : null;

          return {
            ...post.toObject(),
            postUrl,
            profileImageUrl,
            userName: user?.name,
          };
        } else {
          return {
            ...post.toObject(),
            profileImageUrl,
            userName: user?.name,
          };
        }
      })
    );

    console.log("Fetched posts:", postsWithImage);
    return postsWithImage;
  } catch (error) {
    console.error("Error fetching others' posts:", error);
    return undefined; // Handle error as needed
  }
};
