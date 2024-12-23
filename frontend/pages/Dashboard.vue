<template>
    <div class="dashboard-container">
        <button class="logout-button" @click="realizarLogout">
            <span v-html="icon_logout(32, 'currentColor')"></span>
        </button>
        <CardSideBar />
        <main class="main-content">
            <CardResumo :transacoes="transacoes" />
            <CardCadastroDeTransacao :transacoes="transacoes" />
            <CardHistoricoDeTransacao :transacoes="transacoes" @remove-transaction="removerTransacao" />
        </main>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useCustomToast } from '~/utils/toasts/toasts';
import { useNuxtApp, navigateTo } from '#app';
import CardSideBar from '~/components/common/sideBar/CardSideBar.vue';
import CardResumo from '~/components/dashboard/CardResumo.vue';
import CardCadastroDeTransacao from '~/components/dashboard/CardCadastroDeTransacao.vue';
import CardHistoricoDeTransacao from '~/components/dashboard/CardHistoricoDeTransacao.vue';
import { icon_logout } from '~/utils/icon/icons';
import { useAuthStore } from '~/store/auth/login-store';
import type { ITransaction } from '~/types';
const { $http } = useNuxtApp();
const { showSuccessToast, showInfoToast } = useCustomToast();
const authStore = useAuthStore();

const transacoes = ref<ITransaction[]>([])

onMounted(async () => {
    await getHistoryTransaction()
})

const removerTransacao = (transactionIndex: number) => {
    const transacaoParaRemover = transacoes.value[transactionIndex];
    const transactionId = transacaoParaRemover.id;

    $http.transaction.deleteTransactionById(transactionId)
        .then(() => {
            transacoes.value.splice(transactionIndex, 1);
            showSuccessToast('Transação deletada com sucesso!');
        })
}

const realizarLogout = () => {
    authStore.logout();
    showInfoToast('Sessão encerrada!')
    navigateTo('/');
}

const getHistoryTransaction = async () => {
    const userId = authStore.getId() || ''
    const userTransactions = await $http.transaction.getHistoryById(userId)
    if (userTransactions?.length) {
        for (const item of userTransactions) {
            transacoes.value.push({
                id: item.transactionID,
                descricao: item.description,
                valor: item.value,
                data: item.Date,
                tipo: item.recipeOrExit
            })
        }
    }
}

</script>

<style scoped>
.logout-button {
    @apply absolute top-4 right-4 z-50 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors;
}

.dashboard-container {
    @apply flex h-screen bg-lightMode-100 dark:bg-darkTheme-200 text-custom-100 dark:text-white;
}

.main-content {
    @apply flex-1 p-8 overflow-y-auto bg-gradient-to-br from-lightMode-100 to-lightMode-200/20 dark:from-darkTheme-100 dark:to-darkTheme-200/20;
}
</style>