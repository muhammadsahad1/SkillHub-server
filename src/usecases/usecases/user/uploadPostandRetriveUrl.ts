import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";

export const uploadPostandRetriveUrl = async (
  userId: string,
  file: Express.Multer.File,
  caption : string,
  S3Operations: IS3Operations,
  userRepository: IuserRepository,
  next: Next
) => {
  try {
    const result = await userRepository.uploadPostRetriveImageUrl(userId,file,caption,S3Operations)
    console.log("result in useCaes mini fun ===>" ,result)
  } catch (error) {}
};
