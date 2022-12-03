import { Module } from '@nestjs/common';
import { Web3Service } from './web3.service';
import { Web3Controller } from './web3.controller';
import { HttpModule} from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { MoralisModule } from '../moralis/moralis.module';
import { CovalentModule } from '../covalent/covalent.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import entities from 'src/entities';


@Module({
  imports:[HttpModule,
    TypeOrmModule.forFeature(entities),
     PassportModule.register({defaultStrategy:'jwt'}),
     MoralisModule,CovalentModule],
  controllers: [Web3Controller],
  providers: [Web3Service]
})
export class Web3Module {}
