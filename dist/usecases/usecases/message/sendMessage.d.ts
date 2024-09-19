import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";
export declare const sendMessage: (senderId: string, receiverId: string, message: string, messageRepository: ImessageRepository, next: Next) => Promise<void | {
    success: boolean;
    result: any;
}>;
