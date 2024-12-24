<template>
  <CardLoading />
</template>

<script setup lang="ts">
import CardLoading from "~/components/common/loadingState/CardLoading.vue";
import { useColorMode } from "#build/imports";
import { onBeforeMount } from 'vue'

const colorMode = useColorMode()

onBeforeMount(() => {
  if (import.meta.client) {
    const savedMode = localStorage.getItem('nuxt-color-mode')
    if (!savedMode) {
      const prefersDarkMode = window.matchMedia('(prefers-color-scheme: dark)').matches
      colorMode.preference = prefersDarkMode ? 'dark' : 'light'
    } else {
      colorMode.preference = savedMode
    }
  }
})
</script>