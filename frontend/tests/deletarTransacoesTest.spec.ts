import Dashboard from "../pages/Dashboard.vue";
import { mount } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import type { ITransaction } from "~/types";

// Mock das dependências
vi.mock('~/stores/auth', () => ({
  authStore: {
    getId: vi.fn().mockReturnValue('user123'),
    logout: vi.fn()
  }
}))

// Mock do serviço HTTP
const mockHttpTransaction = {
  deleteTransactionById: vi.fn(),
  getHistoryById: vi.fn()
}

vi.mock('~/composables/useHttp', () => ({
  useHttp: () => ({
    transaction: mockHttpTransaction
  })
}))

describe("Dashboard Transactions", () => {

  it("deleta transação com sucesso", async () => {
    // Preparar dados de mock
    const transacoes = ref([
      { 
        id: '1', 
        valor: 1000, 
        tipo: 'entrada', 
        descricao: 'Salário', 
        data: '01-01-2024' 
      }
    ])

    const mockShowSuccessToast = vi.fn()
    vi.mock('~/composables/useToast', () => ({
      showSuccessToast: mockShowSuccessToast
    }))

    mockHttpTransaction.deleteTransactionById.mockResolvedValue({})
    const wrapper = mount(Dashboard, {
      global: {
        provide: {
          transacoes
        }
      }
    })

    await wrapper.vm.deleteTransaction(0)

    expect(mockHttpTransaction.deleteTransactionById).toHaveBeenCalledWith('1')
    expect(transacoes.value.length).toBe(0)
    expect(mockShowSuccessToast).toHaveBeenCalledWith('Transação deletada com sucesso!')
  })

  it("busca histórico de transações corretamente", async () => {
    const mockTransactions = [
      {
        transactionID: '1',
        description: 'Salário',
        value: 1000,
        Date: '01-01-2024',
        recipeOrExit: 'entrada'
      }
    ]

    mockHttpTransaction.getHistoryById.mockResolvedValue(mockTransactions)


    const wrapper = mount(Dashboard)

    await wrapper.vm.getHistoryTransaction()

    expect(mockHttpTransaction.getHistoryById).toHaveBeenCalledWith('user123')
    
    const transacoes = wrapper.vm.transacoes
    expect(transacoes.length).toBe(1)
    expect(transacoes[0]).toEqual({
      id: '1',
      descricao: 'Salário',
      valor: 1000,
      data: '01-01-2024',
      tipo: 'entrada'
    })
  })
})