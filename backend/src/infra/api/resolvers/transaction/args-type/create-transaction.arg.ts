import { ArgsType, Field, Float } from "type-graphql";

@ArgsType()
export class CreateTransactionArg{
    @Field({nullable: false})
    userID: string;
    @Field({nullable: false})
    description: string
    @Field(type=> Float,{nullable: false})
    value: number
    @Field({nullable: false})
    Date: string
    @Field({ nullable: false })
    recipeOrExit: string;
}