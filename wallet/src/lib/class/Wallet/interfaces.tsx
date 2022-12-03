import { ethers } from 'ethers';
export type Credential = {
  password: string;
  salt: string;
};

export interface TransferCryptoNativeRequest {
  key: string;
  to: string;
  value: ethers.BigNumber;
  gasLimit: string; // 100000
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

