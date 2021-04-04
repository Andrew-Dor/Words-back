import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";
import {IsEmail, MinLength} from "class-validator";

@ObjectType('User')
export class UserType{
    @Field(()=>ID)
    id: string;

    @Field()
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}

@InputType()
export class CreateUserParams{
    @Field()
    @MinLength(4)
    name: string;

    @Field()
    @IsEmail()
    email: string;

    @Field()
    password: string;
}
