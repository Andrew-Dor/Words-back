import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';

@ObjectType('Word')
export class WordType {
    @Field(() => ID)
    id: string;

    @Field()
    word: string;

    @Field(() => [String])
    translations: string[];

    @Field(() => [String])
    examples: string[];

    @Field(() => [String])
    tags: string[];
}

@InputType()
export class CreateWordParams {
    @Field()
    word: string;

    @Field(() => [String])
    translations: string[];

    @Field(() => [String], { defaultValue: [] })
    examples: string[];

    @Field(() => [String], { defaultValue: [] })
    tags: string[];
}
