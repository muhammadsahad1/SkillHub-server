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
const EventSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    date: { type: Date, required: true },
    time: { type: String, required: true },
    duration: { type: Number, required: true },
    speaker: { type: String, required: true },
    bannerName: { type: String },
    isPublic: { type: Boolean, default: true },
    category: { type: String, default: "" },
    attendees: [
        {
            userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User" },
            paymentStatus: {
                type: String,
                enum: ["Pending", "Completed", "Not Required"],
                default: "Not Required",
            },
            stripePaymentId: {
                type: String,
                required: function () {
                    return this.paymentStatus === "Completed";
                },
            },
            joinToken: { type: String },
        },
    ],
    price: {
        type: Number,
        default: 0,
        min: 0,
    },
    currency: {
        type: String,
        default: "USD",
    },
    approvalStatus: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },
    eventStatus: {
        type: String,
        enum: ["Upcoming", "Ongoing", "Completed"],
        default: "Upcoming",
    },
    createdBy: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
}, {
    timestamps: true,
});
const EventModel = mongoose_1.default.model("Events", EventSchema);
exports.default = EventModel;
