import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Word } from './word.entity';
import { WordResolver } from './word.resolver';
import { WordService } from './word.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word])
  ],
  providers: [
    WordResolver, 
    WordService
  ]
})
export class WordModule {}
