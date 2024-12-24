
import { mount } from '@vue/test-utils'
import { expect, describe, it, vi } from 'vitest'
import CardCadastroDeTransacao from '../components/dashboard/CardCadastroDeTransacao.vue'

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

describe('CardCadastroDeTransacao', () => {

  it('valida campos obrigatórios', async () => {
    const wrapper = mount(CardCadastroDeTransacao, {
      props: {
        transacoes: []
      },
      global: {
      }
    })

    const validacao = wrapper.vm.validarTransacao({
      descricao: '',
      valor: 0,
      data: ''
    })

    expect(validacao).toBe(false)
  })

  it('formata valor corretamente', async () => {
    const wrapper = mount(CardCadastroDeTransacao, {
      props: {
        transacoes: []
      },
      global: {
      }
    })

    const inputElement = document.createElement('input');
    inputElement.value = '10000';
    const event = new Event('input');
    Object.defineProperty(event, 'target', { value: inputElement });
    wrapper.vm.formatarValor(event)
    const valorEsperado = 'R$ 100,00'.replace(/\s/g, ' ');
    const valorReal = wrapper.vm.valorFormatado.replace(/\u00A0/g, ' ');
    expect(valorReal).toBe(valorEsperado)
    expect(wrapper.vm.novaTransacao.valor).toBe(100)
  })

  it('abre modal de confirmação com campos válidos', async () => {
    const wrapper = mount(CardCadastroDeTransacao, {
      props: {
        transacoes: []
      },
      global: {
      }
    })

    const mazSelect = wrapper.findComponent({ name: 'MazSelect' })
    await mazSelect.vm.$emit('update:modelValue', 'entrada')

    const dataInput = wrapper.find('input[type="date"]')
    await dataInput.setValue('2023-06-15')

    const descricaoInput = wrapper.find('input[placeholder="Digite aqui sua descrição"]')
    await descricaoInput.setValue('Salário')

    const valorInput = wrapper.find('input[placeholder="R$ 0,00"]')
    await valorInput.setValue('10000')
    await valorInput.trigger('input')

    expect(wrapper.vm.transactionType).toBe('entrada')
    expect(wrapper.vm.novaTransacao.data).toBe('2023-06-15')
    expect(wrapper.vm.novaTransacao.descricao).toBe('Salário')
    expect(wrapper.vm.valorFormatado).toContain('100,00')
  })

  it('adiciona transação com sucesso', async () => {
    const wrapper = mount(CardCadastroDeTransacao, {
      props: {
        transacoes: []
      },
      global: {
        plugins: [],
      }
    })
  
    await wrapper.vm.adicionarTransacao(true)
    expect(wrapper.vm.transacoes.length).toBe(1);
    expect(wrapper.vm.transacoes[0].descricao).toBe('Salário');
    expect(wrapper.vm.showConfirmModal).toBe(false);
  })

    it('reseta formulário após adicionar transação', async () => {
      const wrapper = mount(CardCadastroDeTransacao, {
        global: {
          plugins: []
        }
      })

      wrapper.vm.novaTransacao.descricao = 'Salário'
      wrapper.vm.novaTransacao.valor = 100
      wrapper.vm.novaTransacao.data = '2023-06-15'
      wrapper.vm.transactionType = 'entrada'
      wrapper.vm.resetFormulario()

      expect(wrapper.vm.novaTransacao.descricao).toBe('')
      expect(wrapper.vm.novaTransacao.valor).toBe(0)
      expect(wrapper.vm.transactionType).toBe(null)
    })
})