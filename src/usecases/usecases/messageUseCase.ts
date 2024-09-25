import { IS3Operations } from "../../framework/service/s3Bucket.js";
import { Next } from "../../framework/types/serverPackageType.js";
import { ImessageRepository } from "../interface/repositoryInterface/messageRepository.js";
import { ImessageUseCase } from "../interface/usecase/messageUseCase.js";
import { getChat, sendMessage , getConversationsUsers, markAsRead, sendImage} from './message/index.js'

export class MessageUseCase implements ImessageUseCase{
  constructor(private messageRepository : ImessageRepository, 
    private s3: IS3Operations,
  ){}
  
  async sendMessage(senderId: string, receiverId: string,message : string, next: Next): Promise<any> {
      return await sendMessage(senderId,receiverId,message,this.messageRepository,next)
    }
    
    async getChat(userToChatId: string, senderId: string, next: Next): Promise<any> {
      return await getChat(userToChatId,senderId,this.s3,this.messageRepository,next)
    } 
    
    async getConversationsUsers(userId: string,next : Next): Promise<any> {
      return await getConversationsUsers(userId,this.messageRepository,this.s3,next)
    }
    
    async markAsRead(conversationId: string, userId: string, next: Next): Promise<void> {
      await markAsRead(conversationId,userId,this.messageRepository,next)
    }

    async sendImage(senderId : string,receiverId : string,file: Express.Multer.File | undefined, next: Next):Promise<{success : boolean} | any> {
      return await sendImage(senderId,receiverId,file,this.messageRepository,this.s3,next)
    }
    
  }
