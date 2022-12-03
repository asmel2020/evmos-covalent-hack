import { Module } from '@nestjs/common';
import { CovalentService } from './covalent.service';
import { HttpModule } from '@nestjs/axios';

@Module({
  imports:[HttpModule],
  providers: [CovalentService],
  exports:[CovalentService]
})
export class CovalentModule {}
