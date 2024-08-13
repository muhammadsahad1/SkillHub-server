import userModel from "../../model/userModel";
import { IS3Operations, PutObjectParams } from "../../../../service/s3Bucket";
import { Iuser } from "../../../../../commonEntities/entities/user";

export const uploadCoverImage = async (
  userModels: typeof userModel,
  userId: string,
  file: Express.Multer.File,
  S3Operations: IS3Operations
): Promise<Iuser | undefined | any> => {
  try {

    const buffer = file.buffer;
    const mimetype = file.mimetype;
    const originalname = file.originalname;

    const PutObjectParams: PutObjectParams = {
      originalname,
      buffer,
      mimetype,
    };
    
    const imageName = await S3Operations.putObjectUrl(PutObjectParams);
    const updatedUser = await userModels.findOneAndUpdate(
      { _id: userId },
      { $set: { coverImage: imageName, coverImageKey: file.originalname } },
      { new: true }
    );
    
    return updatedUser; 
  } catch (error) {
    console.error("Error updating : cover image", error);
    return undefined; // Handle error as needed
  }
};
