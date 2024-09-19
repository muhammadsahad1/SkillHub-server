import mongoose from "mongoose";
export interface Iuser {
    id?: string;
    role?: string;
    name: string;
    email: string;
    password: string;
    blocked?: boolean;
    approve?: boolean;
    phoneNumber?: string;
    profileImage?: string;
    imageKey?: string;
    status?: boolean;
    coverImageKey?: string;
    picture?: string | undefined;
    showNotification?: boolean;
    followers?: mongoose.Types.ObjectId[] | Iuser[];
    following?: mongoose.Types.ObjectId[] | Iuser[];
    followerCount?: number;
    followingCount?: number;
    created_at?: Date;
    updated_at?: Date;
    bio?: string;
    city?: string;
    country?: string;
    states?: string;
    skill?: string;
    profile?: boolean;
    coverImage?: String;
    googleId?: string;
    googleAvatar?: string;
    resetPasswordToken?: string;
    passwordLastChanged?: Date;
    accountPrivacy?: boolean;
    profileImageUrl?: string;
    _id: string;
    isProfessional?: boolean;
    experienceYears?: number;
    professionalBadge?: boolean;
    verificationBadge?: boolean;
    website?: string;
    isRequested?: boolean;
    verificationStatus?: "Pending" | "Approved" | "Rejected";
    proofLink?: string;
    groups?: mongoose.Types.ObjectId[];
}
export interface GetSkillRelatedUsersResponse {
    success: boolean;
    profileImageUrl?: string;
    coverImageUrl?: string;
    users: Iuser[];
}
export interface IUserWithImages {
    _id: string;
    userId?: string;
    name: string;
    country: string;
    bio: string;
    skill: string;
    imageUrl?: string;
    coverImageUrl?: string;
    isFollowingBack: boolean;
}
export interface FetchProfileImageResponse {
    imageUrl?: string;
    coverImageUrl?: string;
    followersCount?: number;
    followingsCount?: number;
}
