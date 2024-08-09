import { IS3Operations, PutObjectParams } from "../../../../service/s3Bucket";
import PostModel from "../../model/postModel";
import userModel from "../../model/userModel";

export const uploadPost = async (
  userId: string,
  file: Express.Multer.File,
  caption: string,
  type: string,
  s3: IS3Operations,
  userModels: typeof userModel,
  postModels: typeof PostModel
) => {
  console.log("vaneeee");
  
  console.log("in repo ===>", file);
  try {
    let imageName = "";
    let signedUrl = "";

    if (file) {
      const buffer = file.buffer;
      const mimetype = file.mimetype;
      const originalname = file.originalname;

      const putObjectParams: PutObjectParams = {
        originalname,
        buffer,
        mimetype,
      };

      imageName = await s3.putObjectUrl(putObjectParams);
    }
    const newPost = {
      userId: userId,
      imageName: imageName,
      caption: caption || "",
      type: type,
    };
    // here creating post
    const createdPost = await postModels.create(newPost);
    // retrive the image url in s3
    signedUrl = await s3.getObjectUrl({
      bucket: process.env.C3_BUCKET_NAME,
      key: imageName,
    });

    const currentUser = await userModels.findById(userId);
    const skill = currentUser?.skill;

    const postWithUrl = {
      ...createdPost.toObject(),
      signedUrl: signedUrl,
      skill: skill,
      userId: currentUser?._id,
    };
    // returning the created post and post url
    return postWithUrl;
  } catch (error: any) {
    console.error("Error uploading post:", error);
    return {
      success: false,
      message: "Error uploading post",
      error: error.message,
    };
  }
};
