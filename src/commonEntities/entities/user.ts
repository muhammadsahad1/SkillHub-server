// import mongoose, { Schema, model } from 'mongoose';

// type ObjectId = mongoose.Types.ObjectId;

// Define interfaces for sub-documents first
// interface Profile {
//   profileImage?: string;
//   interests?: string[];
// }

//  interface AccountSettings {
//   theme: string;
//   language: string;
//   timeZone?: string;
//   twoFactorAuthEnabled?: boolean;
// }

//  interface PrivacySettings {
//   showEmail: boolean;
//   showPhone: boolean;
//   showProfilePicture: boolean;
//   showActivityStatus: boolean;
//   dataSharingOptOut?: boolean;
// }

// interface Follower {
//   userId: ObjectId;
//   followedAt: Date;
// }

//  interface Following {
//   userId: ObjectId;
//   followedAt: Date;
// }

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
  status?:boolean;
  coverImageKey? : string;
  picture?: string | undefined;
  // followers: Follower[];
  // following?: Following[];
  created_at?: Date;
  updated_at?: Date;
  bio?: string;
  city?: string;
  country?: string;
  states?: string;
  skill?: string;
  profile?: boolean;
  coverImage? :String; 
  googleId?: string;
  googleAvatar?: string;
  resetPasswordToken?: string;
  // account_settings?: AccountSettings;
  email_notification?: boolean;
  sms_notification?: boolean;
  // privacy_settings?: PrivacySettings;
  contactVisibility?: string;
  profileVisibility?: string;
  passwordLastChanged?: Date;
  //   profile?: Profile;
}
