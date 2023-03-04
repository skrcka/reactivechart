interface RData {
    Names: Array<string>
    Vectors: Array<Array<number | string | boolean>>
}
interface Data {
    RData: RData
    File: boolean
    Func: string
}

export type {
    Data, RData,
};
