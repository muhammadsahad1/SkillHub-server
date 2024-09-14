import mongoose, { Schema } from "mongoose";
const ReportSchema = new mongoose.Schema({
    postId: { type: Schema.Types.ObjectId, required: true, ref: "Post" },
    reportedBy: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    reason: { type: String, required: true },
    status: { type: String, enum: ["pending", "resolved"], default: "pending" },
    adminAction: { type: String, default: "" },
}, {
    timestamps: true,
});
const ReportModel = mongoose.model("Report", ReportSchema);
export default ReportModel;
