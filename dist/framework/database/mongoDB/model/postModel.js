import mongoose, { Schema } from "mongoose";
const PostSchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, required: true, ref: "User" },
    imageName: { type: String, required: true },
    caption: { type: String, default: "" },
    type: {
        type: String,
        enum: ["image", "video", "thoughts"],
        required: true,
    },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
    comments: [
        {
            userId: { type: Schema.Types.ObjectId, ref: "User" },
            comment: { type: String },
            created_at: { type: Date, default: Date.now },
        },
    ],
    saves: [{ type: Schema.Types.ObjectId, ref: "User" }],
    reports: [{ type: Schema.Types.ObjectId, ref: "User" }],
}, {
    timestamps: true,
});
const PostModel = mongoose.model("Post", PostSchema);
export default PostModel;
