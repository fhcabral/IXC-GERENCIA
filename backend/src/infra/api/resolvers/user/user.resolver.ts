import { head } from "lodash";
import "reflect-metadata";
import { Args, Mutation, Query, Resolver } from "type-graphql";
import { Inject, Service } from "typedi";
import { User } from "../../../../domain/user/entity/user.entity";
import { CreateUserUseCase } from "../../../../use-case/user/create/create-user.use-case";
import {
  FindByIdUserUsecase
} from "../../../../use-case/user/findById/findById.use.case";
import ErrorHandling from "../../../shared/exception/error.handler";
import { CreateUserArg } from "./args-type/create-user.arg.type";
import { ParamUserById } from "./args-type/findById.arg.type";

@Service()
@Resolver(User)
@ErrorHandling()
export class UserResolver implements IUserResolver {
  constructor(
    @Inject()
    private findByIdUserUsecase: FindByIdUserUsecase,
    @Inject() private createUserUseCase: CreateUserUseCase
  ) {}

  @Query((returns) => User)
  async user(@Args() { id }: ParamUserById) {
    try {
      const user = await this.findByIdUserUsecase.execute(id);
      const notUser = !!head([user]);
      if (!notUser) {
        throw new Error("User not found");
      }

      return user;
    } catch (error) {
      throw error;
    }
  }

  @Mutation(returns=> User)
  async create(@Args() user:CreateUserArg){
    return this.createUserUseCase.execute(user)
  }
}

export interface IUserResolver {
  user(id: ParamUserById): Promise<any>;
}
