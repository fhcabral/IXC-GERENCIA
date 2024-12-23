import { gql } from 'nuxt-graphql-request/utils';

export const DELETE_TRANSACTION = gql`
mutation DeleteTransaction($transactionId: String!) {
  deleteTransaction(transactionID: $transactionId)
}`;




