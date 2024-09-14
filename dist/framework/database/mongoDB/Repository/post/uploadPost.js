export const uploadPost = async (userId, file, caption, type, s3, userModels, postModels) => {
    try {
        let imageName = "";
        let signedUrl = "";
        if (file) {
            const buffer = file.buffer;
            const mimetype = file.mimetype;
            const originalname = file.originalname;
            const putObjectParams = {
                originalname,
                buffer,
                mimetype,
            };
            // uploading the image to s3 bucket
            imageName = await s3.putObjectUrl(putObjectParams);
        }
        const newPost = {
            userId: userId,
            imageName: imageName,
            caption: caption || "",
            type: type,
        };
        // here creating post
        const createdPost = await postModels.create(newPost);
        // retrive the image url in s3
        signedUrl = await s3.getObjectUrl({
            bucket: process.env.C3_BUCKET_NAME,
            key: imageName,
        });
        const currentUser = await userModels.findById(userId);
        const skill = currentUser?.skill;
        const postWithUrl = {
            ...createdPost.toObject(),
            signedUrl: signedUrl,
            skill: skill,
            userId: currentUser?._id,
        };
        // returning the created post and post url
        return postWithUrl;
    }
    catch (error) {
        console.error("Error uploading post:", error);
        return {
            success: false,
            message: "Error uploading post",
            error: error.message,
        };
    }
};
