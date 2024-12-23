
import { mount } from '@vue/test-utils'
import { expect, describe, it } from 'vitest'
import CardCadastroDeTransacao from '../components/dashboard/CardCadastroDeTransacao.vue'

describe('CardCadastroDeTransacao', () => {

  it('valida campos obrigatórios', async () => {
    const wrapper = mount(CardCadastroDeTransacao)

    const validacao = wrapper.vm.validarTransacao({
      descricao: '',
      valor: 0,
      data: ''
    })

    expect(validacao).toBe(false)
  })

  it('formata valor corretamente', async () => {
    const wrapper = mount(CardCadastroDeTransacao)

    const input = wrapper.find('input[type="text"][inputmode="numeric"]')
    await input.setValue('10000')

    expect(wrapper.vm.valorFormatado).toContain('100,00')
    expect(wrapper.vm.novaTransacao.valor).toBe(100)
  })

//   it('abre modal de confirmação com campos válidos', async () => {
//     const wrapper = mount(CardCadastroDeTransacao, {
//         global: {
//           plugins: []
//         }
//       })
    
//       // Seleciona o tipo de transação (para MazSelect)
//       const mazSelect = wrapper.findComponent({ name: 'MazSelect' })
//       await mazSelect.vm.$emit('update:modelValue', 'entrada')
    
//       // Preenche data
//       const dataInput = wrapper.find('input[type="date"]')
//       await dataInput.setValue('2023-06-15')
    
//       // Preenche descrição
//       const descricaoInput = wrapper.find('input[placeholder="Digite aqui sua descrição"]')
//       await descricaoInput.setValue('Salário')
    
//       // Preenche valor
//       const valorInput = wrapper.find('input[placeholder="R$ 0,00"]')
//       await valorInput.setValue('10000') // Simula digitação
//       await valorInput.trigger('input') // Dispara evento de input para formatação
    
//       // Verifica se os valores foram preenchidos corretamente
//       expect(wrapper.vm.transactionType).toBe('entrada')
//       expect(wrapper.vm.novaTransacao.data).toBe('2023-06-15')
//       expect(wrapper.vm.novaTransacao.descricao).toBe('Salário')
//       expect(wrapper.vm.valorFormatado).toContain('100,00')
//   })

//   it('adiciona transação com sucesso', async () => {
//     const mockCreateTransaction = vi.fn().mockResolvedValue({
//       id: 'transaction123',
//       descricao: 'Salário',
//       valor: 100,
//       data: '2023-06-15',
//       tipo: 'entrada'
//     })

//     const wrapper = mount(CardCadastroDeTransacao, {
//       global: {
//         plugins: [],
//         provide: {
//           $http: {
//             transaction: {
//               createTransaction: mockCreateTransaction
//             }
//           }
//         }
//       }
//     })

//     wrapper.vm.novaTransacao.descricao = 'Salário'
//     wrapper.vm.novaTransacao.valor = 100
//     wrapper.vm.novaTransacao.data = '2023-06-15'
//     wrapper.vm.transactionType = 'entrada'

//     // Chama método de adição de transação
//     await wrapper.vm.adicionarTransacao(true)

//     expect(mockCreateTransaction).toHaveBeenCalled()
//     expect(wrapper.vm.transacoes.length).toBe(1)
//     expect(wrapper.vm.showConfirmModal).toBe(false)
//   })

//   it('reseta formulário após adicionar transação', async () => {
//     const wrapper = mount(CardCadastroDeTransacao, {
//       global: {
//         plugins: []
//       }
//     })

//     // Preenche campos
//     wrapper.vm.novaTransacao.descricao = 'Salário'
//     wrapper.vm.novaTransacao.valor = 100
//     wrapper.vm.novaTransacao.data = '2023-06-15'
//     wrapper.vm.transactionType = 'entrada'

//     // Reseta formulário
//     wrapper.vm.resetFormulario()

//     expect(wrapper.vm.novaTransacao.descricao).toBe('')
//     expect(wrapper.vm.novaTransacao.valor).toBe(0)
//     expect(wrapper.vm.transactionType).toBe(null)
//   })
})