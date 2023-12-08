import { Types } from "mongoose"

export type TTeacherName = {
    firstName: string,
    middleName: string,
    lastName: string
}

export type TTeacher = {
    id: string,
    userId: Types.ObjectId,
    name: TTeacherName,
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    designation: string;
    academicDepartment: string;
    profileImg?: string;
    isDeleted: boolean;
};