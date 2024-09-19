import userModel from "../../model/userModel";
export declare const getOthersFollowings: (userId: string, userModels: typeof userModel) => Promise<import("mongoose").Types.ObjectId[] | import("../../../../../commonEntities/entities/user").Iuser[] | undefined>;
