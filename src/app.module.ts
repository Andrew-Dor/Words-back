import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { Word } from './word/word.entity';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: 'mongodb://localhost/words',
      database: 'words',
      synchronize: true,
      useUnifiedTopology: true,
      entities: [
        Word
      ]
    }),
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
    WordModule
  ],
})
export class AppModule {}
