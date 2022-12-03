import { ethers } from "ethers";

export interface gasPrice{
    chainId: string,
    lastUpdate: string,
    slow: string,
    normal: string,
    fast: string
}

export interface TransferCryptoNativeRequest {
    key: string;
    to: string;
    value: ethers.BigNumber;
    gasLimit: string; // 21000
    gasPrice: string;
  }

  export interface TransferNft {
    key: string;
    to: string;
    tokenAddress: string;
    tokenId:string;
    gasLimit: string; // 100000
    gasPrice: string;
  }