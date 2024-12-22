import { head } from "lodash";
import "reflect-metadata";
import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { Transaction } from "../../../../domain/transaction/entity/transaction.entity";
import { CreateTransactionUseCase } from "../../../../use-case/transaction/create/create-transation.use-case";
import { DeleteTransactionUseCase } from "../../../../use-case/transaction/delete/delete-transaction.use-case";
import { FindTransactionByUser } from "../../../../use-case/transaction/find-by-user/find-by-user.use-case";
import ErrorHandling from "../../../shared/exception/error.handler";
import { CreateTransactionArg } from "./args-type/create-transaction.arg";
import { DeleteTransactionArg } from "./args-type/delete-transaction.arq";
import { ParamTransactionByUser } from "./args-type/find-by-user.arg-type";

@Service()
@Resolver(Transaction)
@ErrorHandling()
export class TransactionResolver implements ITransactionResolver {
  constructor(
    @Inject()
    private findTransactionByUser: FindTransactionByUser,
    @Inject()
    private createTransactionUseCase: CreateTransactionUseCase,
    @Inject() private deleteTransactionUseCase: DeleteTransactionUseCase
  ) {}

  @Query((returns) => [Transaction])
  async findByUser(@Args() { userID }: ParamTransactionByUser) {
    try {
      const user = await this.findTransactionByUser.execute({userID});
      const notUser = !!head([user]);
      if (!notUser) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns => Transaction)
  async createTransaction(@Args() transaction: CreateTransactionArg) {
    try {
      return this.createTransactionUseCase.execute(transaction);
    } catch (error) {
      throw error;
    }
  }
  @Mutation(returns => Boolean)
  async deleteTransaction(@Args() transaction: DeleteTransactionArg) {
    try {
      await  this.deleteTransactionUseCase.execute(transaction);
      return true
    } catch (error) {
      throw error;
    }
  }

}

export interface ITransactionResolver {
    findByUser(id: ParamTransactionByUser): Promise<any>;
}
