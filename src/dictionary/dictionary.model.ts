import {
    Field,
    ID,
    InputType,
    ObjectType,
    registerEnumType,
    Int,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Schema as MongooseSchema } from 'mongoose';
import { VisibilityType } from "../utils/constants";

registerEnumType(VisibilityType, {
    name: 'VisibilityType',
});

@ObjectType()
export class Word {
    @Field()
    word: string;

    @Field(() => [String])
    translations: string[];

    @Field(() => [String])
    examples: string[];

    @Field(() => [String])
    tags: string[];
}

@ObjectType()
@Schema()
export class Dictionary {
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId;

    @Field()
    @Prop()
    name: string;

    @Field()
    @Prop()
    description: string;

    @Field(() => VisibilityType)
    @Prop(VisibilityType)
    type: VisibilityType;

    @Field()
    @Prop()
    ownerId: string;

    @Field(() => [Word])
    @Prop([Word])
    words: Word[];

    @Field(() => [String])
    @Prop([String])
    contributors: string[];

    @Field(() => Int)
    @Prop()
    createdAt: number;
}

export type DictionaryDocument = Dictionary & Document;
export const DictionarySchema = SchemaFactory.createForClass(Dictionary);

@InputType()
export class CreateDictionaryParams {
    @Field()
    name: string;

    @Field()
    description: string;

    @Field(() => VisibilityType)
    type: VisibilityType;
}

@InputType()
export class DictionaryIdParams {
    @Field()
    dictionaryId: string;
}

@InputType()
export class UpdateDictionaryParams extends DictionaryIdParams {
    @Field({ nullable: true })
    name: string;

    @Field({ nullable: true })
    description: string;

    @Field(() => VisibilityType, { nullable: true })
    type: VisibilityType;
}

@InputType()
export class AddWordParams extends DictionaryIdParams {
    @Field()
    word: string;

    @Field(() => [String])
    translations: string[];

    @Field(() => [String], { defaultValue: [] })
    examples: string[];

    @Field(() => [String], { defaultValue: [] })
    tags: string[];
}

@InputType()
export class RemoveWordParams extends DictionaryIdParams {
    @Field()
    word: string;
}

@InputType()
export class ContributorParams extends DictionaryIdParams {
    @Field()
    contributorId: string;
}
