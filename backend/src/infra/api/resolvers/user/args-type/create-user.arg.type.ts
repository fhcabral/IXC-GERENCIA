import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class CreateUserArg{
    @Field({nullable: false})
    username: string
    @Field({nullable: false})
    surname: string
    @Field({nullable: false})
    password: string
}