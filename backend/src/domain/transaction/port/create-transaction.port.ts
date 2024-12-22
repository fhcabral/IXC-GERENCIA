import { UseCaseInterface } from "../../shared/use-cases/use-case.interfacce";
import { Transaction } from "../entity/transaction.entity";

export interface ICreateTransaction extends UseCaseInterface<Partial<Transaction>, Partial<Transaction>>{}