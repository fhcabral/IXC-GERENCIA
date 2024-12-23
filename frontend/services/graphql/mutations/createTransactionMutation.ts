import { gql } from 'nuxt-graphql-request/utils';

export const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($userId: String!, $description: String!, $value: Float!, $date: String!, $recipeOrExit: String!) {
    createTransaction(userID: $userId, description: $description, value: $value, Date: $date, recipeOrExit: $recipeOrExit) {
      transactionID
    }
  }
`;




