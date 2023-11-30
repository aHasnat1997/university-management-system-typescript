import { UserModel } from "./user.model";


// eslint-disable-next-line @typescript-eslint/no-explicit-any
const generateStudentID = async (payload: any): Promise<string> => {
    let currentId = '0000';

    const findStudentLastId = await UserModel.findOne({ role: 'student' }, { id: 1, _id: 0 }).sort({ createdAt: -1 });
    const lastStudentYear = findStudentLastId?.id?.substring(0, 4);
    const lastStudentSemester = findStudentLastId?.id?.substring(4, 6);
    const currentStudentYear = payload.year;
    const currentStudentSemester = payload.semester;

    if (findStudentLastId && lastStudentYear === currentStudentYear && lastStudentSemester === currentStudentSemester) {
        currentId = findStudentLastId.id.substring(6);
    }

    let newId = (Number(currentId) + 1).toString().padStart(4, '0');
    newId = `${payload.year}${payload.semester}${newId}`;
    return newId;

};
export default generateStudentID;