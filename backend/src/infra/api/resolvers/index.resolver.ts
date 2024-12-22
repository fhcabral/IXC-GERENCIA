import { TransactionResolver } from "./transaction/transaction.resolver";
import { UserResolver } from "./user/user.resolver";

export const resolvers = [
  TransactionResolver,
  UserResolver,
] as any[];
