import { Next } from "../../../framework/types/serverPackageType";
import { ImessageRepository } from "../../interface/repositoryInterface/messageRepository";
export declare const markAsRead: (conversationId: string, userId: string, messageRepository: ImessageRepository, next: Next) => Promise<void>;
