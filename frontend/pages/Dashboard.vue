<template>
    <div class="dashboard-container">
        <CardSideBar />

        <main class="main-content">
            <CardResumo :transacoes="transacoes" />
            <CardCadastroDeTransacao :transacoes="transacoes" />
            <CardHistoricoDeTransacao :transacoes="transacoes" @remove-transaction="removerTransacao" />

        </main>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useCustomToast } from '~/utils/toasts/toasts';
const { showSuccessToast } = useCustomToast();
import CardSideBar from '~/components/common/sideBar/CardSideBar.vue';
import CardResumo from '~/components/dashboard/CardResumo.vue';
import CardCadastroDeTransacao from '~/components/dashboard/CardCadastroDeTransacao.vue';
import CardHistoricoDeTransacao from '~/components/dashboard/CardHistoricoDeTransacao.vue';
import type { ITransaction } from '~/types';

const transacoes = ref<ITransaction[]>([])

const removerTransacao = (id: number) => {
    transacoes.value = transacoes.value.splice(id, 1)
    showSuccessToast('Transação deletada com sucesso!')
}
</script>

<style scoped>
.dashboard-container {
    @apply flex h-screen bg-lightMode-100 dark:bg-darkTheme-200 text-custom-100 dark:text-white;
}


.main-content {
    @apply flex-1 p-8 overflow-y-auto bg-gradient-to-br from-lightMode-100 to-lightMode-200/20 dark:from-darkTheme-100 dark:to-darkTheme-200/20;
}
</style>