const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "200", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1300", 10);
const tokenProductionMode = process.env.NODE_ENV === "production";
export const accessTokenOption = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: tokenProductionMode,
};
export const refreshTokenOption = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: tokenProductionMode,
};
export const roleOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: "none",
    secure: tokenProductionMode,
};
