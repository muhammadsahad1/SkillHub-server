import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";
export declare const getConversationsUsers: (userId: string, messageRepository: ImessageRepository, s3: IS3Operations, next: Next) => Promise<any>;
