import { Service } from "typedi";
import { Transaction } from "../../../../domain/transaction/entity/transaction.entity";
import { ITransactionRepositoryInterface } from "../../../../domain/transaction/repository/transaction.repository";
import { TransactionModel } from "../../conf/data/mongo/schemas/transation";

@Service()
export class TransactionRepository implements ITransactionRepositoryInterface {
  constructor() {}

  async create(data: Partial<Transaction>): Promise<Partial<Transaction>> {
    try {
      const transaction = new TransactionModel(data);
      await transaction.save();
      return transaction
    } catch (error) {
      throw error;
    }
  }

  async update(id: number, data: Partial<Transaction>): Promise<void> {
    try {
      const result = await TransactionModel.findOneAndUpdate(
        { transactionID: id },
        data,
        { new: true } // Retorna o documento atualizado
      );

      if (!result) {
        throw new Error(`Transação com ID ${id} não encontrada.`);
      }

    } catch (error) {
      throw error;
    }
  }

  async patch(id: number, data: Partial<Partial<Transaction>>): Promise<void> {
    try {
      const result = await TransactionModel.findOneAndUpdate(
        { transactionID: id },
        { $set: data },
        { new: true }
      );

      if (!result) {
        throw new Error(`Transação com ID ${id} não encontrada.`);
      }

    } catch (error) {
      throw error;
    }
  }


  async getById(id: number): Promise<Partial<Transaction>> {
    try {
      const transaction = await TransactionModel.findOne({ transactionID: id });

      if (!transaction) {
        throw new Error(`Transação com ID ${id} não encontrada.`);
      }

      return transaction as Partial<Transaction>;
    } catch (error) {
      throw error;
    }
  }


  async getAll(): Promise<Partial<Transaction>[]> {
    try {
      const transactions = await TransactionModel.find();
      return transactions as Partial<Transaction>[];
    } catch (error) {
      throw error;
    }
  }

  async getOne(filter: Partial<Partial<Transaction>>): Promise<Partial<Transaction>> {
    try {
      const transaction = await TransactionModel.findOne(filter);

      if (!transaction) {
        throw new Error("Nenhuma transação encontrada com o filtro especificado.");
      }

      return transaction as Partial<Transaction>;
    } catch (error) {
      throw error;
    }
  }

  async getMany(filter: Partial<Partial<Transaction>>): Promise<Partial<Transaction>[]> {
    try {
      const transactions = await TransactionModel.find(filter);
      return transactions as Partial<Transaction>[];
    } catch (error) {
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await TransactionModel.findOneAndDelete({ transactionID: id });

      if (!result) {
        throw new Error(`Transação com ID ${id} não encontrada.`);
      }
      return;
    } catch (error) {
      console.log(String(error))
      throw error;
    }
  }

  async getByProp(prop: string, value: any): Promise<Transaction[]> {
    try {
      const filter: Record<string, unknown> = { [prop]: value };
      const transaction = await TransactionModel.find(filter);

      if (!transaction) {
        throw new Error(`Nenhuma transação encontrada com ${prop} = ${value}.`);
      }

      return transaction;
    } catch (error) {
      throw error;
    }
  }
}
