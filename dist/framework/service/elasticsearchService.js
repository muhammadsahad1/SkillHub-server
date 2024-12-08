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
exports.searchUsers = exports.indexUser = void 0;
const elasticsearchClient_1 = __importStar(require("../elasticsearch/elasticsearchClient"));
const indexUser = (user) => __awaiter(void 0, void 0, void 0, function* () {
    // Check if Elasticsearch is connected
    const isConnected = yield (0, elasticsearchClient_1.checkElasticsearchConnection)();
    if (!isConnected) {
        console.log("Skipping Elasticsearch indexing as server is not reachable");
        return;
    }
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
    // Check if Elasticsearch is connected
    const isConnected = yield (0, elasticsearchClient_1.checkElasticsearchConnection)();
    if (!isConnected) {
        console.log("Skipping Elasticsearch search as server is not reachable");
        return [];
    }
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
