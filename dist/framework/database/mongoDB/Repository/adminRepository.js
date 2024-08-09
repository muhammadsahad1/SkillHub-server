import { findByEmail } from "./user";
import { blockUser, getUsers } from './admin/index';
export class AdminRepository {
    userModels;
    constructor(userModels) {
        this.userModels = userModels;
    }
    async adminLogin(email) {
        return await findByEmail(this.userModels, email);
    }
    async getUsers() {
        return await getUsers(this.userModels);
    }
    async blockUser(id) {
        return await blockUser(id, this.userModels);
    }
}
