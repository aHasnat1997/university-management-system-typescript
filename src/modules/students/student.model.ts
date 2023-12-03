import { Schema, model } from "mongoose";
import { TGuardian, TLocalGuardian, TStudent, TUserName } from "./student.interface";

const UserNameSchema = new Schema<TUserName>({
    firstName: {
        type: String,
        required: [true, 'First Name is required'],
        trim: true,
    },
    middleName: {
        type: String,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
        required: [true, 'Last Name is required'],
    },
});

const GuardianSchema = new Schema<TGuardian>({
    fatherName: {
        type: String,
        trim: true,
        required: [true, 'Father Name is required'],
    },
    fatherOccupation: {
        type: String,
        trim: true,
        required: [true, 'Father occupation is required'],
    },
    fatherContactNo: {
        type: String,
        required: [true, 'Father Contact No is required'],
    },
    motherName: {
        type: String,
        required: [true, 'Mother Name is required'],
    },
    motherOccupation: {
        type: String,
        required: [true, 'Mother occupation is required'],
    },
    motherContactNo: {
        type: String,
        required: [true, 'Mother Contact No is required'],
    },
});

const LocalGuardianSchema = new Schema<TLocalGuardian>({
    name: {
        type: String,
        required: [true, 'Name is required'],
    },
    occupation: {
        type: String,
        required: [true, 'Occupation is required'],
    },
    contactNo: {
        type: String,
        required: [true, 'Contact number is required'],
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
    },
});

const StudentSchema = new Schema<TStudent>({
    id: {
        type: String,
        required: [true, 'ID is required'],
        unique: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'User id is required'],
        unique: true,
        ref: 'user',
    },
    name: {
        type: UserNameSchema,
        required: [true, 'Name is required'],
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender',
        },
        required: [true, 'Gender is required'],
    },
    dateOfBirth: { type: Date },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
    },
    contactNo: { type: String, required: [true, 'Contact number is required'] },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contact number is required'],
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group',
        },
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
    },
    guardian: {
        type: GuardianSchema,
        required: [true, 'Guardian information is required'],
    },
    localGuardian: {
        type: LocalGuardianSchema,
        required: [true, 'Local guardian information is required'],
    },
    profileImg: { type: String },
    // admissionSemester: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'AcademicSemester',
    // },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true
});

/**
 * response json object
 * @returns response json with out _id, __v and isDeleted
 */
StudentSchema.methods.toJSON = function () {
    const studentJSON = this.toObject();
    const deleteFields = ['_id', 'name._id', 'guardian._id', 'localGuardian._id', '__v', 'isDeleted'];
    deleteFields.forEach(del => delete studentJSON[del]);
    return studentJSON
}

export const StudentModel = model<TStudent>('student', StudentSchema);