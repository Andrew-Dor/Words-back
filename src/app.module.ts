import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { AuthModule } from './auth/auth.module';
import { User } from './auth/user.entity';
import { ConfigModule } from '@nestjs/config';
import {MongooseModule} from "@nestjs/mongoose";


@Module({
    imports: [
        ConfigModule.forRoot({}),
        MongooseModule.forRoot(
            `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
        ),
        // TypeOrmModule.forRoot({
        //     type: 'mongodb',
        //     url: `mongodb://${process.env.DB_HOST}/${process.env.DB_NAME}`,
        //     database: process.env.DB_NAME,
        //     synchronize: true,
        //     useUnifiedTopology: true,
        //     entities: [Word, User],
        // }),
        GraphQLModule.forRoot({
            autoSchemaFile: true,
            context: ({ req }) => ({ req }),
        }),
        AuthModule,
    ],
})
export class AppModule {}
