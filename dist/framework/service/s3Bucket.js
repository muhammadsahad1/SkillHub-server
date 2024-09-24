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
exports.S3Operations = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const crypto_1 = __importDefault(require("crypto"));
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const node_cache_1 = __importDefault(require("node-cache")); //using for cache machanisim
const cache = new node_cache_1.default({
    stdTTL: 86400,
    checkperiod: 3600,
    maxKeys: 10000,
});
class S3Operations {
    constructor(region, accessKeyId, secretAccessKey, bucketName) {
        this.s3Client = new client_s3_1.S3Client({
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
            region: region,
        });
        this.bucketName = bucketName;
    }
    // uploading bolb data
    putObjectUrl(_a) {
        return __awaiter(this, arguments, void 0, function* ({ originalname, buffer, mimetype, }) {
            const randomImageName = (bytes = 32) => crypto_1.default.randomBytes(bytes).toString("hex");
            const imageName = randomImageName();
            const params = {
                Bucket: this.bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: mimetype,
            };
            // here the blob data uploading
            const command = new client_s3_1.PutObjectCommand(params);
            try {
                yield this.s3Client.send(command);
                return imageName;
            }
            catch (error) {
                console.error(`Error uploading ${originalname} to S3 bucket ${this.bucketName}:`, error);
                throw error;
            }
        });
    }
    //getImage from s3 Bucket
    getObjectUrl(_a) {
        return __awaiter(this, arguments, void 0, function* ({ bucket, key, }) {
            if (!key) {
                throw new Error("No value provided for input HTTP label: Key");
            }
            const cacheKey = `${bucket}/${key}`;
            let url = cache.get(cacheKey);
            if (!url) {
                const params = {
                    Bucket: bucket,
                    Key: key,
                };
                const command = new client_s3_1.GetObjectCommand(params);
                try {
                    url = yield (0, s3_request_presigner_1.getSignedUrl)(this.s3Client, command, { expiresIn: 3600 });
                    cache.set(cacheKey, url);
                }
                catch (error) {
                    console.error("Error getting signed URL:", error);
                    throw error;
                }
            }
            return url;
        });
    }
}
exports.S3Operations = S3Operations;
