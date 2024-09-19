export interface IgoogleProfile {
    id: string;
    displayName: string;
    emails: {
        value: string;
    }[];
}
export interface jwtPayload {
    id: string;
    email: string;
}
export interface IgoogleStrategyCallback {
    (accessToken: string, refreshToken: string, profile: IgoogleProfile, done: Function): Promise<void>;
}
export interface JwtStrategyCallback {
    (payload: jwtPayload, done: Function): void;
}
