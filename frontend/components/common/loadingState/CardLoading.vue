<template>
    <div 
        class="loading-overlay" 
        :class="{ 'light-mode': isLightMode }"
    >
        <div class="loading-container">
            <div 
                class="spinner" 
                :class="{ 'light-mode-spinner': isLightMode }"
            ></div>
            <div 
                class="loading-text" 
                :class="{ 'light-mode-text': isLightMode }"
            >
                Carregando, aguarde...
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useColorMode } from "#build/imports";
import { computed } from 'vue'

const colorMode = useColorMode()
const isLightMode = computed(() => colorMode.value  === 'light')
</script>

<style scoped>
.loading-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(26, 26, 26);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    backdrop-filter: blur(5px);
    transition: all 0.3s ease;
    color: #ffffff;
}

.loading-overlay.light-mode {
    background-color: rgba(240, 240, 240, 0.9);
    color: #333333;
}

.loading-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 1rem;
}

.loading-text {
    font-size: 1.2rem;
    animation: pulse 1.5s ease-in-out infinite;
    font-family: Arial, sans-serif;
    transition: color 0.3s ease;
}

.spinner {
    width: 40px;
    height: 40px;
    border: 4px solid #333333;
    border-top: 4px solid #00ff88;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    box-shadow: 0 0 15px rgba(0, 255, 136, 0.3);
    transition: all 0.3s ease;
}

@keyframes pulse {
    0% { opacity: 0.5; }
    50% { opacity: 1; }
    100% { opacity: 0.5; }
}

@keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
}
</style>