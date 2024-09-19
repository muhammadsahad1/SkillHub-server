import { INotification } from "../../../framework/database/mongoDB/model/notification";
import { Next } from "../../../framework/types/serverPackageType";
import { InotificationRepository } from "../../interface/repositoryInterface/notificationRepository";
export declare const notifications: (userId: string, notificationRepository: InotificationRepository, next: Next) => Promise<INotification[] | undefined | void>;
