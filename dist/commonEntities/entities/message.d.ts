import mongoose from "mongoose";
export interface Message {
    _id: string;
    senderId: mongoose.Types.ObjectId;
    receiverId: mongoose.Types.ObjectId;
    message: string;
    media?: string;
    mediaUrl?: string;
    readBy: string[];
    createdAt: Date;
    updatedAt: Date;
    __v: number;
}
interface UserWithProfileImage {
    _id: string;
    name: string;
    email: string;
    profileImage: string;
    profileImageUrl: string;
}
export interface ChatResponse {
    messages: Message[];
    userWithProfileImage: UserWithProfileImage;
}
export {};
