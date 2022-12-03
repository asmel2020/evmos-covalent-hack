import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ethers } from 'ethers';
import { GasPrice } from './entity/gasPrice.entity';
import { BlockNumber } from './entity/blockNumber.entity';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(GasPrice) private readonly gasPrice: Repository<GasPrice>,
    @InjectRepository(BlockNumber) private readonly blockNumber: Repository<BlockNumber>,
  ) {}

  async getGasPrice(p: string) {
    const provider = new ethers.providers.JsonRpcProvider(p);
    const chainId = ethers.utils.hexlify((await provider.getNetwork()).chainId);
    await this.blockNumber.createQueryBuilder().delete().execute()
    let result = await this.blockNumber.findOne({
      where: {
        chain_id:chainId,
      },
    });

    if (!result) {
      result = this.blockNumber.create({
        chain_id:chainId,
        block_number:0
      });

      this.blockNumber.save(result);
    }

    provider.on('block', async (blockNumber) => {
    await  this.blockNumber.save(this.blockNumber.create({
        block_number:blockNumber,
        chain_id:chainId
      }));
    });
  } 

  async getGasPricse(p: string) {
    const provider = new ethers.providers.JsonRpcProvider(p);
    const chainId = ethers.utils.hexlify((await provider.getNetwork()).chainId);

    let result = await this.gasPrice.findOne({
      where: {
        chainId,
      },
    });

    if (!result) {
      result = this.gasPrice.create({
        chainId,
        slow: '0',
        normal: '0',
        fast: '0',
      });
      this.gasPrice.save(result);
    }

    let block = true;
    let blockNumber: any;

    while (true) {
      try {
        if (block) {
          blockNumber= await this.getLastBlockNumber(chainId);
        }
      } catch (error) {
        console.log(error)
        blockNumber=false
      }

      if (blockNumber) {
        try {
          const gasPrice = await provider.getGasPrice();
          result.slow = gasPrice.toString();
          result.normal = gasPrice.mul(20).div(100).add(gasPrice).toString();
          result.fast = gasPrice.mul(40).div(100).add(gasPrice).toString();
          this.gasPrice.save(result);
          block = true;
        } catch (error) {
          block = false;
          console.log('error',blockNumber);
        }

        if (block) {
          try {
            await this.deleteBlockNumber(blockNumber.block_number,chainId);
          } catch (error) {
            console.log("error delete")
          }
        }
      }
    }
  }

  private async getLastBlockNumber(chainId:string){
    return await this.blockNumber
      .createQueryBuilder()
      .where("chain_id =:chainId",{chainId})
      .orderBy({'block_number': 'ASC' }).limit(1).getOne();
  }

  private async deleteBlockNumber(blockNumber: number,chainId:string) {
    await this.blockNumber
      .createQueryBuilder()
      .delete()
      .where("chain_id =:chainId",{chainId})
      .andWhere('block_number = :blockNumber', {
        blockNumber,
      })
      .execute();
  }
}
