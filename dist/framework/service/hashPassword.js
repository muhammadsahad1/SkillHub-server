import bcrypt from 'bcryptjs';
export class Encrypt {
    constructor() { }
    async createHash(password) {
        const hashPassword = await bcrypt.hash(password, 10);
        return hashPassword;
    }
    async comparePassword(password, hashPassword) {
        const matchedPassword = await bcrypt.compare(password, hashPassword);
        return matchedPassword;
    }
}
