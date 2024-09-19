import { IS3Operations } from "../../../../service/s3Bucket";
import ConversationModel from "../../model/conversation";
import MessageModel from "../../model/message";
export declare const getConversationsUsers: (userId: string, s3: IS3Operations, messageModel: typeof MessageModel, conversationModal: typeof ConversationModel) => Promise<{
    _id: any;
    user: {
        _id: any;
        name: any;
        profileImageUrl: any;
    };
    lastMessage: any;
    media: string;
    isRead: any;
    lastMessageTime: any;
}[] | undefined>;
