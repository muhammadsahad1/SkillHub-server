export const sendImage = async (senderId, receiverId, file, messageRepository, s3Operations, next) => {
    try {
        console.log("useCasilKeti");
        const result = await messageRepository.sendImage(senderId, receiverId, file, s3Operations);
        return result;
    }
    catch (error) {
    }
};
