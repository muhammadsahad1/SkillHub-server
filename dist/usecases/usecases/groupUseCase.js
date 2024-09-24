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
exports.GroupUseCase = void 0;
const index_js_1 = require("./group/index.js");
// ================================ GroupUseCase =========================== \\
class GroupUseCase {
    constructor(groupRepository) {
        this.groupRepository = groupRepository;
    }
    createGroup(groupData, creatorId, groupImageFile, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.createGroup)(groupData, creatorId, groupImageFile, this.groupRepository, next);
        });
    }
    getGroups(next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getGroups)(next, this.groupRepository);
        });
    }
    joinGroup(groupId, joinUserId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.joinGroup)(groupId, joinUserId, this.groupRepository, next);
        });
    }
    getGroup(groupId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.getGroup)(groupId, this.groupRepository, next);
        });
    }
    sendMessage(senderId, groupId, message, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.sendMessage)(senderId, groupId, message, this.groupRepository, next);
        });
    }
    messages(groupId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.messages)(groupId, this.groupRepository, next);
        });
    }
    updateOnlineStatus(groupId, userId, status, next) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log("usecaseil");
            return yield (0, index_js_1.updateOnlineStatus)(groupId, userId, status, this.groupRepository, next);
        });
    }
    leaveGroup(groupId, userId, next) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield (0, index_js_1.leaveGroup)(groupId, userId, this.groupRepository, next);
        });
    }
}
exports.GroupUseCase = GroupUseCase;
