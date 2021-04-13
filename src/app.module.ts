import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DictionaryModule } from './dictionary/dictionary.module';

@Module({
    imports: [
        ConfigModule.forRoot({}),
        MongooseModule.forRoot(
            `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
            { useCreateIndex: true },
        ),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            context: ({ req }) => ({ req }),
        }),
        AuthModule,
        DictionaryModule,
    ],
})
export class AppModule {}
