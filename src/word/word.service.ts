import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createWordParams } from './word.type';
import { WordRepository } from './words.repository';

@Injectable()
export class WordService {
    constructor(
        @InjectRepository(WordRepository)
        private wordRepository: WordRepository,
    ) {}

    createWord(params: createWordParams) {
        const word = this.wordRepository.createWord(params);
    }

    // getWordById(id:string)

}
