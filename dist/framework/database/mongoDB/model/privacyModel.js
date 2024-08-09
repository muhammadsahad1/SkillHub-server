import mongoose, { Schema } from "mongoose";
const privacySchema = new mongoose.Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", require: true },
    isProfilePublic: { type: Boolean, default: false }
});
const PrivacyModal = mongoose.model('PrivacySettings', privacySchema);
export default PrivacyModal;
