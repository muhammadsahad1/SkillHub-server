import client from "../elasticsearch/elasticsearchClient";
import { Iuser } from "../../commonEntities/entities/user";
import { IS3Operations } from "./s3Bucket";

interface User {
  _id: string;
  name: string;
  bio?: string;
  skill?: string;
  profileImageUrl?: string;
}

// interfaces/elasticsearchService.ts
export interface IElasticsearchService {
  indexUser(user: User): Promise<any>;
  searchUsers(query: string, s3: IS3Operations): Promise<User[]>;
}

export const indexUser: IElasticsearchService["indexUser"] = async (
  user: User
) => {
  try {
    const response = await client.index({
      index: "users",
      id: user._id,
      document: user,
    });
    return response;
  } catch (error: any) {
    throw new Error(`Error indexing user: ${error.message}`);
  }
};

export const searchUsers: IElasticsearchService["searchUsers"] = async (
  query: string,
  s3: IS3Operations
): Promise<User[]> => {
  try {
    const result = await client.search({
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

    const users = await Promise.all(
      result.hits.hits.map(async (hit: any) => {
        const profileImageName = hit._source?.profileImage;
        const profileImageUrl = profileImageName
          ? await s3.getObjectUrl({
              bucket: process.env.C3_BUCKET_NAME,
              key: profileImageName,
            })
          : undefined;

  
        const user: User = {
          _id: hit._source?.id.toString(),
          name: hit._source?.name,
          bio: hit._source?.bio,
          skill: hit._source?.skill,
          profileImageUrl: profileImageUrl,
        };

        return user;
      })
    );

    return users;
  } catch (error: any) {
    throw new Error(`Error searching users: ${error.message}`);
  }
};
