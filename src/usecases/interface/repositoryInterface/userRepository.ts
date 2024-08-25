import { IComment, Ipost } from "../../../commonEntities/entities/post";
import {
  FetchProfileImageResponse,
  Iuser,
  IUserWithImages,
} from "../../../commonEntities/entities/user";
import { VerifyRequest } from "../../../commonEntities/entities/verificationRequest";
import { IS3Operations } from "../../../framework/service/s3Bucket";
import { Next } from "../../../framework/types/serverPackageType";

export interface IuserRepository {
  /**
   * Creates a new user.
   * @param newUser - The user details to create.
   * @returns The created user or an object with a success flag and tokens.
   */
  createUser(newUser: Iuser): Promise<Iuser | void | {
    success: boolean;
    user?: Iuser;
    token: { accessToken: string; refreshToken: string };
    message?: string;
  }>;

  /**
   * Finds a user by email.
   * @param email - The email of the user to find.
   * @returns The found user or undefined if not found.
   */
  findByEmail(email: string): Promise<Iuser | void>;

  /**
   * Updates a user's password by ID.
   * @param userId - The ID of the user.
   * @param password - The new password.
   * @returns The updated user or undefined if not updated.
   */
  findByIdUpdateUpdateOne(userId: string, password: string): Promise<Iuser | void>;

  /**
   * Updates a user's email with a new value.
   * @param email - The current email of the user.
   * @param toUpdateVal - The new email value.
   * @returns The updated user or undefined if not updated.
   */
  findByEmailUpdateOne(email: string, toUpdateVal: string): Promise<Iuser | void>;

  /**
   * Updates a user's reset token.
   * @param email - The email of the user.
   * @param resetToken - The new reset token.
   * @returns The updated user or undefined if not updated.
   */
  findOneUpdateResetToken(email: string, resetToken: string): Promise<Iuser | void>;

  /**
   * Verifies a user's password reset token.
   * @param password - The new password.
   * @param token - The reset token.
   * @returns The updated user or undefined if verification fails.
   */
  resetPasswordVerify(password: string, token: string): Promise<Iuser | void>;

  /**
   * Creates a user profile with a file upload.
   * @param user - The user details.
   * @param file - The profile file.
   * @param S3Operations - S3 service operations.
   * @returns The updated user or undefined if creation fails.
   */
  createProfile(user: Iuser, file: Express.Multer.File, S3Operations: any): Promise<Iuser | void>;

  /**
   * Processes a verification request for a user.
   * @param userId - The ID of the user.
   * @param requestData - The verification request data.
   * @returns A success status object.
   */
  verifyRequest(userId: string, requestData: VerifyRequest): Promise<{ success: boolean; } | undefined>;

  /**
   * Fetches a user's profile image from S3.
   * @param s3upload - S3 upload service.
   * @param userId - The ID of the user.
   * @returns The profile image response.
   */
  fetchProfileImage(s3upload: any, userId: string): Promise<FetchProfileImageResponse>;

  /**
   * Uploads a cover image for a user.
   * @param userId - The ID of the user.
   * @param file - The cover image file.
   * @param s3 - S3 service operations.
   * @returns The updated user or undefined if upload fails.
   */
  uploadeCoverImage(userId: string, file: Express.Multer.File, s3: any): Promise<Iuser | void>;

  /**
   * Changes the notification visibility for a user.
   * @param userId - The ID of the user.
   * @param isShowNotification - Notification visibility status.
   * @returns A status object indicating success.
   */
  changeShowNotification(userId: string, isShowNotification: boolean): Promise<{ status: boolean }>;

  /**
   * Retrieves users related to a specific skill.
   * @param userId - The ID of the current user.
   * @param skill - The skill to search for.
   * @param s3Bucket - S3 service operations.
   * @returns A list of users with images.
   */
  getSkillRelatedUsers(userId: string, skill: string, s3Bucket: IS3Operations): Promise<IUserWithImages[]>;

  /**
   * Gets details of a user by ID.
   * @param userId - The ID of the user.
   * @returns The user details.
   */
  getUserDetails(userId: string): Promise<Iuser>;

  /**
   * Retrieves users that the current user is following.
   * @param userId - The ID of the current user.
   * @param S3Operations - S3 service operations.
   * @returns A list of users.
   */
  getMyFollowing(userId: string, S3Operations: IS3Operations): Promise<any>;

  /**
   * Retrieves all users in the system.
   * @returns A string containing all users.
   */
  getAllUsers(): Promise<string>;

  /**
   * Follows a user.
   * @param toFollowingId - The ID of the user to follow.
   * @param fromFollowerId - The ID of the current user.
   * @returns A promise that resolves when the operation is complete.
   */
  followUp(toFollowingId: string, fromFollowerId: string): Promise<void>;

  /**
   * Retrieves users following the current user.
   * @param userId - The ID of the current user.
   * @param S3Operations - S3 service operations.
   * @returns A list of followers.
   */
  myFollowers(userId: string, S3Operations: IS3Operations): Promise<any>;

  /**
   * Unfollows a user.
   * @param toUnFollowId - The ID of the user to unfollow.
   * @param fromFollowerId - The ID of the current user.
   * @returns A promise that resolves when the operation is complete.
   */
  unFollow(toUnFollowId: string, fromFollowerId: string): Promise<void>;

  /**
   * Removes a follower.
   * @param fromRemoverId - The ID of the user removing the follower.
   * @param toRemoveId - The ID of the follower to remove.
   * @returns A promise that resolves when the operation is complete.
   */
  removeFollower(fromRemoverId: string, toRemoveId: string): Promise<void>;

  /**
   * Follows back a user.
   * @param fromFollowingId - The ID of the user following back.
   * @param toFollowId - The ID of the user to follow.
   * @returns A promise that resolves when the operation is complete.
   */
  followBack(fromFollowingId: string, toFollowId: string): Promise<void>;

  /**
   * Retrieves the followers of another user.
   * @param userId - The ID of the user whose followers to retrieve.
   * @param currentUserId - The ID of the current user.
   * @param s3 - S3 service operations.
   * @returns A list of followers.
   */
  othersFollowers(userId: string, currentUserId: string, s3: IS3Operations): Promise<any>;

  /**
   * Retrieves the followings of another user.
   * @param userId - The ID of the user whose followings to retrieve.
   * @param currentUserId - The ID of the current user.
   * @param s3 - S3 service operations.
   * @returns A list of followings.
   */
  othersFollowings(userId: string, currentUserId: string, s3: IS3Operations): Promise<any>;

  /**
   * Uploads a post with an image.
   * @param userId - The ID of the user.
   * @param file - The image file.
   * @param caption - The post caption.
   * @param type - The type of post.
   * @param s3 - S3 service operations.
   * @returns A promise with the result of the upload.
   */
  uploadPostRetriveImageUrl(userId: string, file: Express.Multer.File, caption: string, type: string, s3: IS3Operations): Promise<any>;

  /**
   * Uploads thoughts as a post.
   * @param userId - The ID of the user.
   * @param thoughts - The thoughts to post.
   * @returns A success status and the created thought post.
   */
  uploadThoughts(userId: string, thoughts: string): Promise<{ success: boolean; thoughtPost: Ipost } | void>;

  /**
   * Fetches posts related to a specific skill.
   * @param userSkill - The skill to filter posts by.
   * @param s3 - S3 service operations.
   * @returns A list of posts.
   */
  fetchPosts(userSkill: string, s3: IS3Operations): Promise<Ipost[]>;

  /**
   * Fetches posts made by a specific user.
   * @param userId - The ID of the user.
   * @param s3 - S3 service operations.
   * @returns A list of posts by the user.
   */
  fetchMyPosts(userId: string, s3: IS3Operations): Promise<any>;

  /**
   * Fetches posts made by others that the current user can view.
   * @param userId - The ID of the current user.
   * @param s3 - S3 service operations.
   * @returns A list of posts by others.
   */
  fetchOthersPosts(userId: string, s3: IS3Operations): Promise<any>;

  /**
   * Deletes a post by ID.
   * @param postId - The ID of the post to delete.
   * @returns A promise that resolves when the post is deleted.
   */
  deletePost(postId: string): Promise<void>;

  /**
   * Edits a post's caption.
   * @param caption - The new caption.
   * @param postId - The ID of the post to edit.
   * @returns The updated post details.
   */
  editPost(caption: string, postId: string): Promise<{ postId: string | undefined; caption: string | undefined }>;

  /**
   * Likes a post.
   * @param userId - The ID of the user liking the post.
   * @param postId - The ID of the post to like.
   * @returns A message and the ID of the post.
   */
  postLike(userId: string, postId: string): Promise<{ message: string; postId: string }>;

  /**
   * Records a view of a post.
   * @param postId - The ID of the post to view.
   * @returns A promise with the result of the view.
   */
  postView(postId: string): Promise<any>;

  /**
   * Adds a comment to a post.
   * @param postId - The ID of the post.
   * @param userId - The ID of the user commenting.
   * @param comment - The comment text.
   * @param s3 - S3 service operations.
   * @param next - The Next function for handling asynchronous operations.
   * @returns A promise with the result of the comment addition.
   */
  addComment(postId: string, userId: string, comment: string, s3: IS3Operations, next: Next): Promise<any>;

  /**
   * Edits an existing comment.
   * @param postId - The ID of the post.
   * @param commentId - The ID of the comment to edit.
   * @param userId - The ID of the user editing the comment.
   * @param updatedComment - The updated comment text.
   * @returns The updated comment.
   */
  editComment(postId: string, commentId: string, userId: string, updatedComment: string): Promise<IComment>;

  /**
   * Deletes a comment.
   * @param postId - The ID of the post.
   * @param commentId - The ID of the comment to delete.
   * @returns A promise that resolves when the comment is deleted.
   */
  deleteComment(postId: string, commentId: string): Promise<any>;

  /**
   * Changes the privacy setting of a user.
   * @param userId - The ID of the user.
   * @param isPrivacy - The new privacy setting.
   * @returns A promise with the result of the privacy change.
   */
  changePrivacy(userId: string, isPrivacy: boolean): Promise<any>;

  /**
   * Blocks a user.
   * @param id - The ID of the user to block.
   * @returns The blocked user.
   */
  blockUser(id: string): Promise<Iuser>;

  /**
   * Retrieves user details by ID.
   * @param id - The ID of the user.
   * @returns The user details or undefined if not found.
   */
  getUser(id: string): Promise<Iuser | undefined>;
}
