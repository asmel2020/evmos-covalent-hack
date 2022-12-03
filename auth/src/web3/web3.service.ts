import { HttpService } from '@nestjs/axios';
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CovalentService } from '../covalent/covalent.service';
import { MoralisService } from '../moralis/moralis.service';
import { GasPrice } from '../entities/gasPrice.entity';
import { Repository } from 'typeorm';

@Injectable()
export class Web3Service {
  constructor(
    @InjectRepository(GasPrice) private readonly gasPrice: Repository<GasPrice>,
    private readonly httpService: HttpService,
    private readonly covalentService: CovalentService,
    private readonly moralisService: MoralisService,
  ) {}

  private readonly isChainAllSupport = {
    '0x01': true,
    '0x05': true,
    '0x89': true,
    '0x013881': true,
    '0x38': true,
    '0x61': true,
    '0xa86a': true,
    '0xa869': true,
    '0x19': true,
    '0x0152': true,
    '0x2329': true,
    '0x2328': true,
  };

  private readonly isChainCovalentSupport = {
    '0x2329': true,
    '0x2328': true,
  };
 
  private readonly config = {
    baseURL: 'https://deep-index.moralis.io/api/v2/',
    headers: {
      Accept: 'application/json',
      'X-API-Key':
        'OyHJVT8gDgy2MxJam6hLxNHYs7ZodzwwcYYuH9IPVABWCruEwwpb6rbrFWAGS80P',
    },
  };

  public async getTransactions(prams: any) {
    const { chain } = prams;
    
    if (!this.isChainAllSupport[chain]) {
      return 'chain not support';
    }

    try {
      if (this.isChainCovalentSupport[chain]) {
        return await this.covalentService.getTransactions(prams);
      }
      return await this.moralisService.getTransactions(prams);
    } catch (error) {
      console.log(error);
    }
  }

  public async getToken(prams: any) {
    const { chain } = prams;
    if (!this.isChainAllSupport[chain]) {
      return 'chain not support';
    }

    try {
      if (this.isChainCovalentSupport[chain]) {
        return await this.covalentService.getToken(prams);
      }

      return await this.moralisService.getToken(prams);
    } catch (error) {
      console.log(error);
    }
  }

  public async getNFT(prams: any) {
    const { chain } = prams;
    
    if (!this.isChainAllSupport[chain]) {
      return 'chain not support';
    }

    try{
      if (this.isChainCovalentSupport[chain]) {
        return await this.covalentService.getNFT(prams);
      }
      return await this.moralisService.getNFT(prams);
    }catch (error) {
      console.log(error);
    }
  }

  public async getTokenPrice({ address, chain }: any) {
    try {
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

  public async getGasPrice(prams: any){
   const {chain } = prams;
   const gasPrice=await this.gasPrice.findOne({
      where:{
        chainId:chain
      },
      
    }) 
    
    return gasPrice
  }
}
