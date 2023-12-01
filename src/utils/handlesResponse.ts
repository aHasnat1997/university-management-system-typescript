import { Response } from "express";


type THandlesResponse<T> = {
    success?: boolean,
    massage: string,
    doc: T | T[] | null
}
const handlesResponse = <T>(res: Response, data: THandlesResponse<T>): void => {
    res.status(200).json({
        'success': true,
        'massage': data.massage,
        'doc': data.doc
    });
}

export default handlesResponse;