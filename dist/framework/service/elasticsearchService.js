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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.searchUsers = exports.indexUser = void 0;
const elasticsearchClient_1 = __importDefault(require("../elasticsearch/elasticsearchClient"));
const indexUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield elasticsearchClient_1.default.index({
            index: "users",
            id: user._id,
            document: user,
        });
        return response;
    }
    catch (error) {
        throw new Error(`Error indexing user: ${error.message}`);
    }
});
exports.indexUser = indexUser;
const searchUsers = (query, s3) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield elasticsearchClient_1.default.search({
            index: "users",
            query: {
                bool: {
                    should: [
                        {
                            prefix: {
                                name: query,
                            },
                        },
                        {
                            multi_match: {
                                query,
                                fields: ["bio", "skill"],
                                type: "best_fields",
                            },
                        },
                    ],
                },
            },
        });
        const users = yield Promise.all(result.hits.hits.map((hit) => __awaiter(void 0, void 0, void 0, function* () {
            var _a, _b, _c, _d, _e;
            const profileImageName = (_a = hit._source) === null || _a === void 0 ? void 0 : _a.profileImage;
            const profileImageUrl = profileImageName
                ? yield s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: profileImageName,
                })
                : undefined;
            const user = {
                _id: (_b = hit._source) === null || _b === void 0 ? void 0 : _b.id.toString(),
                name: (_c = hit._source) === null || _c === void 0 ? void 0 : _c.name,
                bio: (_d = hit._source) === null || _d === void 0 ? void 0 : _d.bio,
                skill: (_e = hit._source) === null || _e === void 0 ? void 0 : _e.skill,
                profileImageUrl: profileImageUrl,
            };
            return user;
        })));
        return users;
    }
    catch (error) {
        throw new Error(`Error searching users: ${error.message}`);
    }
});
exports.searchUsers = searchUsers;
