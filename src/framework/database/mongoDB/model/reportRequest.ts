import mongoose, { ObjectId, Schema, Model, Document } from "mongoose";
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

const ReportSchema: Schema<IReport> = new mongoose.Schema(
  {
    postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    reportedBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
    adminAction: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

const ReportModel: Model<IReport> = mongoose.model<IReport>(
  "Report",
  ReportSchema
);
export default ReportModel;
