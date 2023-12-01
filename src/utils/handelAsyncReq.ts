import { NextFunction, Request, RequestHandler, Response } from "express";

const handelAsyncReq = (fn: RequestHandler) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next))
            .catch(error => next(error))
    }
}

export default handelAsyncReq;