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



// eslint-disable-next-line @typescript-eslint/no-explicit-any
const deleteFun = function (this: any, next: any) {
    this.find({ isDeleted: { $ne: true } });
    next();
}
CoursesSchema.pre('find', deleteFun);
CoursesSchema.pre('findOne', deleteFun);
CoursesSchema.pre('findOneAndUpdate', deleteFun);

/**
 * response json object
 * @returns response json with out _id, __v and isDeleted
 */
CoursesSchema.methods.toJSON = function () {
    const courseJSON = this.toObject();
    const deleteFields = ['__v', 'isDeleted'];
    deleteFields.forEach(del => delete courseJSON[del]);
    return courseJSON
}



export const CoursesModel = model<TCourses>('course', CoursesSchema);