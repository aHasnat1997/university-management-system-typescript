import { Schema, model } from "mongoose";
import { TTeacher, TTeacherName } from "./teacher.interface";


const TeacherNameSchema = new Schema<TTeacherName>({
    firstName: {
        type: String,
        required: [true, 'First name is required'],
        trim: true
    },
    middleName: {
        type: String,
        trim: true
    },
    lastName: {
        type: String,
        required: [true, 'Last name is required'],
        trim: true
    },
});

const TeacherSchema = new Schema<TTeacher>({
    id: {
        type: String,
        required: [true, 'ID name is required'],
        unique: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, 'ID name is required'],
        unique: true,
        ref: 'users'
    },
    name: {
        type: TeacherNameSchema,
        required: [true, 'Name is required']
    },
    gender: {
        type: String,
        enum: {
            values: ['male', 'female', 'other'],
            message: '{VALUE} is not a valid gender'
        },
        required: [true, 'Gender is required']
    },
    dateOfBirth: {
        type: Date
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true
    },
    contactNo: {
        type: String,
        required: [true, 'ContactNo is required'],
        trim: true,
        unique: true
    },
    emergencyContactNo: {
        type: String,
        required: [true, 'Emergency contactNo is required'],
        trim: true
    },
    bloodGroup: {
        type: String,
        enum: {
            values: ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'],
            message: '{VALUE} is not a valid blood group'
        }
    },
    presentAddress: {
        type: String,
        required: [true, 'Present address is required'],
        trim: true
    },
    permanentAddress: {
        type: String,
        required: [true, 'Permanent address is required'],
        trim: true
    },
    designation: {
        type: String,
        required: [true, 'Designation is required'],
        trim: true
    },
    academicDepartment: {
        type: String,
        required: [true, 'Management department is required'],
        trim: true
    },
    profileImg: {
        type: String
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

/**
 * response json object
 * @returns teacher JSON with out '_id', 'name._id', '__v' and 'isDeleted'
 */
TeacherSchema.methods.toJSON = function () {
    const adminJSON = this.toObject();
    const deleteFields = ['_id', 'name._id', '__v', 'isDeleted'];
    deleteFields.forEach(del => delete adminJSON[del]);
    return adminJSON;
};

export const TeacherModel = model<TTeacher>('teacher', TeacherSchema);