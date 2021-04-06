import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { Word } from './word/word.entity';
import { WordModule } from './word/word.module';
import { ConfigModule } from '@nestjs/config';

@Module({
    imports: [
        ConfigModule.forRoot({}),
        TypeOrmModule.forRoot({
            type: 'mongodb',
            url: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
            database: process.env.DB_NAME,
            synchronize: true,
            useUnifiedTopology: true,
            entities: [Word, User],
        }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            context: ({ req }) => ({ req }),
        }),
        AuthModule,
        WordModule,
    ],
})
export class AppModule {}
