export interface ITransaction {
    id: number
    descricao: string
    valor: number
    data: string
    tipo: 'entrada' | 'saida' | null
}