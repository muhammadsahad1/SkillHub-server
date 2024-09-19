import userModel from "../model/userModel";
import { FetchProfileImageResponse, Iuser, IUserWithImages } from "../../../../commonEntities/entities/user";
import { IuserRepository } from "../../../../usecases/interface/repositoryInterface/userRepository";
import { IS3Operations } from "../../../service/s3Bucket";
import PostModel from "../model/postModel";
import { Next } from "../../../types/serverPackageType";
import { IComment, Ipost } from "../../../../commonEntities/entities/post";
import { VerificationRequestModal } from "../model/VerificationRequest";
import { VerifyRequest } from "../../../../commonEntities/entities/verificationRequest";
import ReportModel from "../model/reportRequest";
export declare class UserRepository implements IuserRepository {
    private userModels;
    private postModels;
    private verificationRequestModal;
    private requestModel;
    constructor(userModels: typeof userModel, postModels: typeof PostModel, verificationRequestModal: typeof VerificationRequestModal, requestModel: typeof ReportModel);
    createProfile(userProfile: Iuser, file: Express.Multer.File, S3Operations: IS3Operations): Promise<Iuser | void>;
    verifyRequest(userId: string, requestData: VerifyRequest): Promise<{
        success: boolean;
    } | undefined>;
    createUser(newUser: Iuser): Promise<Iuser | void | {
        success: boolean;
        user?: Iuser;
        token: {
            accessToken: string;
            refreshToken: string;
        };
        message?: string;
    }>;
    findByEmail(email: string): Promise<Iuser | void>;
    findByEmailUpdateOne(email: string, picture: string): Promise<Iuser | void>;
    findOneUpdateResetToken(email: string, resetToken: string): Promise<Iuser | void>;
    getSkillRelatedUsers(userId: string, skill: string, s3Bucket: IS3Operations): Promise<IUserWithImages[] | undefined>;
    getUserDetails(userId: string): Promise<Iuser>;
    resetPasswordVerify(password: string, token: string): Promise<Iuser | null | void>;
    fetchProfileImage(S3Operations: IS3Operations, userId: string): Promise<FetchProfileImageResponse | undefined>;
    uploadeCoverImage(userId: string, file: Express.Multer.File, S3Operations: IS3Operations): Promise<Iuser | void>;
    findByIdUpdateUpdateOne(userId: string, password: string): Promise<Iuser | null | void>;
    changeShowNotification(userId: string, isShowNotification: boolean): Promise<{
        status: boolean;
    }>;
    followUp(toFollowingId: string, fromFollowerId: string): Promise<void>;
    getUser(userId: string): Promise<Iuser | undefined>;
    getMyFollowing(userId: string, S3Operations: IS3Operations): Promise<IUserWithImages[] | undefined>;
    unFollow(toUnFollowId: string, fromFollowerId: string): Promise<void>;
    myFollowers(userId: string, S3Operations: IS3Operations): Promise<any>;
    removeFollower(fromRemoverId: string, toRemoveId: string): Promise<void>;
    followBack(fromFollowingId: string, toFollowId: string): Promise<void>;
    othersFollowers(userId: string, currentUserId: string, S3Operations: IS3Operations): Promise<any>;
    othersFollowings(userId: string, currentUserId: string, s3: IS3Operations): Promise<any>;
    uploadPostRetriveImageUrl(userId: string, file: Express.Multer.File, caption: string, type: string, s3: IS3Operations): Promise<any>;
    uploadThoughts(userId: string, thoughts: string): Promise<{
        success: boolean;
        thoughtPost: Ipost;
    } | void>;
    fetchPosts(userSkill: string, pageParam: number, s3: IS3Operations): Promise<any>;
    deletePost(postId: string): Promise<void>;
    editPost(caption: string, postId: string): Promise<any>;
    postLike(userId: string, postId: string): Promise<{
        message: string;
        postId: string | undefined;
        postUserId: string | undefined;
    }>;
    addComment(postId: string, userId: string, comment: string, s3: IS3Operations, next: Next): Promise<any>;
    fetchMyPosts(userId: string, s3: IS3Operations): Promise<any>;
    fetchOthersPosts(userId: string, s3: IS3Operations): Promise<any>;
    postView(postId: string): Promise<any>;
    editComment(postId: string, commentId: string, userId: string, updatedComment: string): Promise<IComment | void>;
    deleteComment(postId: string, commentId: string): Promise<any>;
    changePrivacy(userId: string, isPrivacy: boolean): Promise<any>;
    reportPost(postId: string, reason: string, userId: string): Promise<{
        success: boolean;
        message: string;
    } | void>;
    getAllUsers(): Promise<string>;
    blockUser(id: string): Promise<any>;
}
