export const uploadCoverImage = async (userModels, userId, file, S3Operations) => {
    try {
        const buffer = file.buffer;
        const mimetype = file.mimetype;
        const originalname = file.originalname;
        const PutObjectParams = {
            originalname,
            buffer,
            mimetype,
        };
        const imageName = await S3Operations.putObjectUrl(PutObjectParams);
        const updatedUser = await userModels.findOneAndUpdate({ _id: userId }, { $set: { coverImage: imageName, coverImageKey: file.originalname } }, { new: true });
        return updatedUser;
    }
    catch (error) {
        console.error("Error updating : cover image", error);
        return undefined; // Handle error as needed
    }
};
