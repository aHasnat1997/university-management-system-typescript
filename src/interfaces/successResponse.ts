// success response type
export type THandlesResponse<T> = {
    success?: boolean,
    massage: string,
    doc: T | T[] | null
}