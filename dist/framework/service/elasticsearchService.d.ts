import { IS3Operations } from "./s3Bucket";
interface User {
    _id: string;
    name: string;
    bio?: string;
    skill?: string;
    profileImageUrl?: string;
}
export interface IElasticsearchService {
    indexUser(user: User): Promise<any>;
    searchUsers(query: string, s3: IS3Operations): Promise<User[]>;
}
export declare const indexUser: IElasticsearchService["indexUser"];
export declare const searchUsers: IElasticsearchService["searchUsers"];
export {};
