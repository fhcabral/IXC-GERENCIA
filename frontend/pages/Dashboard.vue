<template>
    <div class="dashboard-container">
        <!-- Sidebar -->
        <aside class="sidebar bg-[#4B5945] dark:bg-darkTheme-200">
            <div class="sidebar-content">
                <h2 class="sidebar-title text-white">IXC GERÊNCIA</h2>
                <nav class="sidebar-menu">
                    <button class="sidebar-menu-item" :class="{ 'active': activeModule === 'transacoes' }"
                        @click="activeModule = 'transacoes'">
                        Transações
                    </button>
                    <!-- Outros módulos futuros -->
                </nav>
            </div>
        </aside>

        <!-- Conteúdo Principal -->
        <main class="main-content bg-lightMode-100 dark:bg-darkTheme-150">
            <!-- Resumo Financeiro -->
            <div class="flex items-center justify-between mb-6">
                <h1 class="text-3xl 
               font-bold 
               text-[#4B5945] 
               dark:text-white 
               tracking-wider 
               uppercase">
                    DASHBOARD
                </h1>
            </div>
            <section class="financial-summary">
                <div class="summary-card">
                    <h3>Entradas</h3>
                    <p class="text-green-500">{{ formatCurrency(totalEntradas) }}</p>
                </div>
                <div class="summary-card">
                    <h3>Saídas</h3>
                    <p class="text-red-500">{{ formatCurrency(totalSaidas) }}</p>
                </div>
                <div class="summary-card">
                    <h3>Saldo Atual</h3>
                    <p :class="saldoClass">{{ formatCurrency(saldoAtual) }}</p>
                </div>
            </section>

            <!-- Formulário de Transações -->
            <section class="transaction-form">
                <h2>Cadastro de Transação</h2>
                <form @submit.prevent="adicionarTransacao">
                    <div class="form-group">
                        <label>Descrição</label>
                        <input v-model="novaTransacao.descricao" type="text" required class="input-field">
                    </div>
                    <div class="form-group">
                        <label>Valor</label>
                        <input v-model.number="novaTransacao.valor" type="number" required class="input-field">
                    </div>
                    <div class="form-group">
                        <label>Data</label>
                        <input v-model="novaTransacao.data" type="date" required class="input-field">
                    </div>
                    <button type="submit" class="submit-button">
                        Adicionar Transação
                    </button>
                </form>
            </section>

            <!-- Tabela de Transações -->
            <section class="transactions-table">
                <h2 class="text-center 
               text-2xl 
               font-bold 
               mb-6 
               text-[#4B5945] 
               dark:text-white 
               tracking-wider 
               uppercase">
                    Histórico de Transações
                </h2>
                <div class="table-controls">
                    <select v-model="filtroTipo" class="filter-select">
                        <option value="">Todos</option>
                        <option value="entrada">Entradas</option>
                        <option value="saida">Saídas</option>
                    </select>
                    <select v-model="ordenacao" class="filter-select">
                        <option value="data">Ordenar por Data</option>
                        <option value="valor">Ordenar por Valor</option>
                        <option value="descricao">Ordenar por Descrição</option>
                    </select>
                </div>

                <table>
                    <thead>
                        <tr>
                            <th>Descrição</th>
                            <th>Valor</th>
                            <th>Data</th>
                            <th>Ações</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(transacao, index) in transacoesFiltradas" :key="index">
                            <td>{{ transacao.descricao }}</td>
                            <td :class="transacao.valor > 0 ? 'text-green-500' : 'text-red-500'">
                                {{ formatCurrency(transacao.valor) }}
                            </td>
                            <td>{{ formatDate(transacao.data) }}</td>
                            <td>
                                <button @click="excluirTransacao(index)" class="delete-button">
                                    <span v-html="icon_trash(16, '#FFFFFF')"></span>
                                </button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </section>
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { icon_trash } from '~/utils/icon/icons';

// Interface para Tipagem da Transação
interface Transacao {
    id: number
    descricao: string
    valor: number
    data: string
    tipo: 'entrada' | 'saida'
}

// Estado das Transações
const transacoes = ref<Transacao[]>([])
const novaTransacao = ref<Omit<Transacao, 'id' | 'tipo'>>({
    descricao: '',
    valor: 0,
    data: ''
})

// Módulo Ativo
const activeModule = ref('transacoes')

// Filtros e Ordenação
const filtroTipo = ref<'' | 'entrada' | 'saida'>('')
const ordenacao = ref<'data' | 'valor' | 'descricao'>('data')

// Métodos de Formatação
const formatCurrency = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valor)
}

const formatDate = (data: string): string => {
    return new Date(data).toLocaleDateString('pt-BR')
}

// Validação de Transação
const validarTransacao = (transacao: Omit<Transacao, 'id' | 'tipo'>): boolean => {
    if (!transacao.descricao.trim()) {
        alert('Descrição é obrigatória')
        return false
    }

    if (transacao.valor === 0) {
        alert('Valor não pode ser zero')
        return false
    }

    const dataValida = /^\d{4}-\d{2}-\d{2}$/.test(transacao.data)
    if (!dataValida) {
        alert('Data inválida')
        return false
    }

    return true
}

// Adicionar Transação
const adicionarTransacao = () => {
    if (!validarTransacao(novaTransacao.value)) return

    const transacao: Transacao = {
        id: Date.now(), // Gera ID único
        ...novaTransacao.value,
        tipo: novaTransacao.value.valor > 0 ? 'entrada' : 'saida'
    }

    transacoes.value.push(transacao)

    // Resetar formulário
    novaTransacao.value = {
        descricao: '',
        valor: 0,
        data: ''
    }
}

// Excluir Transação
const excluirTransacao = (id: number) => {
    transacoes.value = transacoes.value.slice(id,1)
}

// Computados para Resumo Financeiro
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

const saldoAtual = computed(() => totalEntradas.value + totalSaidas.value)

// Transações Filtradas e Ordenadas
const transacoesFiltradas = computed(() => {
    let filtered = transacoes.value

    // Filtro por Tipo
    if (filtroTipo.value) {
        filtered = filtered.filter(t => t.tipo === filtroTipo.value)
    }

    // Ordenação
    return filtered.sort((a, b) => {
        switch (ordenacao.value) {
            case 'valor':
                return b.valor - a.valor
            case 'descricao':
                return a.descricao.localeCompare(b.descricao)
            default:
                return new Date(b.data).getTime() - new Date(a.data).getTime()
        }
    })
})

// Classe para Saldo
const saldoClass = computed(() =>
    saldoAtual.value >= 0 ? 'text-green-500' : 'text-red-500'
)
</script>

<style scoped>
.dashboard-container {
    @apply flex h-screen bg-lightMode-100 dark:bg-darkTheme-200 text-custom-100 dark:text-white;
}

.sidebar {
    @apply w-64 p-6 bg-[#4B5945] dark:bg-darkTheme-200 shadow-lg transition-all duration-300;
}

.sidebar-title {
    @apply text-2xl font-bold mb-6 text-white border-b border-[#6C8F66] pb-4;
}

.sidebar-menu {
    @apply space-y-2;
}

.sidebar-menu-item {
    @apply w-full p-3 text-left rounded-md transition-all duration-300 hover:bg-[#6C8F66] dark:hover:bg-[#91AC8F]/50 focus:outline-none focus:ring-2 focus:ring-[#6C8F66];
}

.sidebar-menu-item.active {
    @apply bg-[#6C8F66] text-white dark:bg-[#91AC8F]/50;
}

.main-content {
    @apply flex-1 p-8 overflow-y-auto bg-gradient-to-br from-lightMode-100 to-[#91AC8F]/20 dark:from-darkTheme-200 dark:to-darkTheme-200/20;
}

.financial-summary {
    @apply grid grid-cols-3 gap-6 mb-8 text-center;
}

.summary-card {
    @apply bg-white dark:bg-darkTheme-200/90 dark:border dark:border-[#91AC8F]/20 dark:hover:border-[#91AC8F]/40 p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 dark:shadow-xl dark:shadow-[#91AC8F]/10 dark:hover:shadow-[#91AC8F]/20;
}

.transaction-form {
    @apply bg-white dark:bg-darkTheme-200/80 p-6 rounded-xl shadow-md mb-8;
}

.form-group {
    @apply mb-4;
}

.input-field {
    @apply w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md bg-[#F0F4F8] dark:bg-darkTheme-200/50 focus:outline-none focus:ring-2 focus:ring-[#4B5945]/50 dark:focus:ring-[#91AC8F]/50 transition-all duration-300;
}

.submit-button {
    @apply w-full p-3 bg-[#4B5945] text-white rounded-md hover:bg-[#6C8F66] dark:bg-[#6C8F66] dark:hover:bg-[#91AC8F] transition-all duration-300;
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

table {
    @apply w-full border-collapse;
}

table thead {
    @apply bg-[#4B5945] text-white dark:bg-darkTheme-200/80;
}

table th,
table td {
    @apply p-4 text-left border-b border-gray-200 dark:border-gray-700;
}

.delete-button {
    @apply bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition-all duration-300;
}
</style>