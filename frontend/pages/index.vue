<template>
  <div>
    <div class="login-layout">
      <div class="login-background"></div>
      <div class="login-container">
        <div class="login-box">
          <header class="login-header">
            <h1 class="login-title">
              Bem-vindo!
            </h1>
          </header>
          <form class="login-form" @submit.prevent="login">
            <div class="input-group input-username">
              <div class="input-icon">
                <span v-html="icon_user(20, colorMode.preference === 'dark' ? '#91AC8F' : '#4B5945')"></span>
              </div>
              <input type="text" v-model="values_reactive.surname" placeholder="Digite seu usuário"
                class="login-input">
            </div>

            <div class="input-group input-password">
              <div class="input-icon">
                <span v-html="icon_key(20, colorMode.preference === 'dark' ? '#91AC8F' : '#4B5945')"></span>
              </div>
              <input type="password" v-model="values_reactive.password" placeholder="Digite sua senha"
                class="login-input">
            </div>

            <button type="submit" class="login-button">
              Entrar
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { icon_user, icon_key } from "~/utils/icon/icons";
import { computed } from "vue";
import { useColorMode } from "#build/imports";
import { useRouter } from "vue-router";
import { reactive } from "vue";
import type { ILogin, ILoginValidation } from '~/types/auth/login.type';
import { useCustomToast } from '~/utils/toasts/toasts';
import { useAuthStore } from "~/store/auth/login-store";
const { showErrorToast, showSuccessToast, showWarnToast } = useCustomToast();

const colorMode = useColorMode()
const authStore = useAuthStore()
const router = useRouter()


const values_reactive = computed<ILogin>(() => {
  return reactive({
    surname: "",
    password: "",
  });
});

const login = async () => {
  if(!values_reactive.value.surname) {
    showWarnToast('Usuário deve ser preenchido!')
    return
  }
  else if (!values_reactive.value.password) {
    showWarnToast('Senha deve ser preenchida!')
    return
  }
  const encoder = new TextEncoder();
  const data = encoder.encode(values_reactive.value.password);

  const hashBuffer = await crypto.subtle.digest('SHA-1', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashedPassword = hashArray
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');

  const request = await authStore.login({
    surname: values_reactive.value.surname,
      password: hashedPassword,
  }) as ILoginValidation

  if (request.status) {
    showSuccessToast(request.message)
    router.push("/Dashboard")
  } else {
    showErrorToast(request.message)
  }
};
</script>

<style scoped>
.login-layout {
  @apply min-h-screen w-full relative overflow-hidden;
}

.login-background {
  @apply absolute inset-0 
         bg-green-500/100
         backdrop-blur-md 
         -z-10;
}
.login-container {
  @apply w-full flex items-center justify-center h-screen bg-gradient-to-br from-lightMode-100 to-[#91AC8F]/20 text-custom-100 dark:from-darkTheme-200 dark:to-darkTheme-200/20 dark:text-white;
}

.login-box {
  @apply flex flex-col gap-6 w-[311px] h-[400px] items-center bg-white/90 dark:bg-darkTheme-200/80 rounded-xl p-8 backdrop-blur-sm shadow-2xl border-2 border-[#4B5945]/20 dark:border-[#91AC8F]/20;
}

.login-header {
  @apply flex w-full justify-center items-center;
}

.login-title {
  @apply font-bold text-2xl bg-transparent text-center w-full text-custom-100 dark:text-white tracking-wider;
}

.login-form {
  @apply w-full flex flex-col gap-6 justify-center items-center space-y-6;
}

.input-group {
  @apply flex items-center w-full max-w-[280px] border border-gray-300 dark:border-gray-600 rounded-md focus-within:ring-2 focus-within:ring-[#4B5945]/50 dark:focus-within:ring-[#91AC8F]/50 transition-all duration-300 bg-[#F0F4F8] dark:bg-darkTheme-200/50 hover:border-[#4B5945]/50 dark:hover:border-[#91AC8F]/50;
}

.input-icon {
  @apply p-3 border-r border-gray-300 dark:border-gray-600;
}

.login-input {
  @apply w-full p-3 bg-transparent outline-none placeholder-gray-500 dark:text-white dark:placeholder-gray-400;
}

.login-button {
  @apply w-full max-w-[280px] p-3 bg-[#4B5945] text-white hover:bg-[#6C8F66] rounded-md transition duration-300 uppercase tracking-wider font-semibold transform hover:scale-105 active:scale-95 shadow-md hover:shadow-lg dark:bg-[#6C8F66] dark:hover:bg-[#91AC8F];
}
</style>