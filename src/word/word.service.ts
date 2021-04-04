import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MongoRepository } from 'typeorm';
import { Word } from './word.entity';
import { createWordParams } from './word.type';
import { ObjectID } from "typeorm";

@Injectable()
export class WordService {
    constructor(
        @InjectRepository(Word)
        private readonly wordRepository: MongoRepository<Word>,

    ) {}

    async getWordById(id:string):Promise<Word> {
        return await this.wordRepository.findOne(id);
    }

    async getWord(word:string):Promise<Word[]> {
        return await this.wordRepository.find({where:{word:word}});
    }

    async createWord(params: createWordParams):Promise<Word> {
        const {word,examples,tags,translations} = params;
        const newWord = new Word();
        newWord.word = word;
        newWord.examples = examples || [];
        newWord.translations= translations;
        newWord.tags = tags || [];
        return await this.wordRepository.save(newWord);
    }

    async removeWordById(id:string):Promise<boolean> {
        try{
            const exists = ObjectID.isValid(id) && await this.getWordById(id);
            if(!exists) {
                throw new NotFoundException();
            }
            await this.wordRepository.delete(id);
            return true;
        } catch(err){
            throw new NotFoundException();
        }
    }

}
