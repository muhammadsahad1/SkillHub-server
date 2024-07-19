import mongoose from "mongoose";
const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, default: 'user' },
    blocked: { type: Boolean, default: false },
    phoneNumber: { type: String },
    profileImage: { type: String },
    bio: { type: String },
    created_at: { type: Date },
    city: { type: String },
    country: { type: String },
    skills: { type: String },
    email_notification: { type: Boolean, default: false },
    sms_notification: { type: Boolean, default: false },
});
const userModel = mongoose.model('user', userSchema);
export default userModel;
