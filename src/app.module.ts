import { Module } from '@nestjs/common';
import {GraphQLModule} from "@nestjs/graphql";
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    GraphQLModule.forRoot({
      autoSchemaFile: true,
    }),
    AuthModule
  ],
})
export class AppModule {}
