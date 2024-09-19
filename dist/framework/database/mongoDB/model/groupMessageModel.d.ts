import mongoose from "mongoose";
import { IGroupMessage } from "../../../../commonEntities/entities/groupMessage";
declare const GroupMessageModel: mongoose.Model<IGroupMessage, {}, {}, {}, mongoose.Document<unknown, {}, IGroupMessage> & IGroupMessage & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default GroupMessageModel;
