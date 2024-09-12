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
  _id: string;

  // profile?: Profile;
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
  _id : string,
  userId?: string;
  name: string;
  country: string;
  bio: string;
  skill: string;
  imageUrl?: string;
  coverImageUrl?: string;
  isFollowingBack : boolean 
}

export interface FetchProfileImageResponse {
  imageUrl?: string;       // URL of the profile image, optional
  coverImageUrl?: string;  // URL of the cover image, optional
  followersCount?: number; // Number of followers, optional
  followingsCount?: number; // Number of followings, optional
}

