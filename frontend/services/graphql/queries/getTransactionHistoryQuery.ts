import { gql } from 'nuxt-graphql-request/utils';

export const GET_TRANSACTION_HISTORY = gql`
query FindByUser($userId: String!) {
  findByUser(userID: $userId) {
    transactionID, 
    description, 
    value, 
    Date, 
    recipeOrExit
  }
}
`;





