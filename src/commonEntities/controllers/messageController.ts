import { Req, Res, Next } from "../../framework/types/serverPackageType";
import { ImessageUseCase } from "../../usecases/interface/usecase/messageUseCase";

export class MessageController {
  constructor(private messageUseCase: ImessageUseCase) {}

    async sendMessage(req : Req,res :Res,next :Next){
      console.log("req bpody  ===?>",req.body);
    
      const { receiverId , messages  } = req.body
      const senderId = req.user?.id as string
      console.log("senderId ==>",senderId);
      const result = await this.messageUseCase.sendMessage(senderId,receiverId,messages,next)
      res.status(201).json(result)
    }

    async getChat(req : Req,res :Res , next :Next){
      const { userToChatId } = req.params
      const senderId = req.user?.id
      const result = await this.messageUseCase.getChat(userToChatId,senderId,next)
      console.log("resultt   =====> " , result);
      
      res.status(200).json(result)
    }
}
