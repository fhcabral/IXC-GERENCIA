import { LoginService } from "~/services/auth/login.service";
import { TransactionService } from "~/services/transaction/transaction.service";
import type { GraphQLClient } from 'graphql-request';
interface IHttp {
  login: LoginService;
  transaction: TransactionService;
}

export default defineNuxtPlugin(() => {
  const graphqlClient = (useNuxtApp().$graphql as Record<string, GraphQLClient>).default;

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