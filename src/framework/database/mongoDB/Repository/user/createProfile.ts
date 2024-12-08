import { Iuser } from "../../../../../commonEntities/entities/user.js";
import userModel from "../../model/userModel.js";
import { IS3Operations, PutObjectParams } from "../../../../service/s3Bucket.js";
import client, { checkElasticsearchConnection } from "../../../../elasticsearch/elasticsearchClient.js";

// Creatin profile with upload image to s3bucket
export const createProfile = async (
  userProfile: Iuser,
  file: Express.Multer.File,
  S3Operations: IS3Operations,
  userModels: typeof userModel
): Promise<Iuser | undefined | any> => {
  try {

    let imageName = "";
    if (file) {
      const buffer = file.buffer;
      const mimetype = file.mimetype;
      const originalname = file.originalname;

      const PutObjectParams: PutObjectParams = {
        originalname,
        buffer,
        mimetype,
      };

      imageName = await S3Operations.putObjectUrl(PutObjectParams);
    }
    const currentUser = await userModels.findOne({ email: userProfile.email });
    const updatedUser = await userModels.findOneAndUpdate(
      { email: userProfile.email },
      {
        $set: {
          name: userProfile.name || currentUser?.name,
          profileImage: imageName || currentUser?.profileImage,
          bio: userProfile.bio || currentUser?.bio,
          country: userProfile.country || currentUser?.country,
          states: userProfile.city || currentUser?.states,
          skill: userProfile.skill || currentUser?.skill,
          picture: userProfile.picture || currentUser?.picture,
          imageKey: file ? file.originalname : currentUser?.imageKey,
          profile: true,
        },
      },
      { new: true }
    );

    // Index or update user in Elasticsearch
    const isConnected = await checkElasticsearchConnection()

    if (isConnected && updatedUser) {
      await client.index({
        index: "users",
        id: updatedUser._id.toString(),
        document: {
          id: updatedUser._id.toString(),
          name: updatedUser.name,
          bio: updatedUser.bio,
          skill: updatedUser.skill,
          profileImage: updatedUser.profileImage,
        },
      });

    } else {
      console.log("Elasticsearch server is not reachable. Skipping indexing.");
    }

    return updatedUser;
  } catch (error: any) {
    console.error("Error updating profile:", error);
    throw new Error(`Error updating profile: ${error.message}`);
  }
};
