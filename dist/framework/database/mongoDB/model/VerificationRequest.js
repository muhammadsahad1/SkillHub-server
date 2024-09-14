import mongoose, { Schema } from "mongoose";
export const VerificationRequestSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    fullName: { type: String, required: true },
    email: { type: String, },
    profession: { type: String, required: true },
    company: { type: String },
    website: { type: String },
    linkedin: { type: String },
    proofLink: { type: String, required: true },
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    submittedAt: { type: Date, default: Date.now },
}, {
    timestamps: true, // Adds createdAt and updatedAt timestamps
});
export const VerificationRequestModal = mongoose.model("VerificationRequest", VerificationRequestSchema);
