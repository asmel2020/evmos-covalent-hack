export type AccountDetails = {
    type: string;
    address: string;
    addressCosmo?:string;
    publicKey: string;
    name: string;
    path?: string;
    ticker?: string;
};

export type WalletHd = {
    privateKey: {
      [address:string]:string
    };
    type: string;
    data: {
      mnemonic: string;
      numberOfAccounts: number;
      hdPath: string;
    };
  };

export type NetworkController = {
    id: string;
    isActive:boolean;
    chainId: string;
    nickname: string;
    rpcUrl: string;
    ticker: string;
    exploreBlock: string;
    ecosystemCosmo:boolean
};

export interface DBStorage {
  accounts: {
    isActiveAccount: string;
    accountDetails:{
      [address:string]:AccountDetails
    };
  }
    NetworkController: {
      isActiveNetwork: string;
      networkDetails:{
        [NetworkIdUuid:string]:NetworkController
      };
    };
    transactionHistory:any;
    TokensController: any;
    NftsController:any
    vault:{
        storage:string,
        salt:string,
        iv:string
    }
    sessionId: string | undefined;
  }

export interface CreateDataBankParams{
    storage:string,
    salt:string,
    iv:string,
    type:string,
    address:string,
    name:string,
    publicKey:string,
    path:string,
}
