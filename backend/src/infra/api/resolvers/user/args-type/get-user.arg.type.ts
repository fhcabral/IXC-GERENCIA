import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class GetUserArg{
    @Field({nullable: false})
    surname: string
}