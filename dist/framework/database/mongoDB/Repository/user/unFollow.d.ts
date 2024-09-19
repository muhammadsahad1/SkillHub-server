import userModel from "../../model/userModel";
export declare const unFollow: (toUnFollowId: string, fromFollowerId: string, userModels: typeof userModel) => Promise<undefined>;
