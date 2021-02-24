import { Test, TestingModule } from '@nestjs/testing';
import { WakaTimeService } from './waka-time.service';

describe('WakaTimeService', () => {
  let service: WakaTimeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [WakaTimeService],
    }).compile();

    service = module.get<WakaTimeService>(WakaTimeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
