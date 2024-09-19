import mongoose from "mongoose";
import { IGroup } from "../../../../commonEntities/entities/group";
export declare const GroupModel: mongoose.Model<IGroup, {}, {}, {}, mongoose.Document<unknown, {}, IGroup> & IGroup & {
    _id: mongoose.Types.ObjectId;
}, any>;
