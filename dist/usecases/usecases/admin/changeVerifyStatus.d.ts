import { Server } from "socket.io";
import { Next } from "../../../framework/types/serverPackageType";
import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const changeVerifyStatus: (requestId: string, status: "Pending" | "Approved" | "Rejected", adminRepostory: IadminRepository, io: Server, next: Next) => Promise<void | {
    success: boolean;
}>;
