import { UserModel } from "./user.model";


const generateStudentID = async (payload: string): Promise<string> => {
    let currentId = payload + '0000';

    const findThisId = await UserModel.find({ role: 'student' });
    findThisId.forEach(student => {
        if (findThisId) {
            currentId = student.id;
        }
    });
    const newId = (Number(currentId) + 1).toString().padStart(4, '0');
    currentId = newId;
    console.log(currentId);
    return currentId;

};
export default generateStudentID;