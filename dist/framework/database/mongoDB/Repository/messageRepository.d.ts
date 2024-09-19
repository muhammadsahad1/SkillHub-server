import { ChatResponse } from "../../../../commonEntities/entities/message";
import { ImessageRepository } from "../../../../usecases/interface/repositoryInterface/messageRepository";
import { IS3Operations } from "../../../service/s3Bucket";
import ConversationModel from "../model/conversation";
import MessageModel from "../model/message";
import userModel from "../model/userModel";
export declare class MessageRepository implements ImessageRepository {
    private conversationModal;
    private messageModal;
    private userModels;
    constructor(conversationModal: typeof ConversationModel, messageModal: typeof MessageModel, userModels: typeof userModel);
    sendMessage(senderId: string, receiverId: string, message: string): Promise<any>;
    getChat(userToChatId: string, senderId: string, s3: IS3Operations): Promise<ChatResponse | void>;
    getConversationsUsers(userId: string, s3: IS3Operations): Promise<any>;
    markAsRead(conversationId: string, userId: string): Promise<void>;
    sendImage(senderId: string, receiverId: string, file: Express.Multer.File, s3Operations: IS3Operations): Promise<{
        success: boolean;
    } | undefined>;
}
