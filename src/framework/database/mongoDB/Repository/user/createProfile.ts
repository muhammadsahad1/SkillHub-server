import { Iuser } from "../../../../../commonEntities/entities/user";
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

    console.log("FILE in DB ===>",file.originalname )

  console.log("data ethiyooo =>",PutObjectParams)    

    const imageName = await S3Operations.putObjectUrl(PutObjectParams)

    console.log("ProfileImage Name ==>",imageName)
    console.log("userProfile ===>",userProfile)
    const updatedUser = await userModels.findOneAndUpdate(
      { email: userProfile.email },
      {
        $set: {
          name: userProfile.name,
          profileImage: imageName,
          bio: userProfile.bio,
          country: userProfile.country,
          states : userProfile.city,
          skill: userProfile.skill,
          picture : userProfile.picture,
          imageKey : file.originalname,
          profile : true 
        },
      },
      { new: true } 
    );

    return updatedUser
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
