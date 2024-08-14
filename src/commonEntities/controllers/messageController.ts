import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { ImessageUseCase } from "../../usecases/interface/usecase/messageUseCase";

export class MessageController {
  constructor(private messageUseCase: ImessageUseCase) {}

    async sendMessage(req : Req,res :Res,next :Next){
      console.log("req bpody  ===?>",req.body);
    
      const { receiverId , messages  } = req.body
      const senderId = req.user?.id as string
      const result = await this.messageUseCase.sendMessage(senderId,receiverId,messages,next)
      res.status(201).json(result)
    }

    async getChat(req : Req,res :Res , next :Next){
        
      const { senderId , userToChatId } = req.query
      const result = await this.messageUseCase.getChat(userToChatId,senderId,next)
      console.log("ress ======>",result);
      res.status(200).json(result)
    }

    async chatUsers(req : Req,res :Res , next :Next){
      const userId = req.user?.id as string
      const result = await this.messageUseCase.getConversationsUsers(userId,next)
      res.status(200).json(result)
    }
}
