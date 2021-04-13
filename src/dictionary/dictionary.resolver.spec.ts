import { Test, TestingModule } from '@nestjs/testing';
import { DictionaryResolver } from './dictionary.resolver';

describe('DictionaryResolver', () => {
  let resolver: DictionaryResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DictionaryResolver],
    }).compile();

    resolver = module.get<DictionaryResolver>(DictionaryResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
