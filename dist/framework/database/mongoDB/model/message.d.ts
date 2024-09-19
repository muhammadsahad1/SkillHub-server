import mongoose from "mongoose";
import { Message } from '../../../../commonEntities/entities/message';
declare const MessageModel: mongoose.Model<Message, {}, {}, {}, mongoose.Document<unknown, {}, Message> & Message & Required<{
    _id: string;
}>, any>;
export default MessageModel;
