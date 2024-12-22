import { UseCaseInterface } from "../../shared/use-cases/use-case.interfacce";

export type ParamDeleteTransaction = { transactionID: string }
export interface IDeleteTransaction extends UseCaseInterface<ParamDeleteTransaction, Promise<void> | void>{}