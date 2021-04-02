import { Module } from '@nestjs/common';
import { WordResolver } from './word.resolver';
import { WordService } from './word.service';

@Module({
  providers: [WordResolver, WordService]
})
export class WordModule {}
