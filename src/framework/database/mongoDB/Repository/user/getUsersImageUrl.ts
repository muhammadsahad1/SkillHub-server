import { IS3Operations } from "../../../../service/s3Bucket";

export const getUsersImageUrls = async (
  users: any[],
  followings: any[] = [],
  s3: IS3Operations
) => {
  try {
    
    const followingIds = followings.map((id) => id.toString())
    const userWithImages = await Promise.all(
      users.map(async (user) => {
        const {
          _id: _id,
          name,
          bio,
          country,
          skill,
          profileImage: profileImage,
          coverImage: coverImage,
        } = user;

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
            key: coverImage,
          });
        }
        
        let isFollowingBack = followingIds.includes(_id.toString());

        // returning the home page userSkillReleted data
        return {
          _id,
          name,
          country,
          bio,
          skill,
          imageUrl,
          coverImageUrl,
          isFollowingBack,
        };
      })
    );

    console.log("usersWithImages ===>", userWithImages);
    return userWithImages;
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined;
  }
};
