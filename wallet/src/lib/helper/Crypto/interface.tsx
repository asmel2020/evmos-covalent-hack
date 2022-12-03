

export interface EncryptDataRespond{
    cipher:string,
    iv:string
}


export interface GenerateKeyRespond{
    key:string
    salt:string
}


export interface DecryptDataPrams extends EncryptDataRespond {
    key:string
}