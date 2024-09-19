interface ItokenOption {
    expires: Date;
    maxAge: number;
    httpOnly: boolean;
    sameSite: "lax" | "strict" | "none" | undefined;
    secure?: boolean;
}
export declare const accessTokenOption: ItokenOption;
export declare const refreshTokenOption: ItokenOption;
export declare const roleOptions: ItokenOption;
export {};
