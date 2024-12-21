<template>
    <aside class="sidebar">
            <div class="sidebar-content">
                <h2 class="sidebar-title">IXC GERÊNCIA</h2>
                <nav class="sidebar-menu">
                    <button 
                        class="sidebar-menu-item" 
                        :class="{ 'active': activeModule === 'transacoes' }"
                        @click="activeModule = 'transacoes'"
                    >
                        Transações
                    </button>
                </nav>
            </div>
        </aside>
</template>

<script setup lang="ts">
// Módulo Ativo
const activeModule = ref('transacoes')
</script>

<style scoped>
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
    @apply w-full p-3 text-left rounded-md transition-all duration-300 
           hover:bg-[#6C8F66] dark:hover:bg-[#91AC8F]/50 
           focus:outline-none focus:ring-2 focus:ring-[#6C8F66];
}

.sidebar-menu-item.active {
    @apply bg-[#6C8F66] text-white dark:bg-[#91AC8F]/50;
}
</style>