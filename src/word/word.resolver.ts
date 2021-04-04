import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WordService } from './word.service';
import { createWordParams, WordType } from './word.type';

@Resolver(of => WordType)
export class WordResolver {

    constructor(
        private wordService: WordService
    ) {}

    @Query(() => WordType, {name: "getWord"})
    async getWord(
        @Args('id', {type: () => ID})
        id: string,
    ) {
        return await this.wordService.getWordById(id);
    }

    @Query(() => WordType, {name: "getWordByText"})
    async getWordByText(
        @Args('word')
        word:string,
    ) {
        return await this.wordService.getAllWords(word);
    }

    @Mutation(()=> WordType, {name: "create_word"})
    async createWord(
        @Args('params', { type: () => createWordParams })
        params: createWordParams,
    ) {
        return await this.wordService.createWord(params);
    }

}
