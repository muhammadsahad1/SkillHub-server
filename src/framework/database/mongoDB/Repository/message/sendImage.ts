
import { IS3Operations, PutObjectParams } from "../../../../service/s3Bucket.js";
import ConversationModel from "../../model/conversation.js";
import MessageModel from "../../model/message.js";

export const sendImage = async (
  senderId: string,
  receiverId: string,
  file: Express.Multer.File,
  s3Operations : IS3Operations,
  messageModel : typeof MessageModel,
  conversationModal : typeof ConversationModel
):Promise<{success : boolean} | undefined> => {
  try {
    console.log("its come in repo ");
    
    let conversation = await ConversationModel.findOne({
      participants : { $all : [senderId,receiverId]}
    })

    if(!conversation){
        conversation = await conversationModal.create({
          participants :  [senderId,receiverId] , lastMessage : null 
      })
    }

      let imageName = ''
      if(file){
      const buffer = file.buffer
      const mimetype = file.mimetype
      const originalname = file.originalname

      const putObjectUrl : PutObjectParams = {
        originalname,
        buffer,
        mimetype
      }

      imageName = await s3Operations.putObjectUrl(putObjectUrl)
    }
    
    const newMessage = new messageModel({
      senderId,
      receiverId,
      message : "",
      media : imageName,
    })
    console.log("newMessage ==>",newMessage);
    if(newMessage){
      console.log("newMessage =222=>",newMessage);
    const status =  await newMessage.save()
    console.log("status ==>",status);
    
      conversation.messages.push(
        newMessage._id as any
      )
      await conversation.save()
      console.log("newMessage ==>",newMessage);
      return {
        success : true
      }
    }
    
  } catch (error) {
    console.error("Error in sendImage:", error);
    return undefined;
  }
};
