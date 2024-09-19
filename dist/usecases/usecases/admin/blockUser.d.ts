import { IadminRepository } from "../../interface/repositoryInterface/adminRepository";
export declare const blockUser: (id: string, adminRepository: IadminRepository) => Promise<{
    success: boolean;
    status: string;
    message: string;
}>;
