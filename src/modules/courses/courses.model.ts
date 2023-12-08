import { Schema, model } from "mongoose";
import { TCourses } from "./courses.interface";


const CoursesSchema = new Schema<TCourses>({
    title: {
        type: String,
        required: [true, 'title is required'],
        unique: true
    },
    prefix: {
        type: String,
        required: [true, 'prefix is required']
    },
    code: {
        type: Number,
        required: [true, 'code is required']
    },
    prerequisites: {
        type: [Schema.Types.ObjectId],
        ref: 'course'
    },
    teachers: {
        type: [Schema.Types.ObjectId],
        ref: 'teacher'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});


export const CoursesModel = model<TCourses>('course', CoursesSchema);