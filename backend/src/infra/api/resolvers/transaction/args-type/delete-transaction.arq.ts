import { ArgsType, Field } from "type-graphql";

@ArgsType()
export class DeleteTransactionArg{
    @Field({nullable: false})
    transactionID: string;
}