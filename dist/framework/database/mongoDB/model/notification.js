import mongoose, { Schema } from "mongoose";
const NotificationSchema = new Schema({
    senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    receiverId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, require: true },
    type: {
        type: String,
        enum: [
            "follow",
            "chat",
            "like",
            "comment",
            "verifyRequestAccepted",
            "verifyRequestRejected",
            "ReportAction"
        ],
        require: true,
    },
    read: { type: Boolean, default: false },
    link: { type: String },
    createdAt: { type: Date, default: Date.now },
});
export const NotificationModel = mongoose.model("Notification", NotificationSchema);
