import { IS3Operations } from "../../../../service/s3Bucket";

export const getUsersImageUrls = async (
  users: any[],
  s3: IS3Operations
) => {
  try {
    
    const userWithImages = await Promise.all(
      users.map(async (user) => {
        const {_id  : _id ,name ,bio , skill , profileImage : profileImage , coverImage : coverImage} = user

        let imageUrl = "";
        let coverImageUrl = "";

        if (profileImage) {
          imageUrl = await s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: profileImage,
          });
          console.log("imageUrl ===>",imageUrl)
        }

        if (coverImage) {
          coverImageUrl = await s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: coverImage,
          });
        }

        // returning the home page userSkillReleted data
        return {
          _id,
          name,
          bio,
          skill,
          imageUrl,
          coverImageUrl,
        };
      })
    );
    
    return userWithImages;

  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; 
  }
};
