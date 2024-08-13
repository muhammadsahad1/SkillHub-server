// import mongoose, { Schema, model } from 'mongoose';

import mongoose from "mongoose";

// Define the main User interface
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
  followers?: mongoose.Types.ObjectId[] | Iuser[]; // Changed
  following?: mongoose.Types.ObjectId[] | Iuser[]; // Changed
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
  //   profile?: Profile;
}

export interface GetSkillRelatedUsersResponse {
  success: boolean;
  profileImageUrl?: string;
  coverImageUrl?: string;
  users: Iuser[];
}

export interface IUserWithImages {
  userId: string;
  userName: string;
  country: string;
  bio: string;
  skill: string;
  imageUrl?: string;
  coverImageUrl?: string;
}

export interface FetchProfileImageResponse {
  success: boolean;
  imageUrls: {
    profileUrl: string;
    coverImageUrl: string;
  };
  message?: string;
}
// account_settings?: AccountSettings;
// email_notification?: boolean;
// sms_notification?: boolean;
// privacy_settings?: PrivacySettings;
// contactVisibility?: string;
// profileVisibility?: string;
