import { Types } from "mongoose"

export type TAdminName = {
    firstName: string,
    middleName: string,
    lastName: string
}

export type TAdmin = {
    id: string,
    userId: Types.ObjectId,
    name: TAdminName,
    gender: 'male' | 'female' | 'other';
    dateOfBirth?: Date;
    email: string;
    contactNo: string;
    emergencyContactNo: string;
    bloodGroup?: 'A+' | 'A-' | 'B+' | 'B-' | 'AB+' | 'AB-' | 'O+' | 'O-';
    presentAddress: string;
    permanentAddress: string;
    designation: string;
    managementDepartment: string;
    profileImg?: string;
    isDeleted: boolean;
};