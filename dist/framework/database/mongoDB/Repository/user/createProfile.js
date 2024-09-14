import client from "../../../../elasticsearch/elasticsearchClient";
// Creatin profile with upload image to s3bucket
export const createProfile = async (userProfile, file, S3Operations, userModels) => {
    try {
        let imageName = "";
        if (file) {
            const buffer = file.buffer;
            const mimetype = file.mimetype;
            const originalname = file.originalname;
            const PutObjectParams = {
                originalname,
                buffer,
                mimetype,
            };
            imageName = await S3Operations.putObjectUrl(PutObjectParams);
        }
        const currentUser = await userModels.findOne({ email: userProfile.email });
        const updatedUser = await userModels.findOneAndUpdate({ email: userProfile.email }, {
            $set: {
                name: userProfile.name || currentUser?.name,
                profileImage: imageName || currentUser?.profileImage,
                bio: userProfile.bio || currentUser?.bio,
                country: userProfile.country || currentUser?.country,
                states: userProfile.city || currentUser?.states,
                skill: userProfile.skill || currentUser?.skill,
                picture: userProfile.picture || currentUser?.picture,
                imageKey: file ? file.originalname : currentUser?.imageKey,
                profile: true,
            },
        }, { new: true });
        // Index or update user in Elasticsearch
        if (updatedUser) {
            await client.index({
                index: "users",
                id: updatedUser._id.toString(),
                document: {
                    id: updatedUser._id.toString(),
                    name: updatedUser.name,
                    bio: updatedUser.bio,
                    skill: updatedUser.skill,
                    profileImage: updatedUser.profileImage,
                },
            });
        }
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating profile:", error);
        return undefined; // Handle error as needed
    }
};
