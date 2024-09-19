import mongoose from "mongoose";
import userModel from "../../model/userModel";
export declare const myFollowers: (userId: string, userModels: typeof userModel) => Promise<{
    followersUsers: (mongoose.Document<unknown, {}, import("../../../../../commonEntities/entities/user").Iuser> & import("../../../../../commonEntities/entities/user").Iuser & Required<{
        _id: string;
    }>)[];
    following: mongoose.Types.ObjectId[] | mongoose.FlattenMaps<import("../../../../../commonEntities/entities/user").Iuser>[] | undefined;
} | undefined>;
