import { ObjectId, Model, Document } from "mongoose";
import { Ipost } from "../../../../commonEntities/entities/post";
import { Iuser } from "../../../../commonEntities/entities/user";
export interface IReport extends Document {
    _id: string;
    postId: ObjectId | Ipost;
    reportedBy: ObjectId | Iuser;
    reason: string;
    status: "pending" | "resolved";
    adminAction: string;
    createdAt: string | Date;
}
declare const ReportModel: Model<IReport>;
export default ReportModel;
