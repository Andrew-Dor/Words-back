import { Args, ID, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WordService } from './word.service';
import { createWordParams, WordType } from './word.type';

@Resolver(() => WordType)
export class WordResolver {

    constructor(
        private wordService: WordService
    ) {}

    @Query(() => WordType, {name: "getWordById"})
    async getWordById(
        @Args('id', {type: () => ID})
        id: string,
    ) {
        return await this.wordService.getWordById(id);
    }

    @Query(() => [WordType], {name: "getWord"})
    async getWord(
        @Args('word', {type: () => String})
        word:string,
    ) {
        return await this.wordService.getWord(word);
    }

    @Mutation(()=> WordType, {name: "create_word"})
    async createWord(
        @Args('params', { type: () => createWordParams })
        params: createWordParams,
    ) {
        return await this.wordService.createWord(params);
    }

    @Mutation(()=>Boolean,{name: "removeWordById"})
    async removeWordById(
        @Args('id',{type: () => String})
        id: string,
    ) {
        return await this.wordService.removeWordById(id);
    }

}
