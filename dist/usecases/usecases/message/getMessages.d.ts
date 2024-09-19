import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";
export declare const getChat: (userToChatId: string, senderId: string, s3: IS3Operations, messageRepository: ImessageRepository, next: Next) => Promise<void | import("../../../commonEntities/entities/message").ChatResponse>;
