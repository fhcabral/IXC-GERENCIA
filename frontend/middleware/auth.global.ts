import { useAuthStore } from "~/store/auth/login-store";
import { loadingStore } from "~/store/loadingState/loading-store";

export default defineNuxtRouteMiddleware(async (to) => {
    const loading = loadingStore()
    loading.setLoading(true)
    try {
        if (import.meta.server) return;
        const storage = useAuthStore();
        storage.initializeStore()

        const auth = storage.isAuthenticated;

        if (!auth && to.path !== '/Login') {
            window.location.href = '/Login';
        }
        if (auth && (to.path === '/' || to.path === '/login')) {
            window.location.href = '/Dashboard'
        }
    } finally {
        loading.setLoading(false)
    }
});