import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

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
export class createWordParams {
    @Field()
    word: string;

    @Field(() => [String])
    translations: string[];

    @Field(() => [String],{nullable:true})
    examples: string[];

    @Field(() => [String],{nullable:true})
    tags: string[];
}
