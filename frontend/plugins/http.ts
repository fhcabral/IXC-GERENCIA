import { LoginService } from "~/services/auth/login.service";
import { TransactionService } from "~/services/transaction/transaction.service";
import type { GraphQLClient } from 'graphql-request';
import { loadingStore } from "~/store/loadingState/loading-store";

interface IHttp {
  login: LoginService;
  transaction: TransactionService;
}

export default defineNuxtPlugin((nuxtApp) => {
  const graphqlClient = (useNuxtApp().$graphql as Record<string, GraphQLClient>).default;
  const loading = loadingStore()

  nuxtApp.hook('page:start', () => {
    loading.setLoading(true)
  })

  nuxtApp.hook('page:finish', () => {
    loading.setLoading(false)
  })

  const httpServices: IHttp = {
    login: new LoginService(graphqlClient),
    transaction: new TransactionService(graphqlClient)
  };

  return {
    provide: {
      http: httpServices,
    },
  };
});