import { Controller } from '@nestjs/common';
import { MoralisService } from './moralis.service';

@Controller('moralis')
export class MoralisController {
  constructor(private readonly moralisService: MoralisService) {}
}
