import client from "../elasticsearch/elasticsearchClient";
export const indexUser = async (user) => {
    try {
        const response = await client.index({
            index: "users",
            id: user._id,
            document: user,
        });
        return response;
    }
    catch (error) {
        throw new Error(`Error indexing user: ${error.message}`);
    }
};
export const searchUsers = async (query, s3) => {
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
        const users = await Promise.all(result.hits.hits.map(async (hit) => {
            const profileImageName = hit._source?.profileImage;
            const profileImageUrl = profileImageName
                ? await s3.getObjectUrl({
                    bucket: process.env.C3_BUCKET_NAME,
                    key: profileImageName,
                })
                : undefined;
            const user = {
                _id: hit._source?.id.toString(),
                name: hit._source?.name,
                bio: hit._source?.bio,
                skill: hit._source?.skill,
                profileImageUrl: profileImageUrl,
            };
            return user;
        }));
        return users;
    }
    catch (error) {
        throw new Error(`Error searching users: ${error.message}`);
    }
};
