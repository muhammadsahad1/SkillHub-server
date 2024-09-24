"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const otpSchema = new mongoose_1.default.Schema({
    username: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true,
    },
    userPassword: {
        type: String,
        require: true
    },
    otp: {
        type: String,
        required: true,
    },
    createAt: {
        type: Date,
        default: Date.now(),
    },
    expiresAt: {
        type: Date,
        default: function () {
            return Date.now() + 60 * 1000;
        }
    },
});
// impliment ttl index
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });
const otpModel = mongoose_1.default.model("Otp", otpSchema);
exports.default = otpModel;
