"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.createProfile = void 0;
const elasticsearchClient_js_1 = __importStar(require("../../../../elasticsearch/elasticsearchClient.js"));
// Creatin profile with upload image to s3bucket
const createProfile = (userProfile, file, S3Operations, userModels) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let imageName = "";
        if (file) {
            const buffer = file.buffer;
            const mimetype = file.mimetype;
            const originalname = file.originalname;
            const PutObjectParams = {
                originalname,
                buffer,
                mimetype,
            };
            imageName = yield S3Operations.putObjectUrl(PutObjectParams);
        }
        const currentUser = yield userModels.findOne({ email: userProfile.email });
        const updatedUser = yield userModels.findOneAndUpdate({ email: userProfile.email }, {
            $set: {
                name: userProfile.name || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.name),
                profileImage: imageName || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.profileImage),
                bio: userProfile.bio || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.bio),
                country: userProfile.country || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.country),
                states: userProfile.city || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.states),
                skill: userProfile.skill || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.skill),
                picture: userProfile.picture || (currentUser === null || currentUser === void 0 ? void 0 : currentUser.picture),
                imageKey: file ? file.originalname : currentUser === null || currentUser === void 0 ? void 0 : currentUser.imageKey,
                profile: true,
            },
        }, { new: true });
        // Index or update user in Elasticsearch
        const isConnected = yield (0, elasticsearchClient_js_1.checkElasticsearchConnection)();
        if (isConnected && updatedUser) {
            yield elasticsearchClient_js_1.default.index({
                index: "users",
                id: updatedUser._id.toString(),
                document: {
                    id: updatedUser._id.toString(),
                    name: updatedUser.name,
                    bio: updatedUser.bio,
                    skill: updatedUser.skill,
                    profileImage: updatedUser.profileImage,
                },
            });
        }
        else {
            console.log("Elasticsearch server is not reachable. Skipping indexing.");
        }
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        throw new Error(`Error updating profile: ${error.message}`);
    }
});
exports.createProfile = createProfile;
