import { mount } from '@vue/test-utils'
import { describe, it, expect } from 'vitest'
import CardHistoricoDeTransacao from '../components/dashboard/CardHistoricoDeTransacao.vue'
import type { ITransaction } from '~/types'

const mockTransacoes: ITransaction[] = [
  {
    id: '1',
    descricao: 'Salário',
    valor: 5000,
    data: '2023-06-15',
    tipo: 'entrada'
  },
  {
    id: '2',
    descricao: 'Aluguel',
    valor: 2000,
    data: '2023-06-10',
    tipo: 'saida'
  },
  {
    id: '3',
    descricao: 'Freelance',
    valor: 1500,
    data: '2023-06-05',
    tipo: 'entrada'
  }
]

describe('CardHistoricoDeTransacao', () => {
  it('renderiza lista de transações corretamente', () => {
    const wrapper = mount(CardHistoricoDeTransacao, {
      props: {
        transacoes: mockTransacoes
      }
    })

    const rows = wrapper.vm.transacoesFiltradas
    expect(rows.length).toBe(mockTransacoes.length)
  })

  it('filtra transações por tipo corretamente', async () => {
    const wrapper = mount(CardHistoricoDeTransacao, {
      props: {
        transacoes: mockTransacoes
      }
    })

    const entradaTransacoes = wrapper.vm.transacoesFiltradas.filter((item: ITransaction) => item.tipo === "entrada")
    expect(entradaTransacoes.length).toBe(2)
    expect(entradaTransacoes.every((t: ITransaction) => t.tipo === 'entrada')).toBe(true)
  })

  it('ordena transações por valor corretamente', async () => {
    const wrapper = mount(CardHistoricoDeTransacao, {
      props: {
        transacoes: mockTransacoes
      }
    })

    wrapper.vm.ordenacao = 'valor'

  const transacoesOrdenadas = wrapper.vm.transacoesFiltradas
  expect(transacoesOrdenadas[0].valor).toBe(5000)
  expect(transacoesOrdenadas[2].valor).toBe(1500)
  })

  it('formata moeda corretamente', () => {
    const wrapper = mount(CardHistoricoDeTransacao, {
      props: {
        transacoes: mockTransacoes
      }
    })

    const formatCurrency = wrapper.vm.formatCurrency

    const valorEntrada = formatCurrency(5000, 'entrada');
    const valorSaida = formatCurrency(2000, 'saida');
    expect(valorEntrada.toString()).toMatch(valorEntrada)
    expect(valorSaida.toString()).toMatch(valorSaida)
  })

  it('formata data corretamente', () => {
    const wrapper = mount(CardHistoricoDeTransacao, {
      props: {
        transacoes: mockTransacoes
      }
    })

    const formatDate = wrapper.vm.formatDate
    expect(formatDate('2023-06-15')).toBe('15/06/2023')
  })

  it('emite evento de remoção de transação', async () => {
    const wrapper = mount(CardHistoricoDeTransacao, {
      props: {
        transacoes: mockTransacoes
      }
    })

    // Simula clique no botão de excluir primeira transação
    await wrapper.vm.excluirTransacao(0)

    // Verifica se o evento foi emitido com o índice correto
    expect(wrapper.emitted('remove-transaction')?.[0]).toEqual([0])
  })
})