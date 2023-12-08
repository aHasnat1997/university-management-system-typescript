// user type
export type TUser = {
    id: string,
    role: 'student' | 'teacher' | 'admin',
    password: string,
    needChangePassword: boolean,
    status: 'progress' | 'blocked',
    isDeleted?: boolean
};