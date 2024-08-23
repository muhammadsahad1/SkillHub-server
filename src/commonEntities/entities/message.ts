// Interface for a single message
interface Message {
  _id: string; // or ObjectId if you are using ObjectId from mongoose
  senderId: string; // or ObjectId
  receiverId: string; // or ObjectId
  message: string;
  media?: string; // Optional, as not all messages will have media
  mediaUrl?: string; // Optional, mediaUrl will be present only if media is present
  readBy: string[]; // List of user IDs who have read the message
  createdAt: Date;
  updatedAt: Date;
  __v: number; // Version key for mongoose
}

// Interface for user details
interface UserWithProfileImage {
  _id: string; // or ObjectId
  name: string;
  email: string;
  profileImage: string;
  profileImageUrl: string; // URL of the profile image
}

// Interface for the ChatResponse
interface ChatResponse {
  messages: Message[];
  userWithProfileImage: UserWithProfileImage;
}