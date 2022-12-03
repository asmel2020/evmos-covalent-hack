import { gasPrice, NftRespond, TokenRespond, TransactionRespond } from "../helper/BackEnd/interfaces";
import { Credential, TransferCryptoNativeRequest, TransferNft } from "../class/Wallet/interfaces";
import { DecryptDataPrams, EncryptDataRespond, GenerateKeyRespond} from "../helper/Crypto/interface";
import { AccountDetails, NetworkController } from "../class/BD/interfaces";
import { ethers } from "ethers";

interface  Wallets{
    getBalanceAddress(address:string):Promise<string>,
    getAddressActive():Promise<AccountDetails>,
    savePassword(password:string | undefined, salt?:string):void,
    generateKey(password:string):Promise<GenerateKeyRespond>,
    encryptData (text:string, key:string):Promise<EncryptDataRespond>,
    decryptData(decryptDataPrams:DecryptDataPrams):Promise<string>,
    generatePhraseMnemonic():string,
    createWallet(credential:Credential,mnemonic:string):Promise<boolean>,
    existDataBank():Promise<boolean>,
    encryptPassword(password:string):Promise<string>,
    removeDataBank():Promise<void>,
    login(key:string):Promise<void>,
    getTokenAddress():Promise<TokenRespond[]>,
    getNftAddress():Promise<NftRespond[]>,
    getTransactionAddress():Promise<TransactionRespond[]>
    getTokenSession():Promise<string | undefined>,
    setSession(isSession:boolean):void,
    setBalance(balance:string):void,
    isActiveNetwork(): Promise<NetworkController>
    activeNetwork:NetworkController | undefined,
    setActiveNetwork(id:string):Promise<void>,
    transferCryptoNative(transferCryptoNativeRequest:TransferCryptoNativeRequest):Promise<ethers.providers.TransactionResponse>
    getAllNetwork():Promise<{isActiveNetwork: string;networks: NetworkController[];}>,
    addAddress(key:string,name:string):Promise<string>,
    getAllAddress():Promise<AccountDetails[]>,
    setActiveWallet(address: string):Promise<void>,
    activeWallet:string | undefined,
    getGasPrice(): Promise<gasPrice>,
    transferNft(transferNft: TransferNft):Promise<any>
}
export interface WalletContextProps extends Wallets {
    password?:string,
    salt?:string,
    session:boolean,
    balance:string
}

export interface WalletSession {
    session:boolean
}

export interface AddressBalance {
    balance:string
}
export interface ActiveWallet {
    address:string
}
 export interface WalletState {
    password?:string,
    salt?:string,
    session:boolean,
    balance:string,
    activeNetwork:NetworkController | undefined,
    activeWallet:string | undefined
 }

 export interface WalletSavePassword {
    password?:string,
    salt?:string,
 }

