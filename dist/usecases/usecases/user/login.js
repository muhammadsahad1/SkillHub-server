import { ErrorHandler } from '../../middlewares/errorMiddleware.js';
export const login = async (userRepository, jwt, hashedPassword, email, password, picture, next) => {
    try {
        let fetchUser = await userRepository.findByEmail(email);
        if (!fetchUser) {
            return next(new ErrorHandler(400, "User does not exist"));
        }
        console.log("fetchUser ", fetchUser);
        if (picture) {
            fetchUser = await userRepository.findByEmailUpdateOne(email, picture);
            const tokens = await jwt.createAccessAndRefreshToken(fetchUser?.id);
            return { fetchUser, tokens };
        }
        if (!fetchUser) {
            return next(new ErrorHandler(400, "User does not exist"));
        }
        if (fetchUser.blocked) {
            return next(new ErrorHandler(400, "Your account has been blocked"));
        }
        const checked = await hashedPassword.comparePassword(password, fetchUser.password);
        if (!checked) {
            return next(new ErrorHandler(400, "Invalid password"));
        }
        const tokens = await jwt.createAccessAndRefreshToken(fetchUser.id);
        return { fetchUser, tokens };
    }
    catch (error) {
        return next(new ErrorHandler(500, "An error occurred during login"));
    }
};
