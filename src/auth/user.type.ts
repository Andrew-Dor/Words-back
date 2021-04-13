import { Field, ID, InputType, ObjectType } from '@nestjs/graphql';
import {
    IsEmail,
    IsString,
    Matches,
    MaxLength,
    MinLength,
} from 'class-validator';
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {Document, Schema as MongooseSchema} from "mongoose";

@ObjectType()
@Schema()
export class User {
    @Field(() => ID)
    _id: MongooseSchema.Types.ObjectId;

    @Field()
    @Prop()
    name: string;

    @Field()
    @Prop({unique:true})
    email: string;

    @Field()
    @Prop()
    password: string;
}

export type UserDocument = User & Document;
export const UserSchema = SchemaFactory.createForClass(User);

@InputType()
export class CreateUserParams {
    @Field()
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    @MinLength(8)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
        message: 'Password too weak!',
    })
    password: string;
}

@InputType()
export class SignInParams {
    @Field()
    @IsEmail()
    email: string;

    @Field()
    @IsString()
    password: string;
}

@ObjectType()
export class AccessTokenObject {
    @Field()
    accessToken: string;
}
