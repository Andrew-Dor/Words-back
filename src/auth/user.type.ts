import { Field, ID, InputType, ObjectType } from "@nestjs/graphql";

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
    name: string;

    @Field()
    email: string;

    @Field()
    password: string;
}
