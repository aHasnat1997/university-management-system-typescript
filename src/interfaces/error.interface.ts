export type TErrorIssue = {
    path: string,
    massage: string
};

export type TErrorResponse = {
    success: false,
    message: string,
    issue: TErrorIssue
};