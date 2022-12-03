export type AccountDetails = {
    type: string;
    address: string;
    addressCosmo?:string;
    publicKey: string;
    name: string;
    path?: string;
    ticker?: string;
    isAction?:boolean
};