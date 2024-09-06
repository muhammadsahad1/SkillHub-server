export interface IReportRequest {
  _id: string;
  postId: string;
  userId: string;
  postCaption: string;
  reportReason: string;
  postType: string;
  reportStatus?: string;
  created_at: Date;
  postImageUrl?: string; // Add this line
}
