export type TErrorIssue = {
    path: string,
    message: string
};

export type TErrorResponse = {
    success: false,
    message: string,
    issue: {
        path: string,
        message: string
    }[],
    stack?: string
};