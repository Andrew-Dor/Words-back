import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Word } from './word.entity';
import { createWordParams } from './word.type';
import {v4 as uuid} from "uuid";

@Injectable()
export class WordService {
    constructor(
        @InjectRepository(Word)
        private readonly wordRepository: MongoRepository<Word>,

    ) {}

    async getWordById(id:string):Promise<Word> {
        return await this.wordRepository.findOne(id);
    }

    async getAllWords(word:string):Promise<Word[]> {
        return await this.wordRepository.find({where:word})
    }

    async createWord(params: createWordParams):Promise<Word> {
        const {word,examples,tags,translations} = params;
        return await this.wordRepository.create({
            word,
            examples,
            translations,
            tags,
        });
    }

    // getWordById(id:string)

}
