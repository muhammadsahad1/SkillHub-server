import userModel from "../../model/userModel";
type UserModelType = typeof userModel;
export declare const getOthersFollowers: (userId: string, userModel: UserModelType) => Promise<import("mongoose").Types.ObjectId[] | import("../../../../../commonEntities/entities/user").Iuser[] | undefined>;
export {};
