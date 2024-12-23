import { defineStore } from 'pinia'
import type { ILogin } from '~/types'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const user = ref<string | null>(null)
  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: ILogin) {
    const { $http } = useNuxtApp();

    try {
      const userResponse  = await $http.login.authentication(credentials)
      const [result] = userResponse || [];

      if(!result) {
        return {
          status: false,
          message: 'Usuário não encontrado'
        }
      }

      if(result && !credentials.password.match(result?.password)) {
        return {
          status: false,
          message: 'Senha incorreta!'
        }
      }

      token.value = result.userid ? result.userid : ''
      user.value = result.surname

      localStorage.setItem('id', result.userid || '')
      localStorage.setItem('user', JSON.stringify(result.surname))

      return {
        status: true,
          message: 'Sessão iniciada'
      }
    } catch (error) {
      console.error('Erro no login:', error)
      throw error
    }
  }

  function logout() {
    token.value = null
    user.value = null
    localStorage.removeItem('id')
    localStorage.removeItem('user')
    return navigateTo('/', { replace: true });
  }

  function initializeStore() {
    const storedToken = localStorage.getItem('id')
    const storedUser = localStorage.getItem('user')

    if (storedToken && storedUser) {
      token.value = storedToken
      user.value = JSON.parse(storedUser)
    }
  }

  function getId() {
    return token.value
  }

  return {
    token,
    user,
    isAuthenticated,
    login,
    logout,
    initializeStore,
    getId
  }
})