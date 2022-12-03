import { Test, TestingModule } from '@nestjs/testing';
import { MoralisController } from './moralis.controller';
import { MoralisService } from './moralis.service';

describe('MoralisController', () => {
  let controller: MoralisController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoralisController],
      providers: [MoralisService],
    }).compile();

    controller = module.get<MoralisController>(MoralisController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
