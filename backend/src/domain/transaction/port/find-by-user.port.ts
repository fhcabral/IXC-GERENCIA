import { UseCaseInterface } from "../../shared/use-cases/use-case.interfacce";
import { Transaction } from "../entity/transaction.entity";

export type ParamFindTransactionByUser = { userID: string};
export interface IFindTransactionByUser extends UseCaseInterface<ParamFindTransactionByUser, Transaction[]>{}