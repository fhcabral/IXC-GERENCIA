<template>
  <div>
    <!-- Botão de Tema no canto superior direito -->
    <div class="fixed top-4 right-4 z-50">
      <button 
        @click="toggleColorMode" 
        class="p-2 rounded-full 
               bg-gray-200 dark:bg-gray-700 
               text-gray-800 dark:text-white
               shadow-md hover:shadow-lg
               transition-all duration-300"
      >
        {{ colorMode.preference === 'dark' ? '☀️' : '🌙' }}
      </button>
    </div>

    <NuxtPage />
  </div>
</template>

<script setup>
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'dark' ? 'light' : 'dark'
}
</script>