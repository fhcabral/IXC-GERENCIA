import { get } from "lodash";
import { Field, Float, ID, ObjectType } from "type-graphql";

@ObjectType()
export class Transaction {
  constructor(transaction: Transaction){
    this.transactionID   = get(transaction,'transactionID', null);
    this.description = get(transaction,'description', null);
    this.Date = get(transaction,'Date', null);
    this.value  = get(transaction,'value', null);
    this.userID = get(transaction,'userID',null)
  }
  @Field(tyoe => ID!)
  transactionID: string
  @Field(tyoe => ID!)
  userID: string
  @Field()
  description: string;
  @Field(type=> Float)
  value: number;
  @Field({ nullable: true })
  Date: string;

  @Field({ nullable: false })
  recipeOrExit: string;
} 