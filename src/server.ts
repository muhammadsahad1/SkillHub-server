// import { S3Client, ListObjectsV2Command,GetObjectCommand ,PutObjectCommand} from "@aws-sdk/client-s3";  
// import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

// const s3Client = new S3Client({
//   region : 'eu-north-1',
//   credentials : {
//     accessKeyId : process.env.C3_ACCESS_KEY,
//     secretAccessKey :process.env.C3_SCERET_KEY
//   }
// })

// // list the bucket List
// async function listObjects(){
//  const command =  new ListObjectsV2Command({
//     Bucket : 'skillhubucket',
//     key : '/' 
//   })
//   const result = await s3Client.send(command)
//   console.log("=================",result)
// }

// // putUrl Upload Images in to pariticular Bucket
// async function putObjectUrl(filename,contentType){
//   const command = new PutObjectCommand({
//     Bucket : 'skillhubucket',
//     key : `user/upload/${filename}`,
//     ContentType : contentType
//   })

//   const url = await getSignedUrl(s3Client,command)
//   return url
// }

// // getUrl Images of pariticular Bucket
// async function getObjectUrl(key: string){
//   const command = new GetObjectCommand({
//     Bucket : 'skillhubucket',
//     Key: key
//   })
//   const url = await getSignedUrl(s3Client,command)
//   return url
// }

// async function init() {
  
//   console.log()
//   console.log("url image ===>EA50BAEA-CAAB-46B1-834E-1753D381590D.jpeg", await getObjectUrl('EA50BAEA-CAAB-46B1-834E-1753D381590D.jpeg'))
// }
// init()


import express from "express";
import connectDB from "./framework/webServer/config/db";
import dotenv from "dotenv";
import { userRoute } from "./framework/webServer/routes/userRoute";
import cookieParser from "cookie-parser";
import errorHandler from "./usecases/middlewares/errorMiddleware";
import cors from "cors";
import passport from 'passport'

dotenv.config();
connectDB();

const app = express();

app.use(
  cors({
    origin: "http://localhost:5173",
    methods : 'GET,POST,PUT,DELETE',
    credentials: true,
  })
);
app.options('*',cors())

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const router = express.Router();
app.use("/user", userRoute(router));

app.use(errorHandler)

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running here http://localhost:${PORT}`);
});
