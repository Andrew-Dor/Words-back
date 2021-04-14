import { Module } from '@nestjs/common';
import { DictionaryService } from './dictionary.service';
import { DictionaryResolver } from './dictionary.resolver';
import { AuthModule } from 'src/auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Dictionary, DictionarySchema } from './dictionary.model';

@Module({
    imports: [
        MongooseModule.forFeature([
            {
                name: Dictionary.name,
                schema: DictionarySchema,
            },
        ]),
        AuthModule,
    ],
    providers: [DictionaryService, DictionaryResolver],
})
export class DictionaryModule {}
