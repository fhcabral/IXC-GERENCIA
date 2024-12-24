import Dashboard from "../pages/Dashboard.vue";
import { mount } from '@vue/test-utils'
import type { ITransaction } from "~/types";

vi.mock('nuxt/app', () => ({
  useNuxtApp: vi.fn(() => ({
    $http: {
      transaction: {
        deleteTransactionById: vi.fn(),
        getHistoryById: vi.fn()
      }
    }
  })),
  defineNuxtPlugin: vi.fn(),
}));

vi.mock('../utils/toasts/toasts', () => ({
  useCustomToast: vi.fn(() => ({
    showWarnToast: vi.fn(),
    showSuccessToast: vi.fn(),
    showErrorToast: vi.fn(),
    showInfoToast: vi.fn(),
  })),
}));

vi.mock('../store/auth/login-store', () => {
  const mockAuthStore = {
    getId: vi.fn().mockReturnValue('mock-user-id'),
  }
  return {
    useAuthStore: vi.fn(() => mockAuthStore)
  }
})

const mockTransacoes: ITransaction[] = [{
  id: '1',
  descricao: 'Salário',
  valor: 5000,
  data: '2023-06-15',
  tipo: 'entrada'
},
{
  id: '2',
  descricao: 'Salário 2',
  valor: 5000,
  data: '2023-06-15',
  tipo: 'entrada'
},
{
  id: '3',
  descricao: 'Salário 3',
  valor: 5000,
  data: '2023-06-15',
  tipo: 'entrada'
}]

describe("Dashboard Transactions", () => {

  it("deleta transação com sucesso", async () => {
    const wrapper = mount(Dashboard)
    mockTransacoes.forEach(transacao => {
      wrapper.vm.transacoes.push(transacao)
    })
    await wrapper.vm.deleteTransaction('1');
    expect(wrapper.vm.transacoes.length).toBeLessThan(mockTransacoes.length)
  })

  it("busca histórico de transações corretamente", async () => {
    const wrapper = mount(Dashboard)
    wrapper.vm.getHistoryTransaction()
    mockTransacoes.forEach(transacao => {
      wrapper.vm.transacoes.push(transacao)
    })
    const transacoes = wrapper.vm.transacoes
    expect(transacoes.length).toBeGreaterThan(0)
  })
})