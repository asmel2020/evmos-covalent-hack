import axios from 'axios';
import {gasPrice, LoginParameter, NftRespond, TokenRespond, TransactionRespond} from './interfaces';
class BackEnd {
  private static instanceClient(token: string = '') {
    return axios.create({
      baseURL: 'https://gizli.up.railway.app',
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  }

  public static async login(loginParameter: LoginParameter): Promise<string> {
    try {
      const {data} = await this.instanceClient().post(
        '/signer-login',
        loginParameter,
      );
      return data;
    } catch (error: any) {
     
      throw error;
    }
  }

  public static async getTokenAddress(
    token: string,
    address: string,
    chainID: string,
  ):Promise<TokenRespond[]>{
    try {
      const {data, status} = await this.instanceClient(token).get(
        `/web3/${chainID}/${address}/erc20`,
      );
      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public static async getNftAddress(
    token: string,
    address: string,
    chainID: string,
  ):Promise<NftRespond[]> {
    try {
      const {data, status} = await this.instanceClient(token).get(
        `/web3/${chainID}/${address}/nft`,
      );
      return data.result;
    } catch (error: any) {
      throw error;
    }
  }

  public static async getTransactionAddress(
    token: string,
    address: string,
    chainID: string,
  ):Promise<TransactionRespond[]> {
    try {
      const {data} = await this.instanceClient(token).get(
        `/web3/${chainID}/${address}/transaction`,
      );

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public static async getGasPrice(
    token: string,
    chainID: string,
  ):Promise<gasPrice> {
    try {

      const {data} = await this.instanceClient(token).get(
        `/web3/${chainID}/gasPrice`,
      );

      return data;
    } catch (error: any) {
      throw error;
    }
  }

  public static async test(token: string) {
    try {
      const {data, status} = await this.instanceClient(token).get(
        '/signer-login',
      );
      console.log({data, status});
    } catch (error: any) {
      throw error;
    }
  }

}

export default BackEnd;
