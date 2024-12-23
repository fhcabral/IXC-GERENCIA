import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import CardResumo from '../components/dashboard/CardResumo.vue'
import type { ITransaction } from '~/types'

describe("Resumo de transações", () => {
  it("calcula total de entradas corretamente", () => {
    const transacoes: ITransaction[] = [
      { id: '1', valor: 1000, tipo: 'entrada', descricao: 'Salário', data: '01-01-2024' },
      { id: '2', valor: 500, tipo: 'entrada', descricao: 'Freelance', data: '02-02-2024' },
      { id: '3', valor: 200, tipo: 'saida', descricao: 'Conta de luz', data: '03-03-2024' }
    ]

    const wrapper = mount(CardResumo, {
      props: { transacoes }
    })

    const totalEntradas = wrapper.vm.totalEntradas

    expect(totalEntradas).toBe(1500)
  })

  it("calcula total de saídas corretamente", () => {
    const transacoes: ITransaction[] = [
      { id: '1', valor: 1000, tipo: 'entrada', descricao: 'Salário', data: '01-01-2024' },
      { id: '2', valor: 500, tipo: 'saida', descricao: 'Supermercado', data: '02-02-2024' },
      { id: '3', valor: 200, tipo: 'saida', descricao: 'Conta de luz', data: '03-03-2024' }
    ]

    const wrapper = mount(CardResumo, {
      props: { transacoes }
    })

    const totalSaidas = wrapper.vm.totalSaidas

    expect(totalSaidas).toBe(700)
  })

  it("calcula saldo atual corretamente quando entradas são maiores", () => {
    const transacoes: ITransaction[] = [
      { id: '1', valor: 2000, tipo: 'entrada', descricao: 'Salário', data: '01-01-2024' },
      { id: '2', valor: 500, tipo: 'saida', descricao: 'Supermercado', data: '02-02-2024' },
      { id: '3', valor: 200, tipo: 'saida', descricao: 'Conta de luz', data: '03-03-2024' }
    ]

    const wrapper = mount(CardResumo, {
      props: { transacoes }
    })

    const saldoAtual = wrapper.vm.saldoAtual

    expect(saldoAtual).toBe(1300)
  })

  it("calcula saldo atual corretamente quando saídas são maiores", () => {
    const transacoes: ITransaction[] = [
      { id: '1', valor: 1000, tipo: 'entrada', descricao: 'Salário', data: '01-01-2024' },
      { id: '2', valor: 1500, tipo: 'saida', descricao: 'Supermercado', data: '02-02-2024' },
      { id: '3', valor: 200, tipo: 'saida', descricao: 'Conta de luz', data: '03-03-2024' }
    ]

    const wrapper = mount(CardResumo, {
      props: { transacoes }
    })

    const saldoAtual = wrapper.vm.saldoAtual

    expect(saldoAtual).toBe(-700)
  })

  it("retorna classe de saldo correta", () => {
    // Teste para saldo positivo
    const transacoesPositivas: ITransaction[] = [
      { id: '1', valor: 2000, tipo: 'entrada', descricao: 'Salário', data: '01-01-2024' },
      { id: '2', valor: 500, tipo: 'saida', descricao: 'Supermercado', data: '02-02-2024' }
    ]

    const wrapperPositivo = mount(CardResumo, {
      props: { transacoes: transacoesPositivas }
    })

    expect(wrapperPositivo.vm.saldoClass).toBe('text-green-500')

    // Teste para saldo negativo
    const transacoesNegativas: ITransaction[] = [
      { id: '1', valor: 1000, tipo: 'entrada', descricao: 'Salário', data: '01-01-2024' },
      { id: '2', valor: 1500, tipo: 'saida', descricao: 'Supermercado', data: '02-02-2024' }
    ]

    const wrapperNegativo = mount(CardResumo, {
      props: { transacoes: transacoesNegativas }
    })

    expect(wrapperNegativo.vm.saldoClass).toBe('text-red-500')
  })

  it("lida corretamente com array de transações vazio", () => {
    const wrapper = mount(CardResumo, {
      props: { transacoes: [] }
    })

    expect(wrapper.vm.totalEntradas).toBe(0)
    expect(wrapper.vm.totalSaidas).toBe(0)
    expect(wrapper.vm.saldoAtual).toBe(0)
  })
})