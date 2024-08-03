import { IS3Operations, PutObjectParams } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";

export const uploadPost = async (
  userId: string,
  file: Express.Multer.File,
  caption: string,
  s3: IS3Operations,
  postModels: typeof PostModel
) => {
  try {
    let imageName = "";
    if (file) {
      const buffer = file.buffer;
      const mimetype = file.mimetype;
      const originalname = file.originalname;

      const putObjectParams: PutObjectParams = {
        originalname,
        buffer,
        mimetype,
      };

      imageName = await s3.putObjectUrl(putObjectParams)
    }

    const newPost = {
      userId: userId,
      imageName : imageName,
      caption: caption || '',
    };

    const result = postModels.create(newPost);


    console.log("created post ==>",result)
  } catch (error) {
    console.error("Error updating profile:", error);
    return undefined; // Handle error as needed
  }
};
