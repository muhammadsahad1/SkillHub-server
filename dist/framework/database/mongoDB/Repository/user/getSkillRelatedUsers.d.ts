import userModel from "../../model/userModel";
export declare const getSkillRelatedUsers: (userId: string, skill: string, userModels: typeof userModel) => Promise<(import("mongoose").Document<unknown, {}, import("../../../../../commonEntities/entities/user").Iuser> & import("../../../../../commonEntities/entities/user").Iuser & Required<{
    _id: string;
}>)[] | undefined>;
