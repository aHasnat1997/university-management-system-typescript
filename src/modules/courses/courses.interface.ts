import { Types } from "mongoose"

export type TCourses = {
    title: string,
    prefix: string,
    code: number,
    prerequisites?: [Types.ObjectId],
    teachers?: [Types.ObjectId],
    isDeleted?: boolean
}