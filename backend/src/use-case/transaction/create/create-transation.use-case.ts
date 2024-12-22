import { Inject, Service } from "typedi";
import { Transaction } from "../../../domain/transaction/entity/transaction.entity";
import { ICreateTransaction } from "../../../domain/transaction/port/create-transaction.port";
import { TransactionRepository } from "../../../infra/api/repository/transaction/transaction.repository";

@Service()
export class CreateTransactionUseCase implements ICreateTransaction{
    constructor(@Inject() private readonly transactionRepository: TransactionRepository) {}
    
    async execute(data: Partial<Transaction>): Promise<Partial<Transaction>> {
        return this.transactionRepository.create(data)
    }

}