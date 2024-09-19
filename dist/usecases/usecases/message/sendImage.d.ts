import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";
export declare const sendImage: (senderId: string, receiverId: string, file: Express.Multer.File | undefined, messageRepository: ImessageRepository, s3Operations: IS3Operations, next: Next) => Promise<{
    success: boolean;
} | undefined>;
