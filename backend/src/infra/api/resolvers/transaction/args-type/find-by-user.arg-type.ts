import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class ParamTransactionByUser{
    @Field({nullable: false})
    userID: string
}