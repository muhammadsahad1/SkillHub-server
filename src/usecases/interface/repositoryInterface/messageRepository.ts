  import { ChatResponse } from "../../../commonEntities/entities/message"
  import { IS3Operations } from "../../../framework/service/s3Bucket"


  export interface ImessageRepository {
  sendMessage(senderId : string,receiverId : string,message:string):Promise<any>
  getChat(userToChatId : string,senderId : string,s3 : IS3Operations) :Promise<ChatResponse | void>
  getConversationsUsers(userId : string,s3 : IS3Operations) : Promise<any>
  markAsRead(conversationId : string ,userId : string) :Promise<void>
  sendImage(senderId: string, receiverId: string,file : Express.Multer.File | undefined,s3Operations : IS3Operations):Promise<{success : boolean} | undefined> 
  }