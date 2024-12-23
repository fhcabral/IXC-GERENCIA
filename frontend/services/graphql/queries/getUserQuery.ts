import { gql } from 'nuxt-graphql-request/utils';

export const GET_USER = gql`
  query GetUser($surname: String!) {
    getUser(surname: $surname) {
      userid
      surname
      password
    }
  }
`;