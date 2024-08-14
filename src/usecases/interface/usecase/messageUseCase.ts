import { Next } from "../../../framework/types/serverPackageType";

export interface ImessageUseCase {
  sendMessage(senderId :string,receiverId : string,message : string,next : Next):Promise<any>
  getChat(userToChatId : string | any,senderId:string | any,next : Next) : Promise<any>
  getConversationsUsers(userId : string ,next : Next) : Promise<any>
}