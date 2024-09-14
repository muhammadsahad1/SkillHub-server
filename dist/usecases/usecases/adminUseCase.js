import { adminLogin, blockUser, changeEventsStatus, changeVerifyStatus, getEvents, getUsers, getVerificationRequests, getReports, reportAction, dashBoardData } from "./admin/index";
// ================================= Admin user cases ================================= \\
export class AdminUseCase {
    adminRepostory;
    Jwt;
    hashPassword;
    sendEmail;
    s3;
    io;
    constructor(adminRepostory, Jwt, hashPassword, sendEmail, s3, io) {
        this.adminRepostory = adminRepostory;
        this.Jwt = Jwt;
        this.hashPassword = hashPassword;
        this.sendEmail = sendEmail;
        this.s3 = s3;
        this.io = io;
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
    async getVerificationRequests(next) {
        const result = await getVerificationRequests(this.adminRepostory, next);
        return result;
    }
    async changeVerifyStatus(requesId, status, next) {
        const result = await changeVerifyStatus(requesId, status, this.adminRepostory, this.io, next);
        return result;
    }
    // ===================================================================>
    async getEvents(next) {
        return await getEvents(next, this.adminRepostory);
    }
    // ===================================================================>
    async changeEventStatus(requestId, action, next) {
        return await changeEventsStatus(requestId, action, this.adminRepostory, next);
    }
    // ===================================================================>
    async blockUser(id) {
        const result = await blockUser(id, this.adminRepostory);
        return result;
    }
    // ===================================================================>
    async getReports(next) {
        return await getReports(next, this.adminRepostory, this.s3);
    }
    async reportAction(reportId, status, next) {
        return await reportAction(reportId, status, this.adminRepostory, next);
    }
    async dashBoardData(next) {
        return await dashBoardData(this.adminRepostory, next);
    }
}
