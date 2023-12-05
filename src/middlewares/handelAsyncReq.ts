import { NextFunction, Request, RequestHandler, Response } from "express";

const handleAsyncReq = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch(error => next(error));
    }
};

export default handleAsyncReq;

// import { NextFunction, Request, RequestHandler, Response } from 'express';

// const handleAsyncReq = (fn: RequestHandler) => {
//     return (req: Request, res: Response, next: NextFunction) => {
//         Promise.resolve(fn(req, res, next)).catch((err) => next(err));
//     };
// };

// export default handleAsyncReq;