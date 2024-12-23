import type { ILogin, ILoginResponse } from "~/types";
import { GET_USER } from '~/services/graphql/queries/';
import type { GraphQLClient } from 'graphql-request';

export class LoginService {
  private $graphql: GraphQLClient;

  constructor($graphql: GraphQLClient) {
    this.$graphql = $graphql;
  }

  async authentication(data: ILogin) {
    try {
      const { data: user } = await useAsyncData('user', async () => {
        const queryResult: ILoginResponse = await this.$graphql.request(GET_USER, {
          surname: data.surname,
          password: data.password
        });
        const userData = Array.isArray(queryResult.getUser)
          ? queryResult.getUser.filter(user => user.password.match(data.password))
          : [queryResult.getUser];

        return userData.length > 0
          ? userData
          : (Array.isArray(queryResult.getUser) ? [queryResult.getUser[0]] : [queryResult.getUser]) as ILogin[];
      });
      return user.value;
    } catch (error) {
      console.error('Erro na autenticação:', error);
      throw error;
    }
  }
}