import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { WordService } from './word.service';
import { createWordParams, WordType } from './word.type';

@Resolver(of => WordType)
export class WordResolver {

    constructor(
        private wordService: WordService
    ) {}

    @Query(() => WordType, {name: "get_word"})
    word() {
        return {
            id: "yne18c218yc12",
            word: "test",
            translations: ['test'],
            examples: ["ex"],
            tags: []
        }
    }

    // @Mutation(()=> WordType, {name: "create_word"})
    // createWord(@Args('params', { type: () => String }) {

    // }

    @Mutation(()=> WordType, {name: "create_word"})
    async createWord(
        @Args('params', { type: () => createWordParams })
        params: createWordParams,
    ) {
        return await this.wordService.createWord(params);
    }

}
