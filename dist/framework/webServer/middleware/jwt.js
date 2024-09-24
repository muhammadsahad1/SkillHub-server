"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleOptions = exports.refreshTokenOption = exports.accessTokenOption = void 0;
const accessTokenExpire = parseInt(process.env.ACCESS_TOKEN_EXPIRE || "200", 10);
const refreshTokenExpire = parseInt(process.env.REFRESH_TOKEN_EXPIRE || "1300", 10);
const tokenProductionMode = process.env.NODE_ENV === "production";
exports.accessTokenOption = {
    expires: new Date(Date.now() + accessTokenExpire * 60 * 60 * 1000),
    maxAge: accessTokenExpire * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: tokenProductionMode ? "none" : "lax", // Use lowercase 'none'
    secure: tokenProductionMode,
};
exports.refreshTokenOption = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: tokenProductionMode ? "none" : "lax",
    secure: tokenProductionMode,
};
exports.roleOptions = {
    expires: new Date(Date.now() + refreshTokenExpire * 24 * 60 * 60 * 1000),
    maxAge: refreshTokenExpire * 24 * 60 * 60 * 1000,
    httpOnly: true,
    sameSite: tokenProductionMode ? "none" : "lax",
    secure: tokenProductionMode,
};
