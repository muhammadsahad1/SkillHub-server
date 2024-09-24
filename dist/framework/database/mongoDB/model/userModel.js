"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: "user" },
    blocked: { type: Boolean, default: false },
    phoneNumber: { type: String },
    profileImage: { type: String },
    imageKey: { type: String },
    bio: { type: String },
    created_at: { type: Date, default: Date.now },
    city: { type: String },
    country: { type: String },
    states: { type: String },
    skill: { type: String },
    profile: { type: Boolean, default: false },
    status: { type: Boolean },
    coverImageKey: { type: String },
    coverImage: { type: String },
    picture: { type: String },
    googleId: { type: String },
    googleAvatar: { type: String },
    resetPasswordToken: { type: String },
    showNotification: { type: Boolean },
    followers: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    accountPrivacy: { type: Boolean, default: false },
    // New fields for professional account
    isProfessional: { type: Boolean, default: false },
    professionalBadge: { type: Boolean, default: false },
    website: { type: String, default: "" },
    isRequested: { type: Boolean, default: false },
    verificationStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    proofLink: { type: String },
    groups: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Group" }],
});
const userModel = mongoose_1.default.model("User", userSchema);
exports.default = userModel;
