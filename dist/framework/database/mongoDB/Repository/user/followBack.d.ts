import userModel from "../../model/userModel";
export declare const followBack: (fromFollowingId: string, toFollowId: string, userModels: typeof userModel) => Promise<undefined>;
