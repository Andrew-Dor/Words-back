import { Module } from '@nestjs/common';
import { WordResolver } from './word.resolver';

@Module({
  providers: [WordResolver]
})
export class WordModule {}
