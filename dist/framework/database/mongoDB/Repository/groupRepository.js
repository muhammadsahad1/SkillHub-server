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
exports.GroupRepository = void 0;
const index_js_1 = require("./group/index.js");
class GroupRepository {
    constructor(groupModel, s3Operations, userModels, groupMessageModel) {
        this.groupModel = groupModel;
        this.s3Operations = s3Operations;
        this.userModels = userModels;
        this.groupMessageModel = groupMessageModel;
    }
    createGroup(groupData, creatorId, groupImageFile) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.createGroup)(groupData, creatorId, groupImageFile, this.s3Operations, this.groupModel);
        });
    }
    getGroups() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getGroups)(this.groupModel, this.s3Operations);
        });
    }
    joinGroup(groupId, joinUserId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.joinGroup)(groupId, joinUserId, this.groupModel);
        });
    }
    getGroup(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getGroup)(groupId, this.s3Operations, this.groupModel, this.userModels);
        });
    }
    sendMessage(senderId, groupId, message) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.sendMessage)(senderId, groupId, message, this.groupMessageModel);
        });
    }
    messages(groupId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.messages)(groupId, this.groupMessageModel, this.groupModel, this.userModels, this.s3Operations);
        });
    }
    updateOnlineStatus(groupId, userId, status) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.updateOnlineStatus)(groupId, userId, status, this.groupModel);
        });
    }
    leaveGroup(groupId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.leaveGroup)(groupId, userId, this.groupModel);
        });
    }
}
exports.GroupRepository = GroupRepository;
