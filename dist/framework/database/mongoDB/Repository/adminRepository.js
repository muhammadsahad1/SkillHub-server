import { findByEmail } from "./user.js";
import { blockUser, changeEventStatus, changeVerifyStatus, dashBoardData, getEvents, getReports, getUsers, getVerificationRequests, reportAction } from "./admin/index.js";
export class AdminRepository {
    userModels;
    verificationRequestsModel;
    eventModel;
    reportModel;
    postModel;
    notifcationModel;
    groupModel;
    constructor(userModels, verificationRequestsModel, eventModel, reportModel, postModel, notifcationModel, groupModel) {
        this.userModels = userModels;
        this.verificationRequestsModel = verificationRequestsModel;
        this.eventModel = eventModel;
        this.reportModel = reportModel;
        this.postModel = postModel;
        this.notifcationModel = notifcationModel;
        this.groupModel = groupModel;
    }
    async adminLogin(email) {
        return await findByEmail(this.userModels, email);
    }
    async getUsers() {
        return await getUsers(this.userModels);
    }
    async getVerificationRequests() {
        return await getVerificationRequests(this.verificationRequestsModel);
    }
    async changeVerifyStatus(requesId, status) {
        return await changeVerifyStatus(requesId, status, this.userModels, this.verificationRequestsModel);
    }
    async getEvents() {
        return await getEvents(this.eventModel, this.userModels);
    }
    async changeEventStatus(requestId, status) {
        return await changeEventStatus(requestId, status, this.eventModel);
    }
    async getReports(s3Operations) {
        return await getReports(this.reportModel, this.postModel, s3Operations);
    }
    async blockUser(id) {
        return await blockUser(id, this.userModels);
    }
    async reportAction(reportId, status) {
        return await reportAction(reportId, status, this.reportModel, this.postModel, this.notifcationModel);
    }
    async dashBoardData() {
        return await dashBoardData(this.postModel, this.groupModel, this.eventModel, this.userModels);
    }
}
