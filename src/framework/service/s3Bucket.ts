import { S3Client, PutObjectCommand ,GetObjectCommand} from "@aws-sdk/client-s3";
import { Readable } from "stream";
import crypto from 'crypto'

import { getSignedUrl } from  "@aws-sdk/s3-request-presigner"


export type PutObjectParams = {
  originalname: string;
  buffer: Buffer | Uint8Array | Blob | string | Readable;
  mimetype: string;
};

export type getObjectParams = {
  bucket : string,
  key : string
}

export interface IS3Operations {
  putObjectUrl(params: PutObjectParams): Promise<void>;
}

export class S3Operations implements IS3Operations {
  private s3Client: S3Client;
  private bucketName: string;

  constructor(region: string, accessKeyId: string, secretAccessKey: string, bucketName: string) {
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
  async putObjectUrl({ originalname, buffer, mimetype }: PutObjectParams): Promise<void> {
    const randomImageName = (bytes = 32) => crypto.randomBytes(bytes).toString('hex')
    const imageName = randomImageName()
    const params = {
      Bucket: this.bucketName,
      Key: imageName, // Ensure Key is capitalized correctly
      Body: buffer,
      ContentType: mimetype,
    };

    const command = new PutObjectCommand(params);

    try {
      const data = await this.s3Client.send(command);
      console.log(`Uploaded ${originalname} to S3 bucket ${this.bucketName}`);
      console.log('Upload response:', data);
    } catch (error) {
      console.error(`Error uploading ${originalname} to S3 bucket ${this.bucketName}:`, error);
      throw error;
    }
  }

  //getImage from s3 Bucket
 async getObjectUrl({bucket ,key} : getObjectParams) : Promise<string | undefined>{
  const params = {
    Bucket : bucket,
    Key : key
  }

  const command = new GetObjectCommand(params)
  try {
    const url = await getSignedUrl(this.s3Client,command,{expiresIn : 3600})
    return url
  } catch (error) {
    console.log(error)
  }
 }
}
