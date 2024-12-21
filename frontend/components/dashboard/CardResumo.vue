<template>
    <div class="dashboard-header">
        <h1 class="dashboard-title">
            DASHBOARD
        </h1>
    </div>

    <section class="financial-summary">
        <div class="summary-card">
            <h3>Entradas</h3>
            <p class="summary-value positive">
                {{ formatCurrency(totalEntradas) }}
            </p>
        </div>
        <div class="summary-card">
            <h3>Saídas</h3>
            <p class="summary-value negative">
                {{ formatCurrency(totalSaidas) }}
            </p>
        </div>
        <div class="summary-card">
            <h3>Saldo Atual</h3>
            <p class="summary-value" :class="saldoClass">
                {{ formatCurrency(saldoAtual) }}
            </p>
        </div>
    </section>
</template>

<script setup lang="ts">
const props = withDefaults(defineProps<{
    transacoes: ITransaction[]
}>(), {
    transacoes: () => []
})

import type { ITransaction } from '~/types';
const transacoes = computed(() => props.transacoes);

const totalEntradas = computed(() =>
    transacoes.value
        .filter(t => t.tipo === 'entrada')
        .reduce((sum, t) => sum + t.valor, 0)
)

const totalSaidas = computed(() =>
    transacoes.value
        .filter(t => t.tipo === 'saida')
        .reduce((sum, t) => sum + t.valor, 0)
)

const saldoAtual = computed(() => {
    if (totalEntradas.value >= totalSaidas.value) {
        return totalEntradas.value - totalSaidas.value
    } 
    return -(totalSaidas.value - totalEntradas.value)
})

const saldoClass = computed(() =>
    saldoAtual.value >= 0 ? 'text-green-500' : 'text-red-500'
)

const formatCurrency = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)
}
</script>

<style scoped>
.dashboard-header {
    @apply flex items-center justify-between mb-6;
}

.dashboard-title {
    @apply text-3xl font-bold text-[#4B5945] dark:text-white tracking-wider uppercase;
}

.financial-summary {
    @apply grid grid-cols-3 gap-6 mb-8 text-center;
}

.summary-card {
    @apply bg-white dark:bg-darkTheme-200/90 dark:border dark:border-[#91AC8F]/20 dark:hover:border-[#91AC8F]/40 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 dark:shadow-xl dark:shadow-[#91AC8F]/10 dark:hover:shadow-[#91AC8F]/20;
}

.summary-value {
    @apply text-xl font-bold;
}

.summary-value.positive {
    @apply text-green-500;
}

.summary-value.negative {
    @apply text-red-500;
}
</style>