import mongoose from "mongoose";
const messageSchema = new mongoose.Schema({
    senderId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    receiverId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    message: {
        type: String,
    },
    media: {
        type: String,
    },
    readBy: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        }
    ]
}, 
// createdAt, updatedAt
{ timestamps: true });
messageSchema.index({ senderId: 1, receiverId: 1 });
const MessageModel = mongoose.model("Message", messageSchema);
export default MessageModel;
