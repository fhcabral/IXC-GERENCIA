<template>
  <div>
    <div class="fixed bottom-4 left-4 z-50">
      <button 
        @click="toggleColorMode" 
        class="p-2 rounded-full 
               bg-gray-200 dark:bg-gray-700 
               text-gray-800 dark:text-white
               shadow-md hover:shadow-lg
               transition-all duration-300"
      >
        <span v-html="colorMode.preference === 'dark' ? icon_sunny(24, '#FFB200') : icon_moon(24)"></span>
      </button>
    </div>
    <NuxtPage />
  </div>
</template>

<script setup>
import { icon_moon, icon_sunny } from './utils/icon/icons';
import { useColorMode } from '#build/imports';
const colorMode = useColorMode()

const toggleColorMode = () => {
  colorMode.preference = colorMode.preference === 'light' ? 'dark' : 'light'
}
</script>