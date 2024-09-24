"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GroupModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const groupSchema = new mongoose_1.default.Schema({
    groupName: { type: String, required: true },
    description: { type: String, required: true },
    creatorId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    members: [
        {
            userId: {
                type: mongoose_1.default.Schema.Types.ObjectId,
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
exports.GroupModel = mongoose_1.default.model("Group", groupSchema);
