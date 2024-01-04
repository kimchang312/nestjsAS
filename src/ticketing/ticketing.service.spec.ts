import { Test, TestingModule } from '@nestjs/testing';
import { SupportMessageService } from './ticketing.service';

describe('SupportMessageService', () => {
  let service: SupportMessageService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SupportMessageService],
    }).compile();

    service = module.get<SupportMessageService>(SupportMessageService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
