import { IS3Operations } from "../../../framework/service/s3Bucket";
import { IuserRepository } from "../../interface/repositoryInterface/userRepository";
export declare const uploadPostandRetriveUrl: (userId: string, file: Express.Multer.File, caption: string, type: string, S3Operations: IS3Operations, userRepository: IuserRepository) => Promise<{
    success: boolean;
    message: string;
    post: any;
}>;
