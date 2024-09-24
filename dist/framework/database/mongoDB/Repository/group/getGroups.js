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
exports.getGroups = void 0;
const getGroups = (groupModel, s3Operations) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const groups = yield groupModel.find({}).sort({ createdAt: -1 });
        const groupsWithImageUrl = yield Promise.all(groups.map((grp) => __awaiter(void 0, void 0, void 0, function* () {
            const groupImageName = grp === null || grp === void 0 ? void 0 : grp.groupImage;
            let groupImageUrl = "";
            if (groupImageName) {
                groupImageUrl = yield s3Operations.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: groupImageName,
                });
            }
            return Object.assign(Object.assign({}, grp.toObject()), { groupImageUrl });
        })));
        console.log("groups =>", groupsWithImageUrl);
        return groupsWithImageUrl;
    }
    catch (error) {
        console.error("Error fetching groups:", error);
        return undefined;
    }
});
exports.getGroups = getGroups;
