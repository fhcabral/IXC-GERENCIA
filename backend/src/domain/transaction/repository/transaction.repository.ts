import { Transaction } from '../entity/transaction.entity';
import { RepositoryInterface } from './../../shared/repository/repository.interface';

export interface ITransactionRepositoryInterface
  extends Partial<RepositoryInterface<Partial<Transaction>>> {}