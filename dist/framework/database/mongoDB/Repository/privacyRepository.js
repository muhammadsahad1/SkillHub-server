import { changePrivacy } from "./user";
export class PrivacyRepository {
    privacyModel;
    constructor(privacyModel) {
        this.privacyModel = privacyModel;
    }
    async changePrivacy(userId, isPrivacy) {
        return await changePrivacy(userId, isPrivacy, this.privacyModel);
    }
}
