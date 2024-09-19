import { ChatResponse  } from "../../../../commonEntities/entities/message.js";
import { ImessageRepository } from "../../../../usecases/interface/repositoryInterface/messageRepository.js";
import { IS3Operations } from "../../../service/s3Bucket.js";
import ConversationModel from "../model/conversation.js";
import MessageModel from "../model/message.js";
import userModel from "../model/userModel.js";
import { getChat, getConversationsUsers, markMessagesAsRead, sendMessage , sendImage} from './message/index.js'

export class MessageRepository implements ImessageRepository{
  constructor(
    private conversationModal: typeof ConversationModel,
    private messageModal: typeof MessageModel,
    private userModels : typeof userModel
  ) {}

  async sendMessage(senderId: string, receiverId: string, message: string): Promise<any> {
    return await sendMessage(senderId,receiverId,message,this.messageModal,this.conversationModal)
  }

  async getChat(userToChatId: string, senderId: string,s3 : IS3Operations): Promise<ChatResponse | void> {
    return await getChat(userToChatId,senderId,this.userModels,s3,this.conversationModal)
  }

  async getConversationsUsers(userId: string, s3: IS3Operations): Promise<any> {
    return await getConversationsUsers(userId,s3,this.messageModal,this.conversationModal)
  }

  async markAsRead(conversationId: string, userId: string): Promise<void> {
    return await markMessagesAsRead(conversationId,userId,this.messageModal,this.conversationModal)
  }

  async sendImage(senderId: string, receiverId: string,file: Express.Multer.File,s3Operations : IS3Operations):Promise<{success : boolean} | undefined>  {
    return await sendImage(senderId , receiverId , file ,s3Operations ,this.messageModal,this.conversationModal)
  }
  
}
