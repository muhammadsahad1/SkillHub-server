import { Next } from "../../../framework/types/serverPackageType";
export interface ImessageUseCase {
    sendMessage(senderId: string, receiverId: string, message: string, next: Next): Promise<any>;
    getChat(userToChatId: string | any, senderId: string | any, next: Next): Promise<any>;
    getConversationsUsers(userId: string, next: Next): Promise<any>;
    markAsRead(conversationId: string, userId: string, next: Next): Promise<void>;
    sendImage(senderId: string, receiverId: string, file: Express.Multer.File | undefined, next: Next): Promise<{
        success: boolean;
    }>;
}
