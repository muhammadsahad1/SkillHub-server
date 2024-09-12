import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { CustomRequest } from "../../framework/webServer/middleware/request/customReq";
import { ImessageUseCase } from "../../usecases/interface/usecase/messageUseCase";

export class MessageController {
  constructor(private messageUseCase: ImessageUseCase) {}

    async sendMessage(req : CustomRequest,res :Res,next :Next){

      const { receiverId , messages  } = req.body
      const senderId = req.user?.id as string
      const result = await this.messageUseCase.sendMessage(senderId,receiverId,messages,next)
      res.status(201).json(result)
    }

    async getChat(req : Req,res :Res , next :Next){
        
      const { senderId , userToChatId } = req.query
      const result = await this.messageUseCase.getChat(userToChatId,senderId,next)
      res.status(200).json(result)
    }

    async chatUsers(req : CustomRequest,res :Res , next :Next){
      const userId = req.user?.id as string
      const result = await this.messageUseCase.getConversationsUsers(userId,next)
      res.status(200).json(result)
    }

    async markAsRead(req : CustomRequest, res : Res , next : Next) {
      const {conversationId} = req.body
      const userId = req.user?.id
       await this.messageUseCase.markAsRead(conversationId,userId,next)
    }

    async uploadImage(req : Req , res : Res , next : Next) {
      const { senderId , receiverId } = req.body
      const result = await this.messageUseCase.sendImage(senderId,receiverId,req.file,next)
      res.status(200).json(result)
      return result
    }
}
