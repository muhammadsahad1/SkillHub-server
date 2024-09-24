"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRepository = void 0;
const index_js_1 = require("./admin/index.js");
class AdminRepository {
    constructor(userModels, verificationRequestsModel, eventModel, reportModel, postModel, notifcationModel, groupModel) {
        this.userModels = userModels;
        this.verificationRequestsModel = verificationRequestsModel;
        this.eventModel = eventModel;
        this.reportModel = reportModel;
        this.postModel = postModel;
        this.notifcationModel = notifcationModel;
        this.groupModel = groupModel;
    }
    adminLogin(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.findByEmail)(this.userModels, email);
        });
    }
    getUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getUsers)(this.userModels);
        });
    }
    getVerificationRequests() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getVerificationRequests)(this.verificationRequestsModel);
        });
    }
    changeVerifyStatus(requesId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.changeVerifyStatus)(requesId, status, this.userModels, this.verificationRequestsModel);
        });
    }
    getEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getEvents)(this.eventModel, this.userModels);
        });
    }
    changeEventStatus(requestId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.changeEventStatus)(requestId, status, this.eventModel);
        });
    }
    getReports(s3Operations) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getReports)(this.reportModel, this.postModel, s3Operations);
        });
    }
    blockUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.blockUser)(id, this.userModels);
        });
    }
    reportAction(reportId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.reportAction)(reportId, status, this.reportModel, this.postModel, this.notifcationModel);
        });
    }
    dashBoardData() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.dashBoardData)(this.postModel, this.groupModel, this.eventModel, this.userModels);
        });
    }
}
exports.AdminRepository = AdminRepository;
