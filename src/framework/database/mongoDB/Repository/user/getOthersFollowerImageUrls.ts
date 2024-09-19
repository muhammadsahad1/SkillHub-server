import { IS3Operations } from "../../../../service/s3Bucket.js";
import userModel from "../../model/userModel.js";
import mongoose from "mongoose";

export const getOthersFollowersImageUrls = async (
  followers: any[] = [],
  myUserId: string,
  userModels: typeof userModel,
  s3: IS3Operations
) => {
  try {
    const myUser = await userModels.findById(myUserId);
    if (!myUser) {
      throw new Error("Current user not found");
    }

    const followingIds = myUser.following?.map((id) => id.toString()) || [];

    const followersWithImages = await Promise.all(
      followers.map(async (followerId) => {
        const user = await userModels.findById(followerId);

        if (!user) {
          return null;
        }

        const { _id, name, skill, country, profileImage, coverImage } = user;

        let imageUrl = "";
        let coverImageUrl = "";

        if (profileImage) {
          imageUrl = await s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: profileImage,
          });
        }

        if (coverImage) {
          coverImageUrl = await s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: coverImage as string,
          });
        }

        const isFollowing = followingIds.includes(_id.toString());

        const isFollowingBack = user.followers?.some((id: any) => {
          if (id instanceof mongoose.Types.ObjectId) {
            return id.equals(new mongoose.Types.ObjectId(myUserId));
          }
          return id.toString() === myUserId;
        });

        let relationship = "none";
        if (isFollowing && isFollowingBack) {
          relationship = "mutual";
        } else if (isFollowing) {
          relationship = "following";
        } else if (isFollowingBack) {
          relationship = "followed by";
        }

        return {
          _id,
          name,
          skill,
          country,
          imageUrl,
          coverImageUrl,
          isFollowing,
          isFollowingBack,
          relationship,
        };
      })
    );
    
    return followersWithImages.filter((item) => item !== null);
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
