import userModel from "../../model/userModel";
export declare const followUp: (toFollowingId: string, fromFollowerId: string, userModels: typeof userModel) => Promise<undefined>;
