import { Iuser } from "../../../../../entities/user";
import userModel from "../../model/userModel";
import { IS3Operations , PutObjectParams } from "../../../../service/s3Bucket";

// Creatin profile with upload image to s3bucket
export const createProfile = async (
  userProfile: Iuser,
  file : Express.Multer.File,
  S3Operations : IS3Operations,
  userModels: typeof userModel,
): Promise<Iuser | undefined | any> => {
  try {
    
    const buffer = file.buffer
    const mimetype = file.mimetype
    const originalname = file.originalname
  
    const PutObjectParams: PutObjectParams = {
      originalname,
      buffer,
      mimetype
    }

  console.log("data ethiyooo =>",PutObjectParams)    

    await S3Operations.putObjectUrl(PutObjectParams)
    
    const profileImageUrl = `https://${process.env.C3_BUCKET_NAME}.s3.${process.env.C3_BUCKET_REGION}.amazonaws.com/${originalname}`;
    console.log("ProfileUrl DB",profileImageUrl)

    const updatedUser = await userModels.findOneAndUpdate(
      { email: userProfile.email },
      {
        $set: {
          name: userProfile.name,
          profileImage : profileImageUrl,
          bio: userProfile.bio,
          country: userProfile.country,
          city: userProfile.city,
          skill: userProfile.skill,
          picture : userProfile.picture,
          profile : true 
        },
      },
      { new: true } 
    );

    console.log("Updated user is ==>", updatedUser);
    return updatedUser
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
