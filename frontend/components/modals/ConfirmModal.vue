<template>
  <div class="modal-overlay">
    <div class="modal-container">
      <div class="modal-header">
        <h2>Confirmar Transação</h2>
      </div>

      <div class="modal-content">
        <div class="transaction-summary">
          <div class="summary-item">
            <span class="label">Tipo de Transação:</span>
            <span :class="[
              'type-badge',
              novaTransacao.tipo === 'entrada' ? 'success' : 'danger'
            ]">
              {{ novaTransacao.tipo === 'entrada' ? 'Entrada' : 'Saída' }}
            </span>
          </div>

          <div class="summary-item">
            <span class="label">Valor:</span>
            <span class="value">
              {{ formatCurrency(novaTransacao.valor) }}
            </span>
          </div>

          <div class="summary-item" v-if="novaTransacao.descricao">
            <span class="label">Descrição:</span>
            <span>{{ novaTransacao.descricao }}</span>
          </div>

          <div class="summary-item" v-if="novaTransacao.data">
            <span class="label">Data:</span>
            <span>{{ formatDate(novaTransacao.data) }}</span>
          </div>
        </div>

        <p class="confirm-text">
          Você deseja adicionar essa transação?
        </p>
      </div>

      <div class="modal-actions">
        <button @click="$emit('close', false)" class="btn btn-secondary">
          Cancelar
        </button>
        <button @click="$emit('confirm', true)" class="btn btn-primary">
          Confirmar
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ITransaction } from '~/types';

defineProps<{
  novaTransacao: ITransaction
}>()

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value)
}

const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('pt-BR')
}
</script>

<style scoped>
.modal-overlay {
  @apply fixed top-0 left-0 w-full h-full bg-black/50 flex justify-center items-center z-[1000];
}

.modal-container {
  @apply bg-white dark:bg-gray-800 rounded-lg w-[400px] max-w-[90%] shadow-md;
}

.modal-header {
  @apply p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 rounded-t-lg flex justify-center items-center;
}

.modal-header h2 {
  @apply m-0 text-xl text-gray-700 dark:text-white text-center w-full;
}

.transaction-summary {
  @apply bg-gray-100 dark:bg-gray-700 rounded-md p-4 mb-4;
}

.summary-item {
  @apply flex justify-between mb-3;
}

.label {
  @apply font-medium text-gray-700 dark:text-gray-300;
}

.type-badge {
  @apply px-2 py-1 rounded-md font-bold;
}

.type-badge.success {
  @apply bg-green-500/10 text-green-600 dark:bg-green-500/20 dark:text-green-400;
}

.type-badge.danger {
  @apply bg-red-500/10 text-red-600 dark:bg-red-500/20 dark:text-red-400;
}

.value {
  @apply font-bold text-gray-700 dark:text-white;
}

.confirm-text {
  @apply text-center text-gray-600 dark:text-gray-300 mb-4;
}

.modal-actions {
  @apply flex justify-between p-4 border-t border-gray-200 dark:border-gray-700;
}

.btn {
  @apply px-5 py-2.5 rounded-md cursor-pointer transition-colors duration-300 focus:outline-none;
}

.btn-secondary {
  @apply bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-600 dark:text-white dark:hover:bg-gray-500;
}

.btn-primary {
  @apply bg-[#66785F] text-white hover:bg-[#5a6b55];
}
</style>