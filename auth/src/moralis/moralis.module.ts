import { Module } from '@nestjs/common';
import { MoralisService } from './moralis.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [MoralisService],
  exports:[MoralisService]
})
export class MoralisModule {}
