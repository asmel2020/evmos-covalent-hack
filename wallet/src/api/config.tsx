import axios from 'axios';
import {API_BASE} from '@env';
import { 
  LoginParameter,
  NftRespond,
  TokenRespond,
  TransactionRespond,
  method,
  requestWeb3,
} from './interfaces';

const instanceClient = async (args: requestWeb3) => {
  const {isActiveNetwork, getAddressActive, method, token = ''} = args;

  let address = (await getAddressActive()).address;
  let chainId = (await isActiveNetwork()).chainId
  let url = '';

  switch (method) {
    case 'erc20':
      url = `/web3/${chainId}/${address}/erc20`;
      break;
    case 'nft':
      url = `/web3/${chainId}/${address}/nft`;
      break;
    default:
      break;
  }

  return axios.create({
    baseURL: API_BASE,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  }).get(url)
};

/*const login = async (
  loginParameter: LoginParameter,
): Promise<string> => {
  try {
    const {data} = await instanceClient().post('/signer-login', loginParameter);
    return data;
  } catch (error: any) {
    throw error;
  }
};

const getTokenAddress = async (
  token: string,
  address: string,
  chainID: string,
): Promise<TokenRespond[]> => {
  try {
    const {data, status} = await instanceClient(token).get(
      `/web3/${chainID}/${address}/erc20`,
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

const getNftAddress = async (
  token: string,
  address: string,
  chainID: string,
): Promise<NftRespond[]> => {
  try {
    const {data, status} = await instanceClient(token).get(
      `/web3/${chainID}/${address}/nft`,
    );
    return data.result;
  } catch (error: any) {
    throw error;
  }
};

const getTransactionAddress = async (
  token: string,
  address: string,
  chainID: string,
): Promise<TransactionRespond[]> => {
  try {
    const {data} = await instanceClient(token).get(
      `/web3/${chainID}/${address}/transaction`,
    );
    return data.result;
  } catch (error: any) {
    throw error;
  }
};

const test = async (token: string) => {
  try {
    const {data, status} = await instanceClient(token).get(
      '/signer-login',
    );
    console.log({data, status});
  } catch (error: any) {
    throw error;
  }
};*/

export default instanceClient;
