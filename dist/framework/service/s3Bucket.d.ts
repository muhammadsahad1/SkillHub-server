import { Readable } from "stream";
export type PutObjectParams = {
    originalname: string;
    buffer: Buffer | Uint8Array | Blob | string | Readable;
    mimetype: string;
};
export type getObjectParams = {
    bucket: string;
    key: string;
};
export interface IS3Operations {
    putObjectUrl(params: PutObjectParams): Promise<string>;
    getObjectUrl(params: getObjectParams): Promise<any>;
}
export declare class S3Operations implements IS3Operations {
    private s3Client;
    private bucketName;
    constructor(region: string, accessKeyId: string, secretAccessKey: string, bucketName: string);
    putObjectUrl({ originalname, buffer, mimetype, }: PutObjectParams): Promise<string>;
    getObjectUrl({ bucket, key, }: getObjectParams): Promise<string | unknown>;
}
