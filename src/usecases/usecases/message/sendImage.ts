import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";

export const sendImage = async (
  senderId: string,
  receiverId: string,
  file: Express.Multer.File | undefined,
  messageRepository: ImessageRepository,
  s3Operations : IS3Operations,
  next: Next
):Promise<{success : boolean} | undefined> => {
  try {
    console.log("useCasilKeti");
    
    const result = await messageRepository.sendImage(senderId,receiverId,file,s3Operations);
    return result
  } catch (error) {

  }
};
