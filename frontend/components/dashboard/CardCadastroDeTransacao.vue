<template>
    <section class="transaction-form">
        <h2 class="section-title">
            Cadastro de transação
        </h2>
        <form @submit.prevent="openConfirmModal">
            <div class="form-group flex flex-col">
                <label>Tipo de Transação <span class="required">*</span></label>
                <MazSelect v-model="transactionType" :color="transactionType === 'entrada' ? 'success' : 'danger'"
                    :options="[
                        { label: 'Entrada', value: 'entrada' },
                        { label: 'Saída', value: 'saida' }
                    ]" placeholder="Selecione o tipo" class="custom-maz-select" />
            </div>
            <div class="form-group w-[221px]">
                <label class="block mb-1">
                    Data <span class="required text-red-500">*</span>
                </label>
                <input v-model="novaTransacao.data" type="date" class="input-field w-full h-[47px]">
            </div>
            <div class="form-group">
                <label>Descrição <span class="required">*</span></label>
                <input placeholder="Digite aqui sua descrição" v-model="novaTransacao.descricao" type="text"
                    class="input-field">
            </div>
            <div class="form-group" v-if="transactionType">
                <label>Valor <span class="required">*</span></label>
                <input placeholder="R$ 0,00" v-model="valorFormatado" @input="formatarValor" type="text"
                    inputmode="numeric" class="input-field">
            </div>
            <button type="submit" class="submit-button">
                Adicionar Transação
            </button>
        </form>
    </section>

    <ConfirmModal v-if="showConfirmModal" :novaTransacao="confirmTransation" @close="closeModal"
        @confirm="adicionarTransacao" />
</template>

<script setup lang="ts">
import { useCustomToast } from '~/utils/toasts/toasts';
import { ref, computed } from 'vue';
import type { ITransaction } from '~/types';
import ConfirmModal from '../modals/ConfirmModal.vue';
import { useAuthStore } from '~/store/auth/login-store';
import { useNuxtApp } from '#app';

const { showWarnToast, showSuccessToast } = useCustomToast();
const { $http } = useNuxtApp();
const authStore = useAuthStore()

const transactionType = ref()
const valorFormatado = ref('')
const showConfirmModal = ref(false)

const novaTransacao = ref<ITransaction>({
    descricao: '',
    valor: 0,
    data: '',
    tipo: null,
    id: '',
})

const confirmTransation = ref(<ITransaction>({}));

const props = withDefaults(defineProps<{
    transacoes: ITransaction[]
}>(), {
    transacoes: () => []
})
const transacoes = computed(() => props.transacoes);

const closeModal = () => {
    showWarnToast('Operação Cancelada!')
    showConfirmModal.value = false
}
const openConfirmModal = () => {
    const userId = authStore.getId() || ''
    if (!validarTransacao(novaTransacao.value)) {
        showWarnToast('Preencha todos os campos obrigatórios!')
        return false
    }

    confirmTransation.value = {
        id: userId,
        descricao: novaTransacao.value.descricao,
        valor: novaTransacao.value.valor,
        data: novaTransacao.value.data,
        tipo: transactionType.value
    }

    showConfirmModal.value = true
    return true
}

const adicionarTransacao = async (confirmation: boolean) => {
    if (!confirmation) {
        showWarnToast('Operação cancelada!')
        showConfirmModal.value = false
        return
    }

    const transactionId = await $http.transaction.createTransaction(confirmTransation.value);
    transacoes.value.push(transactionId)
    showSuccessToast('Transação adicionada com sucesso!')

    resetFormulario()
    showConfirmModal.value = false
}

const resetFormulario = () => {
    valorFormatado.value = ''
    novaTransacao.value = {
        id: '',
        descricao: '',
        valor: 0,
        data: '',
        tipo: null
    }
    transactionType.value = null
}

const validarTransacao = (transacao: Omit<ITransaction, 'id' | 'tipo'>): boolean => {
    if (!transacao.descricao.trim()) {
        showWarnToast('A descrição é obrigatória')
        return false
    }

    if (transacao.valor === 0) {
        showWarnToast('Valor não pode ser zero')
        return false
    }

    const dataValida = /^\d{4}-\d{2}-\d{2}$/.test(transacao.data)
    if (!dataValida) {
        showWarnToast('Data inválida')
        return false
    }

    return true
}

const formatarValor = (event: Event) => {
    const input = event.target as HTMLInputElement
    let valor = input.value.replace(/[^\d]/g, '') // Remove tudo que não for dígito

    if (valor === '') {
        valorFormatado.value = ''
        novaTransacao.value.valor = 0
        return
    }
    const valorNumerico = parseFloat(valor) / 100

    novaTransacao.value.valor = valorNumerico

    valorFormatado.value = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
    }).format(valorNumerico)
}

</script>

<style scoped>
.custom-maz-select {
    width: 221px;
    height: 47px;
}

.required {
    color: red;
    margin-left: 4px;
}

.transaction-form {
    @apply bg-white dark:bg-darkTheme-200/80 p-6 rounded-xl shadow-md mb-8;
}

.section-title {
    @apply text-center text-2xl font-bold mb-6 text-[#4B5945] dark:text-white tracking-wider uppercase;
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
</style>
