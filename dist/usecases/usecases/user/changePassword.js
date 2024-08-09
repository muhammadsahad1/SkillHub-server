import { ErrorHandler } from '../../middlewares/errorMiddleware';
export const changePassword = async (userId, currentPassword, newPassword, hashPassword, userRepository, next) => {
    try {
        console.log("kerii");
        const user = await userRepository.getUser(userId);
        console.log("user geted", user);
        if (!user) {
            return next(new ErrorHandler(400, "User is not found"));
        }
        const compare = await hashPassword.comparePassword(currentPassword, user?.password);
        console.log("compare", compare);
        if (!compare) {
            return { success: false, message: "Current password is incorrect" };
        }
        const hashedPassword = await hashPassword.createHash(currentPassword);
        await userRepository.findByIdUpdateUpdateOne(userId, hashedPassword);
        return {
            success: true,
            message: "Pasword changed successfully",
        };
    }
    catch (error) {
        return next(new ErrorHandler(500, "Internal Server Error"));
    }
};
