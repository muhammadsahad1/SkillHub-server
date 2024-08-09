import { adminLogin, blockUser, getUsers } from "./admin/index";
// ================================= Admin user cases ================================= \\
export class AdminUseCase {
    adminRepostory;
    Jwt;
    hashPassword;
    sendEmail;
    s3;
    constructor(adminRepostory, Jwt, hashPassword, sendEmail, s3) {
        this.adminRepostory = adminRepostory;
        this.Jwt = Jwt;
        this.hashPassword = hashPassword;
        this.sendEmail = sendEmail;
        this.s3 = s3;
    }
    // ===================================================================>
    async adminLogin(email, password, next) {
        const result = await adminLogin(email, password, this.Jwt, this.hashPassword, this.adminRepostory, next);
        return result;
    }
    // ===================================================================>
    async getUsers(next) {
        const result = await getUsers(this.adminRepostory, next);
        return result;
    }
    // ===================================================================>
    async blockUser(id) {
        const result = await blockUser(id, this.adminRepostory);
        return result;
    }
}
