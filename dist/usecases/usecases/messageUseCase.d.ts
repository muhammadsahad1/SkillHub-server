import { IS3Operations } from "../../framework/service/s3Bucket";
import { Next } from "../../framework/types/serverPackageType";
import { ImessageRepository } from "../interface/repositoryInterface/messageRepository";
import { ImessageUseCase } from "../interface/usecase/messageUseCase";
export declare class MessageUseCase implements ImessageUseCase {
    private messageRepository;
    private s3;
    constructor(messageRepository: ImessageRepository, s3: IS3Operations);
    sendMessage(senderId: string, receiverId: string, message: string, next: Next): Promise<any>;
    getChat(userToChatId: string, senderId: string, next: Next): Promise<any>;
    getConversationsUsers(userId: string, next: Next): Promise<any>;
    markAsRead(conversationId: string, userId: string, next: Next): Promise<void>;
    sendImage(senderId: string, receiverId: string, file: Express.Multer.File | undefined, next: Next): Promise<{
        success: boolean;
    } | any>;
}
