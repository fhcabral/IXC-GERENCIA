import { Inject, Service } from "typedi";
import { User } from "../../../domain/user/entity/user.entity";
import { ICreateUser } from "../../../domain/user/port/create-user.port";
import { UserRepository } from "../../../infra/api/repository/user/user.repository";

@Service()
export class CreateUserUseCase implements ICreateUser{
    constructor(@Inject() private readonly userRepository: UserRepository) {}
    
    async execute(data: Partial<User>): Promise<User> {
        return this.userRepository.create(data)
    }

}