import { useAuthStore } from "~/store/auth/login-store";
import { loadingStore } from "~/store/loadingState/loading-store";
import { navigateTo } from "#app";

export default defineNuxtRouteMiddleware(async (to) => {
    const loading = loadingStore()
    loading.setLoading(true)
    try {

        if (import.meta.server) return;

        const storage = useAuthStore();
        storage.initializeStore()
        const auth = storage.isAuthenticated;

        const publicRoutes = ['/', '/login'];

        if (!auth && !publicRoutes.includes(to.path)) {
            return navigateTo('/', { replace: true });
        }

        if (auth && (to.path === '/' || to.path === '/login')) {
            return navigateTo('/Dashboard', { replace: true })
        }
    } finally {
        loading.setLoading(false)
    }
});