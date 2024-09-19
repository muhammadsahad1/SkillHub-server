import { IS3Operations } from "../../../../service/s3Bucket";
import ConversationModel from "../../model/conversation";
import MessageModel from "../../model/message";
export declare const sendImage: (senderId: string, receiverId: string, file: Express.Multer.File, s3Operations: IS3Operations, messageModel: typeof MessageModel, conversationModal: typeof ConversationModel) => Promise<{
    success: boolean;
} | undefined>;
