import { Inject, Service } from "typedi";
import { IDeleteTransaction, ParamDeleteTransaction } from "../../../domain/transaction/port/delete-transaction.port";
import { TransactionRepository } from "../../../infra/api/repository/transaction/transaction.repository";

@Service()
export class DeleteTransactionUseCase implements IDeleteTransaction{
    constructor(@Inject() private readonly transactionRepository: TransactionRepository) {}
    
    async execute({ transactionID }: ParamDeleteTransaction): Promise<void> {
        console.log(transactionID)
        return this.transactionRepository.delete(transactionID)
    }

}