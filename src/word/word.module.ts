import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Word } from './word.entity';
import { WordResolver } from './word.resolver';
import { WordService } from './word.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Word]),
    AuthModule,
  ],
  providers: [
    WordResolver, 
    WordService
  ]
})
export class WordModule {}
