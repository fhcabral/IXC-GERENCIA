import type { ITransaction, ITransactionFounded, ICreatedTransaction } from "~/types";
import { GET_TRANSACTION_HISTORY } from '~/services/graphql/queries/';
import { CREATE_TRANSACTION, DELETE_TRANSACTION } from "../graphql/mutations";
import type { GraphQLClient } from 'graphql-request';

export class TransactionService {
    private $graphql: GraphQLClient;

    constructor($graphql: GraphQLClient) {
        this.$graphql = $graphql;
    }

    async getHistoryById(userId: string) {
        try {
            const result = await this.$graphql.request<ITransactionFounded>(GET_TRANSACTION_HISTORY, {
                userId
            });
            return result.findByUser;
        } catch (error) {
            console.error('Erro ao consultar:', error);
            throw error;
        }
    }

    async deleteTransactionById(transactionId: string) {
        try {
            const result = await this.$graphql.request<ITransactionFounded>(DELETE_TRANSACTION, {
                transactionId
            });
            return result;
        } catch (error) {
            console.error('Erro ao consultar:', error);
            throw error;
        }
    }

    async createTransaction(data: ITransaction) {
        try {
            const { data: transaction } = await useAsyncData('user', async () => {
                return await this.$graphql.request(CREATE_TRANSACTION, {
                    userId: data.id,
                    description: data.descricao, 
                    value: data.valor,
                    date: data.data,
                    recipeOrExit: data.tipo,
                }) as ICreatedTransaction;
            });
    
            const transactionID  = transaction.value?.createTransaction.transactionID || '';
    
            return {
                ...data,
                id: transactionID
            } as ITransaction;
        } catch (error) {
            console.error('Erro ao criar transação:', error);
            throw error;
        }
    }
}