import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
export declare const markAsRead: (notificationId: string, notificationRepository: InotificationRepository, next: Next) => Promise<void>;
