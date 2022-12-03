import { HttpService } from '@nestjs/axios';
import {Injectable,NotFoundException} from '@nestjs/common';

@Injectable()
export class MoralisService {

  constructor(private readonly httpService: HttpService) {}

  private readonly config = {
    baseURL: 'https://deep-index.moralis.io/api/v2/',
    headers: {
      Accept: 'application/json',
      'X-API-Key':process.env.MORALIS_KEY,
    },
  };

  public async getTransactions( { chain, address }: any) {
    try {
      if(chain.startsWith('0x0')){
        chain=`0x${chain.slice(3)}`
      }
      const { data } = await this.httpService.axiosRef.get(`${address}`, {
        params: { chain, limit: '20' },
        ...this.config,
      });
      return data.result;
    } catch (error) {
      console.log(error);
    }
  }

  public async getToken({ address, chain }: any) {
    try {
    
      if(chain.startsWith('0x0')){
        chain=`0x${chain.slice(3)}`
      }
      const { data } = await this.httpService.axiosRef.get(`${address}/erc20`, {
        params: { chain},
        ...this.config,
      });
      console.log(data)
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  public async getTokenPrice({ address, chain }: any) {
    try {
      if(chain.startsWith('0x0')){
        chain=`0x${chain.slice(3)}`
      }
      const { data } = await this.httpService.axiosRef.get(
        `/erc20/${address}/price`,
        {
          params: { chain },
          ...this.config,
        },
      );
      return data;
    } catch (error) {
      throw new NotFoundException(error.response.data);
    }
  }

  public async getNFT({ address, chain }: any) {
    try {
      if(chain.startsWith('0x0')){
        chain=`0x${chain.slice(3)}`
      }
      const { data } = await this.httpService.axiosRef.get(`${address}/nft`, {
        params: {
          chain,
          format: 'decimal',
          normalizeMetadata: 'true',
          limit: '100',
        },
        ...this.config,
      });
      return data;
    } catch (error) {
      console.log('error nft', error);
    }
  }
  
}