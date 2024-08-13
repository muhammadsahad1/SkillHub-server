import { Next } from "../../../framework/types/serverPackageType";

export interface ImessageUseCase {
  sendMessage(senderId :string,receiverId : string,message : string,next : Next):Promise<any>
  getChat(receiverId : string,senderId:string,next : Next) : Promise<any>
}