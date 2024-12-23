export interface ITransaction {
    id: string
    descricao: string
    valor: number
    data: string
    tipo: 'entrada' | 'saida' | null
}

export interface ItransactionResponse {
    transactionID: string;
    Date: string;
    description: string;
    value: number;
    recipeOrExit: 'entrada' | 'saida' | null
}

export interface ITransactionFounded {
    findByUser: ItransactionResponse[]
}

export interface INewTransaction {
    transactionID: string;
    date: string;
    description: string;
    value: number;
    recipeOrExit: 'entrada' | 'saida' | null
}

export interface ICreatedTransaction {
    createTransaction: INewTransaction
}