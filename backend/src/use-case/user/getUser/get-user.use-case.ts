import { Inject, Service } from "typedi";
import { User } from "../../../domain/user/entity/user.entity";
import { IGetUser } from "../../../domain/user/port/get-user.port";
import { UserRepository } from "../../../infra/api/repository/user/user.repository";

@Service()
export class GetUserUseCase implements IGetUser{
    constructor(@Inject() private readonly userRepository: UserRepository) {}
    
    async execute(data: Partial<User>): Promise<User> {
        return this.userRepository.findByProp('surname', data.surname)
    }

}