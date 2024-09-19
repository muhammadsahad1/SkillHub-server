import { IS3Operations } from "../../../../service/s3Bucket";
import userModel from "../../model/userModel";

export const getOthersFollowingsImageUrl = async (
  followings: any[] = [],
  myUserId: string,
  userModels: typeof userModel,
  s3: IS3Operations
) => {
  try {
    const myUser = await userModels.findById(myUserId);
    if (!myUser) {
      throw new Error("Current user not found");
    }

    const followersIds = myUser.followers?.map((id) => id.toString()) || [];
    const followingIds = myUser.following?.map((id) => id.toString()) || [];

    const followingsWithImage = await Promise.all(
      followings.map(async (followingId) => {
        const user = await userModels.findById(followingId);
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
        const isFollowingBack = followersIds.includes(_id.toString());

        let relationship = "none";
        if (isFollowing && isFollowingBack) {
          relationship = "mutual";
        } else if (isFollowing) {
          relationship = "following";
        } else if (isFollowingBack) {
          relationship = "followed by";
        }

        return {
          _id: _id.toString(),
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

    console.log("followingsWithImage ======>",followingsWithImage)
    return followingsWithImage.filter((item) => item !== null);
  } catch (error) {
    console.error("Error fetching followings' images:", error);
    return undefined;
  }
};
