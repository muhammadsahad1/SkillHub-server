import mongoose from "mongoose";
import { Iconversation } from "../../../../commonEntities/entities/conversation";
declare const ConversationModel: mongoose.Model<Iconversation, {}, {}, {}, mongoose.Document<unknown, {}, Iconversation> & Iconversation & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default ConversationModel;
