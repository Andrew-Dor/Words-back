import { Mutation, Query, Resolver } from '@nestjs/graphql';
import { WordType } from './word.type';

@Resolver(of => WordType)
export class WordResolver {

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

    @Mutation(()=> WordType, {name: "create_word"})
    createWord() {
        
    }

}
