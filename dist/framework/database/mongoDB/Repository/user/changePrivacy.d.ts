import userModel from "../../model/userModel";
export declare const changePrivacy: (userId: string, isPrivacy: boolean, userModelS: typeof userModel) => Promise<(import("mongoose").Document<unknown, {}, import("../../../../../commonEntities/entities/user").Iuser> & import("../../../../../commonEntities/entities/user").Iuser & Required<{
    _id: string;
}>) | null>;
