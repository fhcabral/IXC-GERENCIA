<template>
  <section class="transactions-table">
    <h2 class="section-title">
      Histórico de Transações
    </h2>
    <div class="table-controls">
      <MazSelect v-model="filtroTipo" label="Tipo de Transação" :options="[
        { value: '', label: 'Todos' },
        { value: 'entrada', label: 'Entradas' },
        { value: 'saida', label: 'Saídas' }
      ]" color="primary" />

      <MazSelect v-model="ordenacao" label="Ordenar por" :options="[
        { value: 'data', label: 'Data' },
        { value: 'valor', label: 'Valor' },
        { value: 'descricao', label: 'Descrição' }
      ]" color="primary" />
    </div>

    <MazTable v-if="transacoesFiltradas.length > 0" size="lg" pagination hoverable :headers="[
      { label: 'ID', key: 'id', align: 'center' },
      { label: 'DESCRIÇÃO', key: 'descricao', align: 'center' },
      { label: 'VALOR', key: 'valor', align: 'center' },
      { label: 'DATA', key: 'data', align: 'center' },
      { label: 'AÇÕES', key: 'acoes', align: 'center', sortable: false }
    ]" :rows="transacoesFiltradas"
      :translations="{ noResults: 'Nenhum resultado encontrado :(', paginationRowsPerPage: 'Linhas por página', paginationOf: 'de'}">
      <template #cell-id="{ value }">
        {{ value }}
      </template>

      <template #cell-descricao="{ value }">
        {{ value }}
      </template>

      <template #cell-valor="{ row }">
        <span :class="row.tipo === 'entrada' ? 'text-green-500' : 'text-red-500'">
          {{ formatCurrency(row.valor, row.tipo) }}
        </span>
      </template>

      <template #cell-data="{ value }">
        {{ formatDate(value) }}
      </template>

      <template #cell-acoes="{ row }">
        <MazBtn @click="excluirTransacao(row.id)" class="delete-button" color="danger" rounded-size="full">
          <span v-html="icon_trash(16, '#FFFFFF')"></span>
        </MazBtn>
      </template>
    </MazTable>
  </section>
</template>

<script setup lang="ts">
import MazTable from 'maz-ui/components/MazTable'
import MazBtn from 'maz-ui/components/MazBtn'
import type { ITransaction } from '~/types';
import { icon_trash } from '../../utils/icon/icons';
import { ref, computed } from 'vue';

const props = defineProps<{
  transacoes: ITransaction[]
}>()
const emit = defineEmits(['remove-transaction']);

const transacoes = ref(props.transacoes);
const excluirTransacao = (transactionIndex: string) => {
  emit('remove-transaction', transactionIndex)
}

const filtroTipo = ref<'' | 'entrada' | 'saida'>('')
const ordenacao = ref<'data' | 'valor' | 'descricao'>('data')

const formatCurrency = (valor: number, tipo?: string | null) => {
  const formattedValue = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(Math.abs(valor))

  return tipo === 'saida' ? `-${formattedValue}` : `+${formattedValue}`
}

const formatDate = (data: string): string => {
  const [ano, mes, dia] = data.split('-').map(Number)
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR')
}

const transacoesFiltradas = computed(() => {
  let filtered = transacoes.value

  if (filtroTipo.value) {
    filtered = filtered.filter(t => t.tipo === filtroTipo.value)
  }

  return filtered.sort((a, b) => {
    switch (ordenacao.value) {
      case 'valor':
        return b.valor - a.valor
      case 'descricao':
        return a.descricao.localeCompare(b.descricao)
      default:
        return new Date(b.data).getTime() - new Date(a.data).getTime()
    }
  }) as ITransaction[]
})

defineExpose({
  ordenacao,
  transacoesFiltradas,
  formatDate,
  excluirTransacao,
  formatCurrency
})
</script>

<style scoped>
.section-title {
  @apply text-center text-2xl font-bold mb-6 text-[#4B5945] dark:text-white tracking-wider uppercase;
}

.transactions-table {
  @apply bg-white dark:bg-darkTheme-200/80 p-6 rounded-xl shadow-md;
}

.table-controls {
  @apply flex justify-between mb-4;
}

.filter-select {
  @apply p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-[#F0F4F8] dark:bg-darkTheme-200/50 focus:outline-none focus:ring-2 focus:ring-[#4B5945]/50 dark:focus:ring-[#91AC8F]/50;
}

.delete-button {
  @apply bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-300;
}
</style>