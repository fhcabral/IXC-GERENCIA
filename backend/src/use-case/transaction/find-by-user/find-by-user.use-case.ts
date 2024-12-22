import { first } from "lodash";
import { Inject, Service } from "typedi";
import { Transaction } from "../../../domain/transaction/entity/transaction.entity";
import { IFindTransactionByUser, ParamFindTransactionByUser } from "../../../domain/transaction/port/find-by-user.port";
import { TransactionRepository } from "../../../infra/api/repository/transaction/transaction.repository";

@Service()
export class FindTransactionByUser implements IFindTransactionByUser{
    constructor(@Inject() private readonly transactionRepository: TransactionRepository) {}
    
    async execute(data: ParamFindTransactionByUser): Promise<Transaction[]> {
        const prop = first(Object.keys(data));
        const value = first(Object.values(data)) as string;
        return this.transactionRepository.getByProp(prop, value);
    }

}