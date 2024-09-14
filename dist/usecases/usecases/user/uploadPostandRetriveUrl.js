export const uploadPostandRetriveUrl = async (userId, file, caption, type, S3Operations, userRepository) => {
    try {
        console.log("vannoo ?sdfdsf");
        const result = await userRepository.uploadPostRetriveImageUrl(userId, file, caption, type, S3Operations);
        console.log("result ====> useCasill =>", result);
        if (!result) {
            return {
                success: false,
                message: "Post upload failed",
                post: null
            };
        }
        return {
            success: true,
            message: "Post created successfully",
            post: result
        };
    }
    catch (error) {
        console.error("Error in uploadPostandRetriveUrl:", error);
        return {
            success: false,
            message: "Internal Server Error",
            post: null
        };
    }
};
