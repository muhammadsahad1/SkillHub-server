import { IuserUseCase } from "../interface/usecase/userUseCase";
import { IuserRepository } from "../interface/repositoryInterface/userRepository";
import { Ijwt } from "../interface/service/jwt";
import { IotpRepository } from "../interface/repositoryInterface/otpRepository";
import { IotpGenerate } from "../interface/service/otpGenerate";
import { IhashPassword } from "../interface/service/hashPassword";
import { FetchProfileImageResponse, Iuser, IUserWithImages } from "../../commonEntities/entities/user";
import { IsendEmail } from "../interface/service/sendEmail";
import { Next } from "../../framework/types/serverPackageType";
import { IS3Operations } from "../../framework/service/s3Bucket";
import { IElasticsearchService } from "../../framework/service/elasticsearchService";
import { NextFunction } from "express";
import { Ipost } from "../../commonEntities/entities/post";
import { Server } from "socket.io";
import { InotificationRepository } from "../interface/repositoryInterface/notificationRepository";
import { VerifyRequest } from "../../commonEntities/entities/verificationRequest";
export declare class UserUseCase implements IuserUseCase {
    private userRepostory;
    private Jwt;
    private otpRepository;
    private hashPassword;
    private otpGenerate;
    private sendEmail;
    private s3;
    private elasticSearchService;
    private io;
    private notification;
    constructor(userRepostory: IuserRepository, Jwt: Ijwt, otpRepository: IotpRepository, hashPassword: IhashPassword, otpGenerate: IotpGenerate, sendEmail: IsendEmail, s3: IS3Operations, elasticSearchService: IElasticsearchService, io: Server, notification: InotificationRepository);
    userSignup(user: Iuser, next: Next): Promise<string | void | {
        success: boolean;
        message: string;
    }>;
    createUser(email: string, otp: string, next: Next): Promise<void | {
        success: boolean;
        user?: Iuser;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
        message?: string;
    }>;
    resendOtp(email: string, next: Next): Promise<void>;
    login(user: Iuser, next: Next): Promise<{
        fetchUser?: Iuser | void;
        tokens: {
            accessToken: string;
            refreshToken: string;
        };
    } | void>;
    forgotPassword(email: string, next: Next): Promise<void | {
        success: boolean;
        token: string;
        user: Iuser;
        message: string;
    }>;
    resetPassword(password: string, resetToken: string, next: Next): Promise<{
        success: boolean;
        user?: Iuser;
        message?: string;
    } | void>;
    getUser(userId: string, next: Next): Promise<Iuser | undefined | void>;
    changePassword(userId: string, currentPassword: string, newPassword: string, next: Next): Promise<{
        success: boolean;
        message: string;
    } | any>;
    createProfile(user: Iuser, file: Express.Multer.File, next: Next): Promise<void | {
        success: boolean;
        user?: Iuser;
        message?: string;
    }>;
    verifyRequest(userId: string, requestData: VerifyRequest, next: Next): Promise<{
        success: boolean;
    } | void>;
    uploadCoverImage(userId: string, file: Express.Multer.File, next: Next): Promise<Iuser | void>;
    getProfileImage(userId: string, next: Next): Promise<{
        success: boolean;
        imageUrls: FetchProfileImageResponse | undefined;
        message?: string;
    } | void>;
    changePrivacy(userId: string, isPrivacy: boolean, next: Next): Promise<any>;
    showNotification(userId: string, isShowNotification: boolean, next: Next): Promise<{
        success: boolean;
        status: boolean;
    } | any>;
    getSkillRelatedUsers(userId: string, skill: string, next: Next): Promise<{
        success: boolean;
        userDetails: IUserWithImages[] | undefined;
    } | void>;
    getUserDetails(userId: string, next: Next): Promise<{
        success: boolean;
        user: Iuser;
    } | void>;
    userFollowUp(toFollowingId: string, fromFollowerId: string, next: Next): Promise<void>;
    getMyFollowings(userId: string, next: Next): Promise<IUserWithImages[] | void>;
    myFollowers(userId: string, next: Next): Promise<Iuser[]>;
    unFollow(toUnfollowId: string, fromFollowerId: string, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
    removeFollower(fromRemoverId: string, toRemoveId: string, next: NextFunction): Promise<{
        success: boolean;
        message: string;
    }>;
    followBack(toFollowId: string, fromFollowingId: string, next: Next): Promise<{
        success: boolean;
        message: string;
    }>;
    othersFollowers(userId: string, currentUserId: string, next: Next): Promise<any>;
    othersFollowings(userId: string, currentUserId: string, next: Next): Promise<any>;
    uploadPost(userId: string, imageUrl: Express.Multer.File, caption: string, type: string): Promise<any>;
    uploadThoughts(userId: string, thoughts: string, next: Next): Promise<{
        success: boolean;
        thoughtPost: Ipost;
    } | void>;
    fetchPosts(userSkill: string, pageParam: number, next: Next): Promise<any>;
    fetchMyPosts(userId: string, next: Next): Promise<any>;
    postView(postId: string, next: Next): Promise<any>;
    fetchOthersPosts(userId: string, next: Next): Promise<any>;
    deletePost(postId: string, next: Next): Promise<any>;
    editPost(editedCaption: string, postId: string, next: Next): Promise<{
        success: boolean;
        message: string;
    }>;
    postLike(userId: string, postId: string, next: Next): Promise<any>;
    addComment(postId: string, userId: string, comment: string, next: Next): Promise<any>;
    delteComment(postId: string, commentId: string, next: Next): Promise<any>;
    editingComment(postId: string, commentId: string, userId: string, updateComment: string, next: Next): Promise<any>;
    searchUsers(query: string, next: Next): Promise<{
        success: boolean;
        message?: string;
        result: Iuser[];
    } | void>;
    reportPost(postId: string, reason: string, userId: string, next: Next): Promise<{
        success: boolean;
        message: string;
    } | void>;
}
