import {
  Controller,
  Get,
  Param,UseGuards
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';


import { Web3Service } from './web3.service';


@Controller('web3/')
export class Web3Controller {
  constructor(private readonly web3Service: Web3Service) {}


  @UseGuards(AuthGuard()) 
  @Get('/:chain/:address/transaction')
  async getTransaction(@Param() params: any) {
    return await this.web3Service.getTransactions(params);
  }

  @UseGuards(AuthGuard()) 
  @Get('/:chain/:address/erc20')
  async getToken(@Param() params: any) {
    return await this.web3Service.getToken(params);
  }

  @UseGuards(AuthGuard()) 
  @Get('/:chain/erc20/:address/price')
  async getTokenPrice(@Param() params: any) {
    return await this.web3Service.getTokenPrice(params);
  }

  @UseGuards(AuthGuard()) 
  @Get('/:chain/:address/nft')
  async getNFT(@Param() params: any) {
    return await this.web3Service.getNFT(params);
  } 
  
  @UseGuards(AuthGuard()) 
  @Get('/:chain/gasPrice')
  async getGasPrice(@Param() params: any) {
    return await this.web3Service.getGasPrice(params);
  }
}
