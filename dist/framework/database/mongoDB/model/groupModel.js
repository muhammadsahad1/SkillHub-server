import mongoose from "mongoose";
const groupSchema = new mongoose.Schema({
    groupName: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            userId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
            isOnline: {
                type: Boolean,
                default: false,
            },
        },
    ],
    skills: [{ type: Array, required: true }],
    groupImage: { type: String },
}, {
    timestamps: true,
});
export const GroupModel = mongoose.model("Group", groupSchema);
