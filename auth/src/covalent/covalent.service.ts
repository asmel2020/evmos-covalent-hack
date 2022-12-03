import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class CovalentService {
  constructor(private readonly httpService: HttpService) {}

  private readonly config = {
    baseURL: 'https://api.covalenthq.com/v1',
    headers: {
      Accept: 'application/json',
    },
  };

  public async getTransactions({ address, chain }: any) {
    try {
      const chainIdHexadecimal = ethers.BigNumber.from(chain).toString();

      const { data } = await this.httpService.axiosRef.get(
        `/${chainIdHexadecimal}/address/${address}/transactions_v2/`,
        {
          params: {
            'quote-currency': 'USD',
            format: 'JSON',
            'block-signed-at-asc': 'false',
            'no-logs': 'true',
            'page-size': 20,
            key: process.env.COVALENT_KEY,
          },
          ...this.config,
        },
      );
  
      return this.formatRespondTransactions(data.data.items);
    } catch (error) {
      console.log('error nft Transactions');
    }
  }

  public async getToken({ address, chain }: any) {
    try {
      const chainIdHexadecimal = ethers.BigNumber.from(chain).toString();
      const { data } = await this.httpService.axiosRef.get(
        `/${chainIdHexadecimal}/address/${address}/balances_v2/`,
        {
          params: {
            'quote-currency': 'USD',
            format: 'JSON',
            nft: 'false',
            'no-nft-fetch': false,
            key: process.env.COVALENT_KEY,
          },
          ...this.config,
        },
      );
      return this.formatRespondToken(data.data.items);
    } catch (error) {
      console.log('error token');
    }
  }

  public async getNFT({ address, chain }: any) {
    try {
      const chainIdHexadecimal = ethers.BigNumber.from(chain).toString();
      const { data } = await this.httpService.axiosRef.get(
        `/${chainIdHexadecimal}/address/${address}/balances_v2/`,
        {
          params: {
            'quote-currency': 'USD',
            format: 'JSON',
            nft: 'true',
            'no-nft-fetch': 'true',
            key: process.env.COVALENT_KEY,
          },
          ...this.config,
        },
      );
      
      let prams = {
        result: [],
      };

      prams.result = this.formatRespondNft(data.data.items);
      return prams;
    } catch (error) {
      console.log('error nft covalent');
    }
  }

  private formatRespondTransactions(items: any) {
    let result = [];

    for (let index = 0; index < items.length; index++) {
      let {
        tx_hash,
        from_address,
        to_address,
        value,
        gas_price,
        block_height,
        gas_spent,
        block_signed_at,
      } = items[index];

      result.push({
        hash: tx_hash,
        from_address,
        to_address,
        value,
        gas_price,
        block_number: block_height,
        gas: gas_spent,
        block_timestamp: block_signed_at,
      });
    }
    return result;
  }

  private formatRespondToken(items: any) {
    let result = [];

    for (let index = 0; index < items.length; index++) {
      let {
        contract_decimals,
        contract_name,
        contract_ticker_symbol,
        contract_address,
        logo_url,
        balance,
      } = items[index];
      if(!(contract_address==='0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee')){
        result.push({
          token_address: contract_address,
          name: contract_name,
          symbol: contract_ticker_symbol,
          logo: logo_url,
          thumbnail: logo_url,
          decimals: contract_decimals,
          balance,
        });
      }
    }
    return result;
  }

  private formatRespondNft(items: any) {
    let result = [];

    for (let index = 0; index < items.length; index++) {
      let {
        contract_name,
        contract_ticker_symbol,
        contract_address,
        nft_data,
      } = items[index];

      if (items[index].type === 'nft') {
        for (let a = 0; a < nft_data.length; a++) {
          let { token_id, token_balance, owner } = nft_data[a];
          result.push({
            token_address: contract_address,
            token_id,
            amount: token_balance,
            owner_of: owner,
            contract_type: 'ERC721',
            name: contract_name,
            symbol: contract_ticker_symbol,
            token_uri: null,
            metadata: null,
          });
        }
      }
    }
    return result;
  }
}
