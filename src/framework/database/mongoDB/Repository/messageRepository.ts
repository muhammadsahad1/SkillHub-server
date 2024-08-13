import { ImessageRepository } from "../../../../usecases/interface/repositoryInterface/messageRepository";
import { IS3Operations } from "../../../service/s3Bucket";
import ConversationModel from "../model/conversation";
import MessageModel from "../model/message";
import userModel from "../model/userModel";
import { getChat, sendMessage } from './message/index'

export class MessageRepository implements ImessageRepository{
  constructor(
    private conversationModal: typeof ConversationModel,
    private messageModal: typeof MessageModel,
    private useModels : typeof userModel
  ) {}

  async sendMessage(senderId: string, receiverId: string, message: string): Promise<any> {
    return await sendMessage(senderId,receiverId,message,this.messageModal,this.conversationModal)
  }

  async getChat(userToChatId: string, senderId: string,s3 : IS3Operations): Promise<any> {
      console.log("userTochaID ====>",userToChatId);
      
    return await getChat(userToChatId,senderId,this.useModels,s3,this.conversationModal)
  }
}
