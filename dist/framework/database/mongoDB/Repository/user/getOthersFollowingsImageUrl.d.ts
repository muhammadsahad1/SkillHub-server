import { IS3Operations } from "../../../../service/s3Bucket";
import userModel from "../../model/userModel";
export declare const getOthersFollowingsImageUrl: (followings: any[] | undefined, myUserId: string, userModels: typeof userModel, s3: IS3Operations) => Promise<{
    _id: string;
    name: string;
    skill: string | undefined;
    country: string | undefined;
    imageUrl: string;
    coverImageUrl: string;
    isFollowing: boolean;
    isFollowingBack: boolean;
    relationship: string;
}[] | undefined>;
