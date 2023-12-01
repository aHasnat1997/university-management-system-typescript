// user type
export type TUser = {
    id: string,
    role: 'student' | 'teacher' | 'faculty',
    password: string,
    needChangePassword: boolean,
    status: 'progress' | 'blocked',
    isDeleted?: boolean
};