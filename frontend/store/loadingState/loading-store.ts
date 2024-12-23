import { defineStore } from 'pinia'

export const loadingStore = defineStore('loading', () => {
    const loading = ref<boolean>(false)

    function getLoading() {
        return loading.value
    }

    function setLoading(value: boolean) {
        loading.value = value
    }

    return {
        loading,
        getLoading,
        setLoading
    }
})