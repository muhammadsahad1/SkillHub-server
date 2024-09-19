import ConversationModel from "../../model/conversation";
import MessageModel from "../../model/message";
export declare const markMessagesAsRead: (conversationId: string, userId: string, messageModal: typeof MessageModel, conversationModel: typeof ConversationModel) => Promise<void>;
