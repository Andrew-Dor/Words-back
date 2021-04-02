import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WordResolver } from './word.resolver';
import { WordService } from './word.service';
import { WordRepository } from './words.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([WordRepository])
  ],
  providers: [
    WordResolver, 
    WordService
  ]
})
export class WordModule {}
