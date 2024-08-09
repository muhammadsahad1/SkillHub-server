import { ErrorHandler } from "../../middlewares/errorMiddleware";
export const adminLogin = async (email, password, jwt, hashedPassword, adminRepository, next) => {
    const admin = await adminRepository.adminLogin(email);
    // ensure admin
    if (admin?.role === "user") {
        console.log("is user");
        return next(new ErrorHandler(403, "Not authorized"));
    }
    else {
        // campare for ensure the admin password
        const match = await hashedPassword.comparePassword(password, admin?.password);
        if (!match) {
            return next(new ErrorHandler(401, "Invalid email or password"));
        }
        // generating token
        const Tokens = await jwt.createAccessAndRefreshToken(admin?.id);
        console.log("Tokenssssss => admin ==>", Tokens);
        return {
            success: true,
            tokens: Tokens,
            message: "successfully authorized admin",
            admin: {
                id: admin?.id,
                email: admin?.email,
            },
        };
    }
};