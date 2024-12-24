import { config } from '@vue/test-utils'

vi.mock('../utils/toasts/toasts', () => ({
  useCustomToast: vi.fn(() => ({
    showWarnToast: vi.fn(),
    showSuccessToast: vi.fn(),
    showErrorToast: vi.fn(),
    showInfoToast: vi.fn(),
  })),
}));

vi.mock('../store/auth/login-store')

vi.mock('nuxt/app', () => ({
  useNuxtApp: vi.fn(() => ({
    $http: {
      transaction: {
        createTransaction: vi.fn().mockResolvedValue({
          id: 'transaction123',
          descricao: 'Salário',
          valor: 100,
          data: '2023-06-15',
          tipo: 'entrada'
        })
      }
    }
  })),
  defineNuxtPlugin: vi.fn(),
}));


config.global.stubs = {
  NuxtLink: true,
  NuxtLayout: true,
  NuxtPage: true,
  MazSelect: true,
  MazTable: true,
  MazTableRow:  true,
  MazTableCell: true,
  MazBtn: true
}
