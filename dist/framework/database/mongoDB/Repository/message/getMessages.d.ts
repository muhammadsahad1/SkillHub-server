import { IS3Operations } from "../../../../service/s3Bucket";
import ConversationModel from "../../model/conversation";
import userModel from "../../model/userModel";
export declare const getChat: (userToChatId: string, senderId: string, userModels: typeof userModel, s3: IS3Operations, conversationModel: typeof ConversationModel) => Promise<any | void>;
