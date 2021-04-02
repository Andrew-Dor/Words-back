import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import { AuthModule } from './auth/auth.module';
import { WordModule } from './word/word.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule,
    WordModule
  ],
})
export class AppModule {}
