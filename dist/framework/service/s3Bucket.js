import { S3Client, PutObjectCommand, GetObjectCommand, } from "@aws-sdk/client-s3";
import crypto from "crypto";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import NodeCache from "node-cache"; //using for cache machanisim
const cache = new NodeCache({
    stdTTL: 86400,
    checkperiod: 3600,
    maxKeys: 10000,
});
export class S3Operations {
    s3Client;
    bucketName;
    constructor(region, accessKeyId, secretAccessKey, bucketName) {
        this.s3Client = new S3Client({
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
            region: region,
        });
        this.bucketName = bucketName;
    }
    // uploading bolb data
    async putObjectUrl({ originalname, buffer, mimetype, }) {
        const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");
        const imageName = randomImageName();
        const params = {
            Bucket: this.bucketName,
            Key: imageName,
            Body: buffer,
            ContentType: mimetype,
        };
        // here the blob data uploading
        const command = new PutObjectCommand(params);
        try {
            await this.s3Client.send(command);
            return imageName;
        }
        catch (error) {
            console.error(`Error uploading ${originalname} to S3 bucket ${this.bucketName}:`, error);
            throw error;
        }
    }
    //getImage from s3 Bucket
    async getObjectUrl({ bucket, key, }) {
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
            const command = new GetObjectCommand(params);
            try {
                url = await getSignedUrl(this.s3Client, command, { expiresIn: 3600 });
                cache.set(cacheKey, url);
            }
            catch (error) {
                console.error("Error getting signed URL:", error);
                throw error;
            }
        }
        return url;
    }
}
