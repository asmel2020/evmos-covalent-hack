export interface LoginParameter {
  hash: string;
  sign: string;
}

interface normalizedMetadata {
  name: string | null;
  description: string | null;
  animation_url: string | null;
  external_link: string | null;
  image: string | null;
  attributes: null | {};
}

export interface NftRespond {
  amount: string;
  block_number: string;
  block_number_minted: string;
  contract_type: string;
  last_metadata_sync: string;
  last_token_uri_sync: string;
  metadata: string | null;
  minter_address: string | null;
  name: string;
  normalized_metadata: normalizedMetadata;
  owner_of: string;
  symbol: string;
  token_address: string;
  token_hash: string;
  token_id: string | null;
  token_uri: string | null;
}

export interface TokenRespond {
  balance: string;
  decimals: number;
  logo: string;
  name: string;
  symbol: string;
  thumbnail: string;
  token_address: string;
}

export interface TransactionRespond {
  hash: string;
  nonce: string;
  transaction_index: string;
  from_address: string;
  to_address: string | null;
  value: string;
  gas: string;
  gas_price: string;
  input: string;
  receipt_cumulative_gas_used: string;
  receipt_gas_used: string;
  receipt_contract_address: string | null;
  receipt_root: string | null;
  receipt_status: string;
  block_timestamp: string;
  block_number: string;
  block_hash: string;
  transfer_index: any;
}

export type method = 'erc20' | 'nft';

export interface requestWeb3 {
  method: method;
  isActiveNetwork:() => Promise<NetworkController>;
  getAddressActive:() => Promise<AccountDetails>
  token?: string;
}
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