export type TAuth = {
    id: string,
    password: string
};

export type TJwtPayload = {
    userId: string,
    role: string
}